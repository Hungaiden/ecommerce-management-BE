import { Airport } from "../../../models/flights/airport.model";
import type { CreateAirportDto } from "../../../dto/flights/create.airport.dto";
import type { UpdateAirportDto } from "../../../dto/flights/update.airport.dto";
import * as paramsTypes from "../../../utils/types/paramsTypes";

export const createAirport = async (data: CreateAirportDto) => {
  const existingAirport = await Airport.findOne({ code: data.code });
  if (existingAirport) {
    throw new Error("Mã sân bay đã tồn tại!");
  }

  const newAirport = new Airport(data);
  await newAirport.save();
  return newAirport;
};

export const getAllAirports = async (
  searchParams?: paramsTypes.SearchParams,
  sortParams?: paramsTypes.SortParams,
  paginateParams?: paramsTypes.PaginateParams
) => {
  try {
    const query: any = { deleted: false };

    if (searchParams?.keyword && searchParams?.field) {
      query[searchParams.field] = {
        $regex: searchParams.keyword,
        $options: "i",
      };
    }

    const offset = paginateParams?.offset || 0;
    const limit = paginateParams?.limit || 10;

    const sortQuery: any = {};
    if (sortParams?.sortBy) {
      sortQuery[sortParams.sortBy] =
        sortParams.sortType === paramsTypes.SORT_TYPE.ASC ? 1 : -1;
    }

    const airports = await Airport.find(query)
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean();

    const totalRows = await Airport.countDocuments(query);
    const totalPages = Math.ceil(totalRows / limit);

    return { airports, totalRows, totalPages };
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách sân bay!");
  }
};

export const getAirportById = async (id: string) => {
  try {
    const airport = await Airport.findOne({
      _id: id,
      deleted: false,
    });
    return airport;
  } catch (error) {
    throw new Error("Lỗi khi lấy thông tin sân bay!");
  }
};

export const updateAirport = async (id: string, data: UpdateAirportDto) => {
  try {
    if (data.code) {
      const existingAirport = await Airport.findOne({
        code: data.code,
        _id: { $ne: id },
      });
      if (existingAirport) {
        throw new Error("Mã sân bay đã tồn tại!");
      }
    }

    const updatedAirport = await Airport.findOneAndUpdate(
      { _id: id, deleted: false },
      data,
      { new: true }
    );
    return updatedAirport;
  } catch (error) {
    throw error;
  }
};

export const deleteAirport = async (id: string) => {
  try {
    const deletedAirport = await Airport.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true, deleted_at: new Date() },
      { new: true }
    );
    return deletedAirport;
  } catch (error) {
    throw new Error("Lỗi khi xóa sân bay!");
  }
};
