import type { Request, Response } from 'express'
import * as tourBookingService from '../../../services/admin/tours/tourBooking.service'
import type * as paramsTypes from '../../../utils/types/paramsTypes'
import type {
  ResponseDetailSuccess,
  ResponseListSuccess,
  ResponseFailure,
} from '../../../utils/types/ResponseTypes'

export const createTourBooking = async (req: Request, res: Response) => {
  try {
    const booking = await tourBookingService.createTourBooking({
      ...req.body,
    })

    const response: ResponseDetailSuccess<typeof booking> = {
      code: 201,
      message: 'Đặt tour thành công',
      data: booking,
    }
    res.status(201).json(response)
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 400,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message,
      errors: [],
    }
    res.status(400).json(response)
  }
}

export const getAllTourBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await tourBookingService.getAllTourBookings()
    const response: ResponseListSuccess<typeof bookings> = {
      code: 200,
      message: bookings.length
        ? 'Lấy danh sách đặt tour thành công'
        : 'Không có dữ liệu đặt tour',
      data: {
        hits: bookings,
        pagination: {
          totalRows: bookings.length,
          totalPages: 1,
        },
      },
    }
    res.status(200).json(response)
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500, // Thay đổi từ 400 thành 500
      timestamp: new Date().toISOString(),
      path: req.path,
      message: 'Lỗi server khi lấy danh sách booking', // Message rõ ràng hơn
      errors: [],
    }
    res.status(500).json(response) // Thêm status()
  }
}

export const getTourBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await tourBookingService.getTourBookingById(
      req.params.bookingId,
    )
    if (!booking) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Không tìm thấy booking',
        errors: [],
      }
      res.status(404).json(response)
      return
    }
    const response: ResponseDetailSuccess<typeof booking> = {
      code: 200,
      message: 'Lấy thông tin booking thành công',
      data: booking,
    }
    res.status(200).json(response)
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: 'Lỗi server khi lấy thông tin booking',
      errors: [],
    }
    res.status(500).json(response)
  }
}

export const getBookingsByTourId = async (req: Request, res: Response) => {
  try {
    const sortParams: paramsTypes.SortParams = {
      sortBy: req.query.sortBy as string,
      sortType: req.query.sortType as paramsTypes.SORT_TYPE,
    }

    const paginateParams: paramsTypes.PaginateParams = {
      offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
    }

    const result = await tourBookingService.getBookingsByTourId(
      req.params.tourId,
      sortParams,
      paginateParams,
    )

    const response: ResponseListSuccess<typeof result.bookings> = {
      code: 200,
      message:
        result.bookings.length > 0
          ? 'Lấy danh sách booking theo tour thành công'
          : 'Không tìm thấy booking nào cho tour này',
      data: {
        hits: result.bookings,
        pagination: {
          totalRows: result.totalRows,
          totalPages: result.totalPages,
        },
      },
    }
    res.status(200).json(response)
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message,
      errors: [],
    }
    res.status(500).json(response)
  }
}

export const getBookingsByUserId = async (req: Request, res: Response) => {
  try {
    const sortParams: paramsTypes.SortParams = {
      sortBy: req.query.sortBy as string,
      sortType: req.query.sortType as paramsTypes.SORT_TYPE,
    }

    const paginateParams: paramsTypes.PaginateParams = {
      offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
    }

    const result = await tourBookingService.getBookingsByUserId(
      req.params.userId,
      sortParams,
      paginateParams,
    )

    const response: ResponseListSuccess<typeof result.bookings> = {
      code: 200,
      message:
        result.bookings.length > 0
          ? 'Lấy danh sách booking theo user thành công'
          : 'Không tìm thấy booking nào cho user này',
      data: {
        hits: result.bookings,
        pagination: {
          totalRows: result.totalRows,
          totalPages: result.totalPages,
        },
      },
    }
    res.status(200).json(response)
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message,
      errors: [],
    }
    res.status(500).json(response)
  }
}
