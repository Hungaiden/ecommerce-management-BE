/* eslint-disable no-useless-catch */
import { TourBooking } from '../../../models/tours/tourBooking.model'
import { Tour } from '../../../models/tours/tour.model'
import type { CreateTourBookingDto } from '../../../dto/tours/create.tourBooking.dto'
import * as paramsTypes from '../../../utils/types/paramsTypes'
export const createTourBooking = async (data: CreateTourBookingDto) => {
  try {
    // Kiểm tra tour có tồn tại và còn chỗ không
    const tour = await Tour.findById(data.tour_id)
    if (!tour) {
      throw new Error('Tour không tồn tại!')
    }

    if (tour.stock < data.number_of_people) {
      throw new Error('Tour không đủ chỗ!')
    }

    // Tính tổng tiền
    const totalPrice = tour.price * data.number_of_people
    if (tour.discount) {
      totalPrice * (1 - tour.discount / 100)
    }

    // Tạo booking mới
    const newBooking = await TourBooking.create({
      ...data,
      total_price: totalPrice,
    })

    // Cập nhật số lượng còn lại của tour
    await Tour.findByIdAndUpdate(data.tour_id, {
      $inc: { stock: -data.number_of_people },
    })

    return newBooking
  } catch (error) {
    throw error
  }
}

export const getAllTourBookings = async () => {
  try {
    const bookings = await TourBooking.find()
      .populate('tour_id', 'name')
      .sort({ booking_date: -1 })

    return bookings
  } catch (error) {
    throw error
  }
}

export const getTourBookingById = async (id: string) => {
  try {
    const booking = await TourBooking.findById(id).populate('tour_id', 'name')

    return booking
  } catch (error) {
    throw error
  }
}

export const getBookingsByTourId = async (
  tourId: string,
  sortParams?: paramsTypes.SortParams,
  paginateParams?: paramsTypes.PaginateParams,
) => {
  try {
    const query = { tour_id: tourId, deleted: false }

    const offset = paginateParams?.offset || 0
    const limit = paginateParams?.limit || 10

    const sortQuery: any = {}
    if (sortParams?.sortBy) {
      sortQuery[sortParams.sortBy] =
        sortParams.sortType === paramsTypes.SORT_TYPE.ASC ? 1 : -1
    }

    const bookings = await TourBooking.find(query)
      .populate({
        path: 'tour_id',
        select: 'title code price',
      })
      .populate('user_id', 'fullname email')
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean()

    const totalRows = await TourBooking.countDocuments(query)
    const totalPages = Math.ceil(totalRows / limit)

    return { bookings, totalRows, totalPages }
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách booking theo tour!')
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

    const bookings = await TourBooking.find(query)
      .populate({
        path: 'tour_id',
        select: 'title code price images',
      })
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean()

    const totalRows = await TourBooking.countDocuments(query)
    const totalPages = Math.ceil(totalRows / limit)

    return { bookings, totalRows, totalPages }
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách booking theo user!')
  }
}
