import { TourCategory } from '../../../models/tours/tourCategory.model'
import type { CreateTourCategoryDto } from '../../../dto/tours/create.tourCategory.dto'
import type { UpdateTourCategoryDto } from '../../../dto/tours/update.tourCategory.dto'
import * as paramsTypes from '../../../utils/types/paramsTypes'

export const createTourCategory = async (data: CreateTourCategoryDto) => {
  const existingCategory = await TourCategory.findOne({ title: data.title })
  if (existingCategory) {
    throw new Error('Tour category title đã tồn tại!')
  }

  const newCategory = new TourCategory(data)
  await newCategory.save()
  return newCategory
}

export const getAllTourCategories = async (
  searchParams?: paramsTypes.SearchParams,
  sortParams?: paramsTypes.SortParams,
  paginateParams?: paramsTypes.PaginateParams,
) => {
  try {
    const query: any = { deleted: false }

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

    const categories = await TourCategory.find(query)
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean()

    const totalRows = await TourCategory.countDocuments(query)
    const totalPages = Math.ceil(totalRows / limit)

    return { categories, totalRows, totalPages }
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách category!')
  }
}

export const getTourCategoryById = async (id: string) => {
  try {
    const category = await TourCategory.findOne({
      _id: id,
      deleted: false,
    })
    return category
  } catch (error) {
    throw new Error('Lỗi khi lấy thông tin category!')
  }
}

export const updateTourCategory = async (
  id: string,
  data: UpdateTourCategoryDto,
) => {
  try {
    const updatedCategory = await TourCategory.findOneAndUpdate(
      { _id: id, deleted: false },
      data,
      { new: true },
    )
    return updatedCategory
  } catch (error) {
    throw new Error('Lỗi khi cập nhật category!')
  }
}

export const deleteTourCategory = async (id: string) => {
  try {
    const deletedCategory = await TourCategory.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true, deleted_at: new Date() },
      { new: true },
    )
    return deletedCategory
  } catch (error) {
    throw new Error('Lỗi khi xóa category!')
  }
}
