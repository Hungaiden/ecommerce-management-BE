import { FlightBooking } from '../../../models/flights/flightBooking.model'
import type { CreateFlightBookingDto } from '../../../dto/flights/create.flightBooking.dto'
import type { UpdateFlightBookingDto } from '../../../dto/flights/update.flightBooking.dto'
import * as paramsTypes from '../../../utils/types/paramsTypes'

export const createBooking = async (data: CreateFlightBookingDto) => {
  const newBooking = new FlightBooking(data)
  await newBooking.save()
  return newBooking
}

export const getAllBookings = async (
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

    const bookings = await FlightBooking.find(query)
      .populate('flight_id', 'flight_number departure_time arrival_time')
      .populate('user_id', 'fullname email')
      .populate('travel_class', 'name')
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean()

    const totalRows = await FlightBooking.countDocuments(query)
    const totalPages = Math.ceil(totalRows / limit)

    return { bookings, totalRows, totalPages }
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách đặt vé!')
  }
}

export const getBookingById = async (id: string) => {
  try {
    const booking = await FlightBooking.findOne({
      _id: id,
      deleted: false,
    })
      .populate('flight_id')
      .populate('user_id')
      .populate('travel_class')
    return booking
  } catch (error) {
    throw new Error('Lỗi khi lấy thông tin đặt vé!')
  }
}

export const getBookingsByUserId = async (
  userId: string,
  sortParams?: paramsTypes.SortParams,
  paginateParams?: paramsTypes.PaginateParams,
) => {
  try {
    const query = { user_id: userId, deleted: false }

    const offset = paginateParams?.offset || 0
    const limit = paginateParams?.limit || 10

    const sortQuery: any = {}
    if (sortParams?.sortBy) {
      sortQuery[sortParams.sortBy] =
        sortParams.sortType === paramsTypes.SORT_TYPE.ASC ? 1 : -1
    }

    const bookings = await FlightBooking.find(query)
      .populate('flight_id')
      .populate('travel_class')
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean()

    const totalRows = await FlightBooking.countDocuments(query)
    const totalPages = Math.ceil(totalRows / limit)

    return { bookings, totalRows, totalPages }
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách đặt vé của người dùng!')
  }
}

export const updateBooking = async (
  id: string,
  data: UpdateFlightBookingDto,
) => {
  try {
    const updatedBooking = await FlightBooking.findOneAndUpdate(
      { _id: id, deleted: false },
      data,
      { new: true },
    )
    return updatedBooking
  } catch (error) {
    throw new Error('Lỗi khi cập nhật đặt vé!')
  }
}

export const deleteBooking = async (id: string) => {
  try {
    const deletedBooking = await FlightBooking.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true, deleted_at: new Date() },
      { new: true },
    )
    return deletedBooking
  } catch (error) {
    throw new Error('Lỗi khi xóa đặt vé!')
  }
}
