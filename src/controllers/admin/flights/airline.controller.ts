import type { Request, Response } from 'express'
import * as airlineService from '../../../services/admin/flights/airline.service'
import type * as paramsTypes from '../../../utils/types/paramsTypes'
import type {
  ResponseDetailSuccess,
  ResponseListSuccess,
  ResponseFailure,
} from '../../../utils/types/ResponseTypes'

export const createAirline = async (req: Request, res: Response) => {
  try {
    const airline = await airlineService.createAirline(req.body)
    const response: ResponseDetailSuccess<typeof airline> = {
      code: 201,
      message: 'Tạo hãng bay thành công',
      data: airline,
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

export const getAllAirlines = async (req: Request, res: Response) => {
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

    const result = await airlineService.getAllAirlines(
      searchParams,
      sortParams,
      paginateParams,
    )

    const response: ResponseListSuccess<typeof result.airlines> = {
      code: 200,
      message: result.airlines.length
        ? 'Lấy danh sách hãng bay thành công'
        : 'Không tìm thấy hãng bay nào',
      data: {
        hits: result.airlines,
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

export const getAirlineById = async (req: Request, res: Response) => {
  try {
    const airline = await airlineService.getAirlineById(req.params.id)
    if (!airline) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Không tìm thấy hãng bay',
        errors: [],
      }
      res.status(404).json(response)
      return
    }

    const response: ResponseDetailSuccess<typeof airline> = {
      code: 200,
      message: 'Lấy thông tin hãng bay thành công',
      data: airline,
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

export const updateAirline = async (req: Request, res: Response) => {
  try {
    const updatedAirline = await airlineService.updateAirline(
      req.params.id,
      req.body,
    )
    if (!updatedAirline) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Không tìm thấy hãng bay',
        errors: [],
      }
      res.status(404).json(response)
      return
    }

    const response: ResponseDetailSuccess<typeof updatedAirline> = {
      code: 200,
      message: 'Cập nhật hãng bay thành công',
      data: updatedAirline,
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

export const deleteAirline = async (req: Request, res: Response) => {
  try {
    const deletedAirline = await airlineService.deleteAirline(req.params.id)
    if (!deletedAirline) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Không tìm thấy hãng bay',
        errors: [],
      }
      res.status(404).json(response)
      return
    }

    const response: ResponseDetailSuccess<typeof deletedAirline> = {
      code: 200,
      message: 'Xóa hãng bay thành công',
      data: deletedAirline,
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
