import { Tour } from '../../../models/tours/tour.model'
import { TourCategory } from '../../../models/tours/tourCategory.model'
import type { CreateTourDto, TourStatus } from '../../../dto/tours/create.tour.dto'
import type { UpdateTourDto } from '../../../dto/tours/update.tour.dto'
import * as paramsTypes from '../../../utils/types/paramsTypes'
import mongoose from 'mongoose'

// Hàm tạo Tour
export const createTour = async (raw: any) => {
  // Ép kiểu dữ liệu đúng theo CreateTourDto
  const data: CreateTourDto = {
    title: raw.title,
    code: raw.code,
    category_id: raw.category_id || undefined,
    images: raw.imagesPath, // Nếu bạn xử lý file trả về path
    price: raw.price ? Number(raw.price) : undefined,
    discount: raw.discount ? Number(raw.discount) : undefined,
    information: raw.information || undefined,
    schedule: raw.schedule || undefined,
    duration_days: raw.duration_days ? Number(raw.duration_days) : undefined,
    time_start: raw.time_start ? new Date(raw.time_start) : undefined,
    time_end: raw.time_end ? new Date(raw.time_end) : undefined,
    stock: raw.stock ? Number(raw.stock) : undefined,
    status: raw.status as TourStatus,
    position: raw.position ? Number(raw.position) : undefined,
  };

  // Kiểm tra nếu code đã tồn tại
  const existingTour = await Tour.findOne({ code: data.code });
  if (existingTour) {
    throw new Error('Tour code đã tồn tại!');
  }

  // Tạo tour mới
  const newTour = new Tour(data);
  await newTour.save();
  return newTour;
}

// Hàm lấy tất cả Tour
export const getAllTours = async (
  filter?: paramsTypes.TourFilterParams,
  searchParams?: paramsTypes.SearchParams,
  sortParams?: paramsTypes.SortParams,
  paginateParams?: paramsTypes.PaginateParams,
) => {
  try {
    // Bộ lọc
    const query: any = { deleted: false }
    if (filter.status) query.status = filter.status
    if (filter.minPrice) query.price = { $gte: filter.minPrice }
    if (filter.maxPrice) query.price = { $lte: filter.maxPrice }
    if (filter.tourCategory) query.tourCategory = filter.tourCategory
    if (filter.duration_days) query.duration_days = filter.duration_days

    // Tìm kiếm theo từ khóa
    if (searchParams?.keyword && searchParams?.field) {
      query[searchParams.field] = {
        $regex: searchParams.keyword, // Tìm kiếm không phân biệt chữ hoa hay thường
        $options: 'i', // 'i' để không phân biệt hoa thường
      }
    }

    // Phân trang
    const offset = paginateParams?.offset || 0
    const limit = paginateParams?.limit || 10

    // Sắp xếp
    const sortQuery: any = {}
    if (sortParams?.sortBy) {
      sortQuery[sortParams.sortBy] =
        sortParams.sortType === paramsTypes.SORT_TYPE.ASC ? 1 : -1
    }

    // Truy vấn MongoDB
    const tours = await Tour.find(query)
      .skip(offset) // Bỏ qua số lượng bản ghi dựa trên offset
      .limit(limit) // Giới hạn số bản ghi trả về
      .sort(sortQuery) // Sắp xếp theo sortQuery
      .populate('category_id')
      .lean() // Chuyển đổi kết quả thành đối tượng JavaScript thuần túy
    const totalRows = await Tour.countDocuments(query) // Đếm tổng số bản ghi
    const totalPages = Math.ceil(totalRows / limit) // Tính tổng số trang

    return { tours, totalRows, totalPages }
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách tour!')
  }
}

// Hàm lấy Tour theo ID
export const getTourByIdService = async (id: string) => {
  try {
    const tour = await Tour.findOne({
      _id: id,
      deleted: false,
    })
      .populate({
        path: 'category_id',
        select: 'title',
      }) // Populate category first
      .populate({
        path: 'reviews',
        model: 'TourReview', // Explicitly specify model
        match: {
          deleted: false,
          is_approved: true,
        },
        populate: {
          path: 'user_id',
          model: 'Account',
          select: 'fullname email avatar',
        },
      })
      .exec() // Force execution of query

    if (!tour) {
      throw new Error('Tour không tồn tại!')
    }
    return tour
  } catch (error) {
    throw new Error('Lỗi khi lấy thông tin tour!')
  }
}

// Hàm cập nhật Tour
export const updateTour = async (id: string, raw: any) => {
  try {
    const data: Partial<UpdateTourDto> = {
      title: raw.title,
      code: raw.code,
      category_id: raw.category_id || undefined,
      images: raw.imagesPath || undefined, // Nếu bạn xử lý file trả về path
      price: raw.price ? Number(raw.price) : undefined,
      discount: raw.discount ? Number(raw.discount) : undefined,
      information: raw.information || undefined,
      schedule: raw.schedule || undefined,
      time_start: raw.time_start ? new Date(raw.time_start) : undefined,
      time_end: raw.time_end ? new Date(raw.time_end) : undefined,
      stock: raw.stock ? Number(raw.stock) : undefined,
      status: raw.status as TourStatus || undefined,
      position: raw.position ? Number(raw.position) : undefined,
    }

    const updatedTour = await Tour.findOneAndUpdate(
      { _id: id, deleted: false },
      data,
      { new: true },
    )
    return updatedTour
  } catch (error) {
    throw new Error('Lỗi khi cập nhật tour!')
  }
}

// Hàm xóa Tour
export const deleteOneTour = async (id: string) => {
  try {
    const deletedTour = await Tour.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true, deleted_at: new Date() },
      { new: true },
    )
    return deletedTour
  } catch (error) {
    throw new Error('Lỗi khi xóa tour!')
  }
}

// Hàm lấy Tour theo category_id
export const getToursByCategory = async (
  categoryId: string,
  searchParams?: paramsTypes.SearchParams,
  sortParams?: paramsTypes.SortParams,
  paginateParams?: paramsTypes.PaginateParams,
) => {
  try {
    const query: any = { deleted: false ,category_id: new mongoose.Types.ObjectId(categoryId) }
    if (searchParams?.keyword && searchParams?.field) {
      query[searchParams.field] = {
        $regex: searchParams.keyword,
        $options: 'i',
      }
    }

    const offset = paginateParams?.offset || 0
    const limit = paginateParams?.limit || 10

    const sortQuery: any = {}
    if (sortParams?.sortBy) {
      sortQuery[sortParams.sortBy] =
        sortParams.sortType === paramsTypes.SORT_TYPE.ASC ? 1 : -1
    }
    
    const tours = await Tour.find(query)
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean()

    const totalRows = await Tour.countDocuments(query)
    const totalPages = Math.ceil(totalRows / limit)

    return { tours, totalRows, totalPages }
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách tour theo category!')
  }
}