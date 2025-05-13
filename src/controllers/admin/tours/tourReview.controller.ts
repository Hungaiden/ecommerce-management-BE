import type { Request, Response } from 'express'
import * as tourReviewService from '../../../services/admin/tours/tourReview.service'
import type {
  ResponseDetailSuccess,
  ResponseFailure,
} from '../../../utils/types/ResponseTypes'

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = await tourReviewService.createReview({
      ...req.body,
      user_id: req.jwtDecoded.userId, // Lấy userId từ token
    })

    const response: ResponseDetailSuccess<typeof review> = {
      code: 201,
      message: 'Đánh giá tour thành công',
      data: review,
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

export const approveReview = async (req: Request, res: Response) => {
  try {
    const review = await tourReviewService.updateReview(req.params.id, {
      is_approved: true,
    })

    const response: ResponseDetailSuccess<typeof review> = {
      code: 200,
      message: 'Duyệt đánh giá thành công',
      data: review,
    }
    res.status(200).json(response)
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

export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await tourReviewService.updateReview(
      req.params.id,
      req.body,
    )

    const response: ResponseDetailSuccess<typeof review> = {
      code: 200,
      message: 'Cập nhật đánh giá thành công',
      data: review,
    }
    res.status(200).json(response)
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

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await tourReviewService.deleteReview(req.params.id)

    const response: ResponseDetailSuccess<typeof review> = {
      code: 200,
      message: 'Xóa đánh giá thành công',
      data: review,
    }
    res.status(200).json(response)
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
