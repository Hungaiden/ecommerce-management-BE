import { Tour } from '../../../models/tours/tour.model'

import type { CreateTourDto } from '../../../dto/tours/create.tour.dto'
import type { UpdateTourDto } from '../../../dto/tours/update.tour.dto'
import * as paramsTypes from '../../../utils/types/paramsTypes'

// Hàm tạo Tour
export const createTour = async (data: CreateTourDto) => {
  // Kiểm tra nếu code đã tồn tại
  const existingTour = await Tour.findOne({ code: data.code })
  if (existingTour) {
    throw new Error('Tour code đã tồn tại!')
  }

  // Tạo tour mới
  const newTour = new Tour(data)
  await newTour.save()
  return newTour
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
    return tour
  } catch (error) {
    throw new Error('Lỗi khi lấy thông tin tour!')
  }
}

// Hàm cập nhật Tour
export const updateTour = async (id: string, data: UpdateTourDto) => {
  try {
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
