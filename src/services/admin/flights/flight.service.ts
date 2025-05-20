import { Flight } from '../../../models/flights/flight.model'
import type { CreateFlightDto } from '../../../dto/flights/create.flight.dto'
import type { UpdateFlightDto } from '../../../dto/flights/update.flight.dto'
import * as paramsTypes from '../../../utils/types/paramsTypes'

export const createFlight = async (data: CreateFlightDto) => {
  const existingFlight = await Flight.findOne({
    flight_number: data.flight_number,
  })
  if (existingFlight) {
    throw new Error('Số hiệu chuyến bay đã tồn tại!')
  }
  const newFlight = new Flight(data)
  await newFlight.save()
  return newFlight
}

export const getAllFlights = async (
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

    const flights = await Flight.find(query)
      .populate('airline_id', 'name logo') // Thêm populate airline
      .populate('origin_airport_id')
      .populate('destination_airport_id')
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean()

    const totalRows = await Flight.countDocuments(query)
    const totalPages = Math.ceil(totalRows / limit)

    return { flights, totalRows, totalPages }
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách chuyến bay!')
  }
}

export const getFlightById = async (id: string) => {
  try {
    const flight = await Flight.findOne({
      _id: id,
      deleted: false,
    })
      .populate('airline_id', 'name logo') // Thêm populate airline
      .populate('origin_airport_id')
      .populate('destination_airport_id')
    return flight
  } catch (error) {
    throw new Error('Lỗi khi lấy thông tin chuyến bay!')
  }
}

export const updateFlight = async (id: string, data: UpdateFlightDto) => {
  try {
    const updatedFlight = await Flight.findOneAndUpdate(
      { _id: id, deleted: false },
      data,
      { new: true },
    )
    return updatedFlight
  } catch (error) {
    throw new Error('Lỗi khi cập nhật chuyến bay!')
  }
}

export const deleteFlight = async (id: string) => {
  try {
    const deletedFlight = await Flight.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true, deleted_at: new Date() },
      { new: true },
    )
    return deletedFlight
  } catch (error) {
    throw new Error('Lỗi khi xóa chuyến bay!')
  }
}
