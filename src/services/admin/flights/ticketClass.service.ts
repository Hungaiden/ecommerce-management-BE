import { FlightPrice } from "../../../models/flights/ticketClass.model";
import type { CreateTicketClassDto } from "../../../dto/flights/create.ticketClass.dto";
import type { UpdateTicketClassDto } from "../../../dto/flights/update.ticketClass.dto";
import * as paramsTypes from "../../../utils/types/paramsTypes";

export const createTicketClass = async (data: CreateTicketClassDto) => {
  const existingTicketClass = await FlightPrice.findOne({
    flight_id: data.flight_id,
    class: data.class,
  });
  if (existingTicketClass) {
    throw new Error("Hạng vé này đã tồn tại cho chuyến bay!");
  }

  const newTicketClass = new FlightPrice(data);
  await newTicketClass.save();
  return newTicketClass;
};

export const getAllTicketClasses = async (
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

    const ticketClasses = await FlightPrice.find(query)
      .populate("flight_id", "flight_number")
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean();

    const totalRows = await FlightPrice.countDocuments(query);
    const totalPages = Math.ceil(totalRows / limit);

    return { ticketClasses, totalRows, totalPages };
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách hạng vé!");
  }
};

export const getTicketClassById = async (id: string) => {
  try {
    const ticketClass = await FlightPrice.findOne({
      _id: id,
      deleted: false,
    }).populate("flight_id");
    return ticketClass;
  } catch (error) {
    throw new Error("Lỗi khi lấy thông tin hạng vé!");
  }
};

export const updateTicketClass = async (
  id: string,
  data: UpdateTicketClassDto
) => {
  try {
    const updatedTicketClass = await FlightPrice.findOneAndUpdate(
      { _id: id, deleted: false },
      data,
      { new: true }
    );
    return updatedTicketClass;
  } catch (error) {
    throw new Error("Lỗi khi cập nhật hạng vé!");
  }
};

export const deleteTicketClass = async (id: string) => {
  try {
    const deletedTicketClass = await FlightPrice.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true, deleted_at: new Date() },
      { new: true }
    );
    return deletedTicketClass;
  } catch (error) {
    throw new Error("Lỗi khi xóa hạng vé!");
  }
};
