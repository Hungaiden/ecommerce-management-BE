import { Request, Response } from 'express'
import * as tourService from '../../services/admin/tour.service'

export const createPost = async (req: Request, res: Response) => {
  try {
    const tour = await tourService.createTour(req.body)
    res.status(201).json({
      message: 'Thêm mớI tour thành công!',
      tour: tour,
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const tours = await tourService.getAllTours()
    res.status(200).json({ 
      message: 'Lấy danh sách tour thành công!',
      tours: tours,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getTourById = async (req: Request, res: Response) => {
  try {
    const tourId = req.params.id
    const tour = await tourService.getTourByIdService(tourId)
    if (!tour) {
      res.status(404).json({ message: 'Không tìm thấy tour' })
    }
    res.status(200).json({ 
      message: 'Lấy thông tin tour thành công!',
      tour: tour,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const updateTour = async (req: Request, res: Response) => {  
  try {
    const tourId = req.params.id
    const updatedTour = await tourService.updateTour(tourId, req.body)
    if (!updatedTour) {
      res.status(404).json({ message: 'Không tìm thấy tour' })
    }
    res.status(200).json({ 
      message: 'Cập nhật tour thành công!',
      tour: updatedTour,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteTour = async (req: Request, res: Response) => {
  try {
    const tourId = req.params.id
    const deletedTour = await tourService.deleteTour(tourId)
    if (!deletedTour) {
      res.status(404).json({ message: 'Không tìm thấy tour' })
    }
    res.status(200).json({ 
      message: 'Xóa tour thành công!',
      tour: deletedTour,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

