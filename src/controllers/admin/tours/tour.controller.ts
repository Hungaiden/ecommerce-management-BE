import type { Request, Response } from 'express'
import * as tourService from '../../../services/admin/tours/tour.service'
import type * as paramsTypes from '../../../utils/types/paramsTypes'
import type {
  ResponseDetailSuccess,
  ResponseListSuccess,
  ResponseFailure,
} from '../../../utils/types/ResponseTypes'
import { TourStatus } from '../../../dto/tours/create.tour.dto'
export const createPost = async (req: Request, res: Response) => {
  try {
    
    const tour = await tourService.createTour(req.body)
    const response: ResponseDetailSuccess<typeof tour> = {
      code: 201,
      message: 'Tạo tour thành công',
      data: tour,
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

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const filter: paramsTypes.TourFilterParams = {
      status: req.query.status as string,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      tourCategory: req.query.tourCategory as string,
      duration_days: req.query.duration_days ? Number(req.query.duration_days) : undefined,
    }
    
    
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
    const result = await tourService.getAllTours(
      filter,
      searchParams,
      sortParams,
      paginateParams,
    )
    if (result.tours.length === 0) {
      const response: ResponseListSuccess<typeof result.tours> = {
        code: 200,
        message: 'Không tìm thấy tour nào phù hợp',
        data: {
          hits: [],
          pagination: {
            totalRows: 0,
            totalPages: 0,
          },
        },
      }
      res.status(200).json(response)
      return
    }
    const response: ResponseListSuccess<typeof result.tours> = {
      code: 200,
      message: 'Lấy danh sách tour thành công',
      data: {
        hits: result.tours,
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
      message: 'Lỗi khi lấy danh sách tour!',
      errors: [],
    }
    res.status(500).json(response)
  }
}

export const getTourById = async (req: Request, res: Response) => {
  try {
    const tour = await tourService.getTourByIdService(req.params.id)
    if (!tour) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Không tìm thấy tour',
        errors: [],
      }
      res.status(404).json(response)
      return
    }

    const response: ResponseDetailSuccess<typeof tour> = {
      code: 200,
      message: 'Lấy thông tin tour thành công',
      data: tour,
    }
    res.status(200).json(response)
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: 'Lỗi khi lấy thông tin tour!',
      errors: [],
    }
    res.status(500).json(response)
  }
}

export const updateTour = async (req: Request, res: Response) => {
  try {
    const updatedTour = await tourService.updateTour(req.params.id, req.body)
    if (!updatedTour) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Không tìm thấy tour',
        errors: [],
      }
      res.status(404).json(response)
      return
    }

    const response: ResponseDetailSuccess<typeof updatedTour> = {
      code: 200,
      message: 'Cập nhật tour thành công',
      data: updatedTour,
    }
    res.status(200).json(response)
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: 'Lỗi khi cập nhật tour!',
      errors: [],
    }
    res.status(500).json(response)
  }
}

export const deleteOneTour = async (req: Request, res: Response) => {
  try {
    const deletedTour = await tourService.deleteOneTour(req.params.id)
    if (!deletedTour) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Không tìm thấy tour',
        errors: [],
      }
      res.status(404).json(response)
      return
    }

    const response: ResponseDetailSuccess<typeof deletedTour> = {
      code: 200,
      message: 'Xóa tour thành công',
      data: deletedTour,
    }
    res.status(200).json(response)
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: 'Lỗi khi xóa tour!',
      errors: [],
    }
    res.status(500).json(response)
  }
}

export const getToursByCategory = async (req: Request, res: Response) => {
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

    const result = await tourService.getToursByCategory(
      req.params.categoryId,
      searchParams,
      sortParams,
      paginateParams,
    )
    
    if (result.tours.length === 0) {
      const response: ResponseListSuccess<typeof result.tours> = {
        code: 200,
        message: 'Không tìm thấy tour nào trong category này',
        data: {
          hits: [],
          pagination: {
            totalRows: 0,
            totalPages: 0,
          },
        },
      }
      res.status(200).json(response)
      return 
    }

    const response: ResponseListSuccess<typeof result.tours> = {
      code: 200,
      message: 'Lấy danh sách tour theo category thành công',
      data: {
        hits: result.tours,
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
