import { RoomType } from '../../../models/hotels/roomType.model'
import type { CreateRoomTypeDto } from '../../../dto/hotels/create.roomType.dto'
import type { UpdateRoomTypeDto } from '../../../dto/hotels/update.roomType.dto'
import * as paramsTypes from '../../../utils/types/paramsTypes'

export const createRoomType = async (data: CreateRoomTypeDto) => {
  try {
    const newRoomType = new RoomType(data)
    await newRoomType.save()
    return newRoomType
  } catch (error) {
    throw new Error('Lỗi khi tạo loại phòng!')
  }
}

export const getAllRoomTypes = async (
  searchParams?: paramsTypes.SearchParams,
  sortParams?: paramsTypes.SortParams,
  paginateParams?: paramsTypes.PaginateParams,
  hotelId?: string,
) => {
  try {
    const query: any = { deleted: false }
    if (hotelId) query.hotel_id = hotelId

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

    const roomTypes = await RoomType.find(query)
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean()

    const totalRows = await RoomType.countDocuments(query)
    const totalPages = Math.ceil(totalRows / limit)
    return { roomTypes, totalRows, totalPages }
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách loại phòng!')
  }
}

export const getRoomTypeById = async (id: string) => {
  try {
    const roomType = await RoomType.findOne({
      _id: id,
      deleted: false,
    })
    return roomType
  } catch (error) {
    throw new Error('Lỗi khi lấy thông tin loại phòng!')
  }
}

export const updateRoomType = async (id: string, data: UpdateRoomTypeDto) => {
  try {
    const updatedRoomType = await RoomType.findOneAndUpdate(
      { _id: id, deleted: false },
      data,
      { new: true },
    )
    return updatedRoomType
  } catch (error) {
    throw new Error('Lỗi khi cập nhật loại phòng!')
  }
}

export const deleteRoomType = async (id: string) => {
  try {
    const deletedRoomType = await RoomType.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true, deleted_at: new Date() },
      { new: true },
    )
    return deletedRoomType
  } catch (error) {
    throw new Error('Lỗi khi xóa loại phòng!')
  }
}
