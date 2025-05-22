/* eslint-disable no-useless-catch */
import { Airline } from '../../../models/flights/airline.model'
import type { CreateAirlineDto } from '../../../dto/flights/create.airline.dto'
import type { UpdateAirlineDto } from '../../../dto/flights/update.airline.dto'
import * as paramsTypes from '../../../utils/types/paramsTypes'

export const createAirline = async (data: CreateAirlineDto) => {
  const existingAirline = await Airline.findOne({ iata_code: data.iata_code })
  if (existingAirline) {
    throw new Error('Mã hãng bay đã tồn tại!')
  }

  const newAirline = new Airline(data)
  await newAirline.save()
  return newAirline
}

export const getAllAirlines = async (
  searchParams?: paramsTypes.SearchParams,
  sortParams?: paramsTypes.SortParams,
  paginateParams?: paramsTypes.PaginateParams,
) => {
  try {
    const query: any = { deleted: false }

    if (searchParams?.keyword && searchParams?.field) {
      query[searchParams.field] = {
        $regex: searchParams.keyword,
        $options: 'i',
      }
    }

    const offset = paginateParams?.offset || 0
    const limit = paginateParams?.limit || 10

    const sortQuery: any = {}
    if (sortParams?.sortBy) {
      sortQuery[sortParams.sortBy] =
        sortParams.sortType === paramsTypes.SORT_TYPE.ASC ? 1 : -1
    }

    const airlines = await Airline.find(query)
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean()

    const totalRows = await Airline.countDocuments(query)
    const totalPages = Math.ceil(totalRows / limit)

    return { airlines, totalRows, totalPages }
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách hãng bay!')
  }
}

export const getAirlineById = async (id: string) => {
  try {
    const airline = await Airline.findOne({
      _id: id,
      deleted: false,
    })
    return airline
  } catch (error) {
    throw new Error('Lỗi khi lấy thông tin hãng bay!')
  }
}

export const updateAirline = async (id: string, data: UpdateAirlineDto) => {
  try {
    if (data.iata_code) {
      const existingAirline = await Airline.findOne({
        iata_code: data.iata_code,
        _id: { $ne: id },
      })
      if (existingAirline) {
        throw new Error('Mã hãng bay đã tồn tại!')
      }
    }

    const updatedAirline = await Airline.findOneAndUpdate(
      { _id: id, deleted: false },
      data,
      { new: true },
    )
    return updatedAirline
  } catch (error) {
    throw error
  }
}

export const deleteAirline = async (id: string) => {
  try {
    const deletedAirline = await Airline.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true, deleted_at: new Date() },
      { new: true },
    )
    return deletedAirline
  } catch (error) {
    throw new Error('Lỗi khi xóa hãng bay!')
  }
}
