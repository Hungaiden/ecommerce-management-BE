import type { Request, Response } from 'express'
import * as roomTypeService from '../../../services/admin/hotels/roomType.service'
import type * as paramsTypes from '../../../utils/types/paramsTypes'
import type {
  ResponseDetailSuccess,
  ResponseListSuccess,
  ResponseFailure,
} from '../../../utils/types/ResponseTypes'

export const createRoomType = async (req: Request, res: Response) => {
  try {
    const roomType = await roomTypeService.createRoomType(req.body)
    const response: ResponseDetailSuccess<typeof roomType> = {
      code: 201,
      message: 'Tạo loại phòng thành công',
      data: roomType,
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

export const getAllRoomTypes = async (req: Request, res: Response) => {
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

    const result = await roomTypeService.getAllRoomTypes(
      searchParams,
      sortParams,
      paginateParams,
      req.query.hotel_id as string,
    )

    if (result.roomTypes.length === 0) {
      const response: ResponseListSuccess<typeof result.roomTypes> = {
        code: 200,
        message: 'Không tìm thấy loại phòng nào',
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

    const response: ResponseListSuccess<typeof result.roomTypes> = {
      code: 200,
      message: 'Lấy danh sách loại phòng thành công',
      data: {
        hits: result.roomTypes,
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

export const getRoomTypeById = async (req: Request, res: Response) => {
  try {
    const roomType = await roomTypeService.getRoomTypeById(req.params.id)
    if (!roomType) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Không tìm thấy loại phòng',
        errors: [],
      }
      res.status(404).json(response)
      return
    }

    const response: ResponseDetailSuccess<typeof roomType> = {
      code: 200,
      message: 'Lấy thông tin loại phòng thành công',
      data: roomType,
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

export const updateRoomType = async (req: Request, res: Response) => {
  try {
    const updatedRoomType = await roomTypeService.updateRoomType(
      req.params.id,
      req.body,
    )
    if (!updatedRoomType) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Không tìm thấy loại phòng',
        errors: [],
      }
      res.status(404).json(response)
      return
    }

    const response: ResponseDetailSuccess<typeof updatedRoomType> = {
      code: 200,
      message: 'Cập nhật loại phòng thành công',
      data: updatedRoomType,
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

export const deleteRoomType = async (req: Request, res: Response) => {
  try {
    const deletedRoomType = await roomTypeService.deleteRoomType(req.params.id)
    if (!deletedRoomType) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Không tìm thấy loại phòng',
        errors: [],
      }
      res.status(404).json(response)
      return
    }

    const response: ResponseDetailSuccess<typeof deletedRoomType> = {
      code: 200,
      message: 'Xóa loại phòng thành công',
      data: deletedRoomType,
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
