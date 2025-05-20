import type { Request, Response } from 'express'
import * as hotelBookingService from '../../../services/admin/hotels/hotelBooking.service'
import type * as paramsTypes from '../../../utils/types/paramsTypes'
import type {
  ResponseDetailSuccess,
  ResponseListSuccess,
  ResponseFailure,
} from '../../../utils/types/ResponseTypes'

export const createHotelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await hotelBookingService.createHotelBooking({
      ...req.body,
      user_id: req.jwtDecoded?.userId,
    })

    const response: ResponseDetailSuccess<typeof booking> = {
      code: 201,
      message: 'Đặt phòng thành công',
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

export const getAllHotelBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await hotelBookingService.getAllHotelBookings()
    const response: ResponseListSuccess<typeof bookings> = {
      code: 200,
      message: bookings.length
        ? 'Lấy danh sách đặt phòng thành công'
        : 'Không có dữ liệu đặt phòng',
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
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message,
      errors: [],
    }
    res.status(500).json(response)
  }
}

export const getHotelBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await hotelBookingService.getHotelBookingById(
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
      message: error.message,
      errors: [],
    }
    res.status(500).json(response)
  }
}

export const getBookingsByHotelId = async (req: Request, res: Response) => {
  try {
    const sortParams: paramsTypes.SortParams = {
      sortBy: req.query.sortBy as string,
      sortType: req.query.sortType as paramsTypes.SORT_TYPE,
    }

    const paginateParams: paramsTypes.PaginateParams = {
      offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
    }

    const result = await hotelBookingService.getBookingsByHotelId(
      req.params.hotelId,
      sortParams,
      paginateParams,
    )

    const response: ResponseListSuccess<typeof result.bookings> = {
      code: 200,
      message:
        result.bookings.length > 0
          ? 'Lấy danh sách booking theo khách sạn thành công'
          : 'Không tìm thấy booking nào cho khách sạn này',
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

    const result = await hotelBookingService.getBookingsByUserId(
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
