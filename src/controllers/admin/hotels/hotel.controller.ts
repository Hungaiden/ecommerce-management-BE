import { Request, Response } from "express"
import * as hotelService from '../../../services/admin/hotels/hotel.service'
import * as paramsTypes from "../../../utils/types/paramsTypes";
import {
  ResponseDetailSuccess,
  ResponseListSuccess,
  ResponseFailure,
} from "../../../utils/types/ResponseTypes"

export const createHotel = async (req: Request, res: Response) => {
  try {
    const hotel = await hotelService.createHotel(req.body)
    const response: ResponseDetailSuccess<typeof hotel> = {
      code: 201,
      message: "Tạo khách sạn thành công",
      data: hotel,
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

export const getAllHotels = async (req: Request, res: Response) => {
   try {
      const filter: paramsTypes.HotelFilterParams = {
        status: req.query.status as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      };
  
      const searchParams: paramsTypes.SearchParams = {
        keyword: req.query.keyword as string,
        field: req.query.field as string,
      };
  
      const sortParams: paramsTypes.SortParams = {
        sortBy: req.query.sortBy as string,
        sortType: req.query.sortType as paramsTypes.SORT_TYPE,
      };
  
      const paginateParams: paramsTypes.PaginateParams = {
        offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      };
      const result = await hotelService.getAllHotels(
        filter,
        searchParams,
        sortParams,
        paginateParams
      );
      if (result.hotels.length === 0) {
        const response: ResponseListSuccess<typeof result.hotels> = {
          code: 200,
          message: "Không tìm thấy hotel nào phù hợp",
          data: {
            hits: [],
            pagination: {
              totalRows: 0,
              totalPages: 0,
            },
          },
        };
        res.status(200).json(response)
        return 
      }
      const response: ResponseListSuccess<typeof result.hotels > = {
        code: 200,
        message: "Lấy danh sách hotel thành công",
        data: {
          hits: result.hotels,
          pagination: {
            totalRows: result.totalRows,
            totalPages: result.totalPages,
          },
        },
      };
      res.status(200).json(response);
    } catch (error: any) {
      const response: ResponseFailure = {
        code: 500,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Lỗi khi lấy danh sách hotel!",
        errors: [],
      };
      res.status(500).json(response);
    }
}

export const getHotelById = async (req: Request, res: Response) => {
  try {
    const hotel = await hotelService.getHotelById(req.params.id)
    if (!hotel) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy khách sạn",
        errors: [],
      }
      res.status(404).json(response)
    }

    const response: ResponseDetailSuccess<typeof hotel> = {
      code: 200,
      message: "Lấy thông tin khách sạn thành công",
      data: hotel,
    }
    res.status(200).json(response)
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: "Lỗi khi lấy thông tin khách sạn!",
      errors: [],
    }
    res.status(500).json(response)
  }
}

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const updatedHotel = await hotelService.updateHotel(req.params.id, req.body)
    if (!updatedHotel) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy khách sạn",
        errors: [],
      }
      res.status(404).json(response)
      return
    }

    const response: ResponseDetailSuccess<typeof updatedHotel> = {
      code: 200,
      message: "Cập nhật khách sạn thành công",
      data: updatedHotel,
    }
    res.status(200).json(response)
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: "Lỗi khi cập nhật khách sạn!",
      errors: [],
    }
    res.status(500).json(response)
  }
}

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    const deletedHotel = await hotelService.deleteHotel(req.params.id)
    if (!deletedHotel) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy khách sạn",
        errors: [],
      }
      res.status(404).json(response)
    }

    const response: ResponseDetailSuccess<typeof deletedHotel> = {
      code: 200,
      message: "Xóa khách sạn thành công",
      data: deletedHotel,
    }
    res.status(200).json(response)
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: "Lỗi khi xóa khách sạn!",
      errors: [],
    }
    res.status(500).json(response)
  }
}
