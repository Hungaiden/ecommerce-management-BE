import type { Request, Response } from "express";
import * as flightReviewService from "../../../services/admin/flights/flightReview.service";
import type * as paramsTypes from "../../../utils/types/paramsTypes";
import type {
  ResponseDetailSuccess,
  ResponseListSuccess,
  ResponseFailure,
} from "../../../utils/types/ResponseTypes";

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = await flightReviewService.createReview({
      ...req.body,
      user_id: req.jwtDecoded.userId,
    });

    const response: ResponseDetailSuccess<typeof review> = {
      code: 201,
      message: "Đánh giá chuyến bay thành công",
      data: review,
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

export const approveReview = async (req: Request, res: Response) => {
  try {
    const review = await flightReviewService.updateReview(req.params.id, {
      is_approved: true,
    });

    const response: ResponseDetailSuccess<typeof review> = {
      code: 200,
      message: "Duyệt đánh giá thành công",
      data: review,
    };
    res.status(200).json(response);
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

export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await flightReviewService.updateReview(
      req.params.id,
      req.body
    );

    const response: ResponseDetailSuccess<typeof review> = {
      code: 200,
      message: "Cập nhật đánh giá thành công",
      data: review,
    };
    res.status(200).json(response);
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

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await flightReviewService.deleteReview(req.params.id);

    const response: ResponseDetailSuccess<typeof review> = {
      code: 200,
      message: "Xóa đánh giá thành công",
      data: review,
    };
    res.status(200).json(response);
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

export const getAllReviews = async (req: Request, res: Response) => {
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

    const result = await flightReviewService.getAllReviews(
      searchParams,
      sortParams,
      paginateParams
    );

    if (result.reviews.length === 0) {
      const response: ResponseListSuccess<typeof result.reviews> = {
        code: 200,
        message: "Không tìm thấy đánh giá nào",
        data: {
          hits: [],
          pagination: {
            totalRows: 0,
            totalPages: 0,
          },
        },
      };
      res.status(200).json(response);
      return;
    }

    const response: ResponseListSuccess<typeof result.reviews> = {
      code: 200,
      message: "Lấy danh sách đánh giá thành công",
      data: {
        hits: result.reviews,
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

export const getReviewsByFlightId = async (req: Request, res: Response) => {
  try {
    const sortParams: paramsTypes.SortParams = {
      sortBy: req.query.sortBy as string,
      sortType: req.query.sortType as paramsTypes.SORT_TYPE,
    };

    const paginateParams: paramsTypes.PaginateParams = {
      offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
    };

    const result = await flightReviewService.getReviewsByFlightId(
      req.params.flightId,
      sortParams,
      paginateParams
    );

    if (result.reviews.length === 0) {
      const response: ResponseListSuccess<typeof result.reviews> = {
        code: 200,
        message: "Chưa có đánh giá nào cho chuyến bay này",
        data: {
          hits: [],
          pagination: {
            totalRows: 0,
            totalPages: 0,
          },
        },
      };
      res.status(200).json(response);
      return;
    }

    const response: ResponseListSuccess<typeof result.reviews> = {
      code: 200,
      message: "Lấy danh sách đánh giá thành công",
      data: {
        hits: result.reviews,
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
