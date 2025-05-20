import type { Request, Response } from "express";
import * as airportService from "../../../services/admin/flights/airport.service";
import type * as paramsTypes from "../../../utils/types/paramsTypes";
import type {
  ResponseDetailSuccess,
  ResponseListSuccess,
  ResponseFailure,
} from "../../../utils/types/ResponseTypes";

export const createAirport = async (req: Request, res: Response) => {
  try {
    const airport = await airportService.createAirport(req.body);
    const response: ResponseDetailSuccess<typeof airport> = {
      code: 201,
      message: "Tạo sân bay thành công",
      data: airport,
    };
    res.status(201).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 400,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message,
      errors: [],
    };
    res.status(400).json(response);
  }
};

export const getAllAirports = async (req: Request, res: Response) => {
  try {
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

    const result = await airportService.getAllAirports(
      searchParams,
      sortParams,
      paginateParams
    );

    const response: ResponseListSuccess<typeof result.airports> = {
      code: 200,
      message: result.airports.length
        ? "Lấy danh sách sân bay thành công"
        : "Không tìm thấy sân bay nào",
      data: {
        hits: result.airports,
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
      message: error.message,
      errors: [],
    };
    res.status(500).json(response);
  }
};

export const getAirportById = async (req: Request, res: Response) => {
  try {
    const airport = await airportService.getAirportById(req.params.id);
    if (!airport) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy sân bay",
        errors: [],
      };
      res.status(404).json(response);
      return;
    }

    const response: ResponseDetailSuccess<typeof airport> = {
      code: 200,
      message: "Lấy thông tin sân bay thành công",
      data: airport,
    };
    res.status(200).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message,
      errors: [],
    };
    res.status(500).json(response);
  }
};

export const updateAirport = async (req: Request, res: Response) => {
  try {
    const updatedAirport = await airportService.updateAirport(
      req.params.id,
      req.body
    );
    if (!updatedAirport) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy sân bay",
        errors: [],
      };
      res.status(404).json(response);
      return;
    }

    const response: ResponseDetailSuccess<typeof updatedAirport> = {
      code: 200,
      message: "Cập nhật sân bay thành công",
      data: updatedAirport,
    };
    res.status(200).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message,
      errors: [],
    };
    res.status(500).json(response);
  }
};

export const deleteAirport = async (req: Request, res: Response) => {
  try {
    const deletedAirport = await airportService.deleteAirport(req.params.id);
    if (!deletedAirport) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy sân bay",
        errors: [],
      };
      res.status(404).json(response);
      return;
    }

    const response: ResponseDetailSuccess<typeof deletedAirport> = {
      code: 200,
      message: "Xóa sân bay thành công",
      data: deletedAirport,
    };
    res.status(200).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message,
      errors: [],
    };
    res.status(500).json(response);
  }
};
