import type { Request, Response } from 'express'
import * as flightBookingService from '../../../services/admin/flights/flightBooking.service'
import type * as paramsTypes from '../../../utils/types/paramsTypes'
import type {
  ResponseDetailSuccess,
  ResponseListSuccess,
  ResponseFailure,
} from '../../../utils/types/ResponseTypes'

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await flightBookingService.createBooking({
      ...req.body,
      user_id: req.jwtDecoded.userId,
    })
    const response: ResponseDetailSuccess<typeof booking> = {
      code: 201,
      message: 'Đặt vé thành công',
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

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const searchParams: paramsTypes.SearchParams = {
      keyword: req.query.keyword as string,
      field: req.query.field as string,
    }

    const sortParams: paramsTypes.SortParams = {
      sortBy: req.query.sortBy as string,
      sortType: req.query.sortType as paramsTypes.SORT_TYPE,
    }

    const paginateParams: paramsTypes.PaginateParams = {
      offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
    }

    const result = await flightBookingService.getAllBookings(
      searchParams,
      sortParams,
      paginateParams,
    )

    const response: ResponseListSuccess<typeof result.bookings> = {
      code: 200,
      message: result.bookings.length
        ? 'Lấy danh sách đặt vé thành công'
        : 'Không tìm thấy đặt vé nào',
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

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await flightBookingService.getBookingById(req.params.id)
    if (!booking) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Không tìm thấy đặt vé',
        errors: [],
      }
      res.status(404).json(response)
      return
    }

    const response: ResponseDetailSuccess<typeof booking> = {
      code: 200,
      message: 'Lấy thông tin đặt vé thành công',
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

    const result = await flightBookingService.getBookingsByUserId(
      req.params.userId,
      sortParams,
      paginateParams,
    )

    const response: ResponseListSuccess<typeof result.bookings> = {
      code: 200,
      message: result.bookings.length
        ? 'Lấy danh sách đặt vé thành công'
        : 'Không tìm thấy đặt vé nào',
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

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const updatedBooking = await flightBookingService.updateBooking(
      req.params.id,
      req.body,
    )
    if (!updatedBooking) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Không tìm thấy đặt vé',
        errors: [],
      }
      res.status(404).json(response)
      return
    }

    const response: ResponseDetailSuccess<typeof updatedBooking> = {
      code: 200,
      message: 'Cập nhật đặt vé thành công',
      data: updatedBooking,
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

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const deletedBooking = await flightBookingService.deleteBooking(
      req.params.id,
    )
    if (!deletedBooking) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Không tìm thấy đặt vé',
        errors: [],
      }
      res.status(404).json(response)
      return
    }

    const response: ResponseDetailSuccess<typeof deletedBooking> = {
      code: 200,
      message: 'Xóa đặt vé thành công',
      data: deletedBooking,
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
