import type { Request, Response } from "express";
import * as ticketClassService from "../../../services/admin/flights/ticketClass.service";
import type * as paramsTypes from "../../../utils/types/paramsTypes";
import type {
  ResponseDetailSuccess,
  ResponseListSuccess,
  ResponseFailure,
} from "../../../utils/types/ResponseTypes";

export const createTicketClass = async (req: Request, res: Response) => {
  try {
    const ticketClass = await ticketClassService.createTicketClass(req.body);
    const response: ResponseDetailSuccess<typeof ticketClass> = {
      code: 201,
      message: "Tạo hạng vé thành công",
      data: ticketClass,
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

export const getAllTicketClasses = async (req: Request, res: Response) => {
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

    const result = await ticketClassService.getAllTicketClasses(
      searchParams,
      sortParams,
      paginateParams
    );

    const response: ResponseListSuccess<typeof result.ticketClasses> = {
      code: 200,
      message: result.ticketClasses.length
        ? "Lấy danh sách hạng vé thành công"
        : "Không tìm thấy hạng vé nào",
      data: {
        hits: result.ticketClasses,
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

export const getTicketClassById = async (req: Request, res: Response) => {
  try {
    const ticketClass = await ticketClassService.getTicketClassById(
      req.params.id
    );
    if (!ticketClass) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy hạng vé",
        errors: [],
      };
      res.status(404).json(response);
      return;
    }

    const response: ResponseDetailSuccess<typeof ticketClass> = {
      code: 200,
      message: "Lấy thông tin hạng vé thành công",
      data: ticketClass,
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

export const updateTicketClass = async (req: Request, res: Response) => {
  try {
    const updatedTicketClass = await ticketClassService.updateTicketClass(
      req.params.id,
      req.body
    );
    if (!updatedTicketClass) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy hạng vé",
        errors: [],
      };
      res.status(404).json(response);
      return;
    }

    const response: ResponseDetailSuccess<typeof updatedTicketClass> = {
      code: 200,
      message: "Cập nhật hạng vé thành công",
      data: updatedTicketClass,
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

export const deleteTicketClass = async (req: Request, res: Response) => {
  try {
    const deletedTicketClass = await ticketClassService.deleteTicketClass(
      req.params.id
    );
    if (!deletedTicketClass) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy hạng vé",
        errors: [],
      };
      res.status(404).json(response);
      return;
    }

    const response: ResponseDetailSuccess<typeof deletedTicketClass> = {
      code: 200,
      message: "Xóa hạng vé thành công",
      data: deletedTicketClass,
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
