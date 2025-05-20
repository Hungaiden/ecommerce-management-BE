import type { Request, Response } from "express";
import * as flightService from "../../../services/admin/flights/flight.service";
import type * as paramsTypes from "../../../utils/types/paramsTypes";
import type {
  ResponseDetailSuccess,
  ResponseListSuccess,
  ResponseFailure,
} from "../../../utils/types/ResponseTypes";

export const createFlight = async (req: Request, res: Response) => {
  try {
    const flight = await flightService.createFlight(req.body);
    const response: ResponseDetailSuccess<typeof flight> = {
      code: 201,
      message: "Tạo chuyến bay thành công",
      data: flight,
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

export const getAllFlights = async (req: Request, res: Response) => {
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

    const result = await flightService.getAllFlights(
      searchParams,
      sortParams,
      paginateParams
    );

    const response: ResponseListSuccess<typeof result.flights> = {
      code: 200,
      message: result.flights.length
        ? "Lấy danh sách chuyến bay thành công"
        : "Không có chuyến bay nào",
      data: {
        hits: result.flights,
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

export const getFlightById = async (req: Request, res: Response) => {
  try {
    const flight = await flightService.getFlightById(req.params.id);
    if (!flight) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy chuyến bay",
        errors: [],
      };
      res.status(404).json(response);
      return;
    }

    const response: ResponseDetailSuccess<typeof flight> = {
      code: 200,
      message: "Lấy thông tin chuyến bay thành công",
      data: flight,
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

export const updateFlight = async (req: Request, res: Response) => {
  try {
    const updatedFlight = await flightService.updateFlight(
      req.params.id,
      req.body
    );
    if (!updatedFlight) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy chuyến bay",
        errors: [],
      };
      res.status(404).json(response);
      return;
    }

    const response: ResponseDetailSuccess<typeof updatedFlight> = {
      code: 200,
      message: "Cập nhật chuyến bay thành công",
      data: updatedFlight,
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

export const deleteFlight = async (req: Request, res: Response) => {
  try {
    const deletedFlight = await flightService.deleteFlight(req.params.id);
    if (!deletedFlight) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy chuyến bay",
        errors: [],
      };
      res.status(404).json(response);
      return;
    }

    const response: ResponseDetailSuccess<typeof deletedFlight> = {
      code: 200,
      message: "Xóa chuyến bay thành công",
      data: deletedFlight,
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
