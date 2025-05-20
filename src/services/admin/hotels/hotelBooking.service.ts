/* eslint-disable no-useless-catch */
import { HotelBooking } from '../../../models/hotels/hotelBooking.model'
import { RoomType } from '../../../models/hotels/roomType.model'
import type { CreateHotelBookingDto } from '../../../dto/hotels/create.hotelBooking.dto'
import * as paramsTypes from '../../../utils/types/paramsTypes'
export const createHotelBooking = async (data: CreateHotelBookingDto) => {
  try {
    // Kiểm tra room type có tồn tại và còn phòng không
    const roomType = await RoomType.findById(data.room_type_id)
    if (!roomType) {
      throw new Error('Loại phòng không tồn tại!')
    }

    if (roomType.available_rooms < data.num_rooms) {
      throw new Error('Số lượng phòng không đủ!')
    }

    // Tính tổng tiền dựa trên số đêm
    const nights = Math.ceil(
      (data.check_out.getTime() - data.check_in.getTime()) / (1000 * 3600 * 24),
    )
    const totalPrice = roomType.price_per_night * data.num_rooms * nights

    // Tạo booking mới
    const newBooking = await HotelBooking.create({
      ...data,
      total_price: totalPrice,
    })

    // Cập nhật số lượng phòng còn trống
    await RoomType.findByIdAndUpdate(data.room_type_id, {
      $inc: { available_rooms: -data.num_rooms },
    })

    return newBooking
  } catch (error) {
    throw error
  }
}

export const getAllHotelBookings = async () => {
  try {
    return await HotelBooking.find()
      .populate('hotel_id', 'name')
      .populate('room_type_id', 'title')
      .populate('user_id', 'fullname email')
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách booking')
  }
}

export const getHotelBookingById = async (bookingId: string) => {
  try {
    return await HotelBooking.findById(bookingId)
      .populate('hotel_id', 'name')
      .populate('room_type_id', 'title')
      .populate('user_id', 'fullname email')
  } catch (error) {
    throw new Error('Lỗi khi lấy thông tin booking')
  }
}

export const getBookingsByHotelId = async (
  hotelId: string,
  sortParams?: paramsTypes.SortParams,
  paginateParams?: paramsTypes.PaginateParams,
) => {
  try {
    const query = { hotel_id: hotelId, deleted: false }

    const offset = paginateParams?.offset || 0
    const limit = paginateParams?.limit || 10

    const sortQuery: any = {}
    if (sortParams?.sortBy) {
      sortQuery[sortParams.sortBy] =
        sortParams.sortType === paramsTypes.SORT_TYPE.ASC ? 1 : -1
    }

    const bookings = await HotelBooking.find(query)
      .populate('room_type_id', 'title price_per_night')
      .populate('user_id', 'fullname email')
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean()

    const totalRows = await HotelBooking.countDocuments(query)
    const totalPages = Math.ceil(totalRows / limit)

    return { bookings, totalRows, totalPages }
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách booking theo khách sạn!')
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

    const bookings = await HotelBooking.find(query)
      .populate({
        path: 'hotel_id',
        select: 'name address images',
      })
      .populate('room_type_id', 'title price_per_night')
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean()

    const totalRows = await HotelBooking.countDocuments(query)
    const totalPages = Math.ceil(totalRows / limit)

    return { bookings, totalRows, totalPages }
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách booking theo user!')
  }
}
