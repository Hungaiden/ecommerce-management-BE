import { Request, Response } from "express";
import * as tourService from "../../services/admin/tour.service";
import {
  ResponseDetailSuccess,
  ResponseListSuccess,
  ResponseFailure,
} from "../../utils/types/ResponseTypes";

export const createPost = async (req: Request, res: Response) => {
  try {
    const tour = await tourService.createTour(req.body);
    const response: ResponseDetailSuccess<typeof tour> = {
      code: 201,
      data: tour,
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

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const result = await tourService.getAllTours();
    const response: ResponseListSuccess<typeof result> = {
      code: 200,
      data: {
        hits: result,
        pagination: {
          totalRows: 11,
          totalPages: 2,
        },
      },
    };
    res.status(200).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: "Lỗi khi lấy danh sách tour!",
      errors: [],
    };
    res.status(500).json(response);
  }
};

export const getTourById = async (req: Request, res: Response) => {
  try {
    const tour = await tourService.getTourByIdService(req.params.id);
    if (!tour) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy tour",
        errors: [],
      };
      res.status(404).json(response);
    }

    const response: ResponseDetailSuccess<typeof tour> = {
      code: 200,
      data: tour,
    };
    res.status(200).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: "Lỗi khi lấy thông tin tour!",
      errors: [],
    };
    res.status(500).json(response);
  }
};

export const updateTour = async (req: Request, res: Response) => {
  try {
    const updatedTour = await tourService.updateTour(req.params.id, req.body);
    if (!updatedTour) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy tour",
        errors: [],
      };
      res.status(404).json(response);
    }

    const response: ResponseDetailSuccess<typeof updatedTour> = {
      code: 200,
      data: updatedTour,
    };
    res.status(200).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: "Lỗi khi cập nhật tour!",
      errors: [],
    };
    res.status(500).json(response);
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  try {
    const deletedTour = await tourService.deleteTour(req.params.id);
    if (!deletedTour) {
      const response: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: "Không tìm thấy tour",
        errors: [],
      };
      res.status(404).json(response);
    }

    const response: ResponseDetailSuccess<typeof deletedTour> = {
      code: 200,
      data: deletedTour,
    };
    res.status(200).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: "Lỗi khi xóa tour!",
      errors: [],
    };
    res.status(500).json(response);
  }
};
