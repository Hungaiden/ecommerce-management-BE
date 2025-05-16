import { Hotel } from '../../../models/hotels/hotel.model'
import { RoomType } from '../../../models/hotels/roomType.model'
import type { CreateHotelDto } from '../../../dto/hotels/create.hotel.dto'
import type { UpdateHotelDto } from '../../../dto/hotels/update.hotel.dto'
import * as paramsTypes from '../../../utils/types/paramsTypes'

// Hàm tạo Hotel
export const createHotel = async (data: CreateHotelDto) => {
  // Kiểm tra nếu slug đã tồn tại
  const existingHotel = await Hotel.findOne({ slug: data.slug })
  if (existingHotel) {
    throw new Error('Hotel slug đã tồn tại!')
  }

  const newHotel = new Hotel(data)
  await newHotel.save()
  return newHotel
}

// Hàm lấy tất cả Hotel
export const getAllHotels = async (
  filter?: paramsTypes.HotelFilterParams,
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
    if (filter.city) query.city = filter.city

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
    const hotels = await Hotel.find(query)
      .skip(offset) // Bỏ qua số lượng bản ghi dựa trên offset
      .limit(limit) // Giới hạn số bản ghi trả về
      .sort(sortQuery) // Sắp xếp theo sortQuery
      .lean() // Chuyển đổi kết quả thành đối tượng JavaScript thuần túy
    const totalRows = await Hotel.countDocuments(query) // Đếm tổng số bản ghi
    const totalPages = Math.ceil(totalRows / limit) // Tính tổng số trang

    return { hotels, totalRows, totalPages }
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách hotel!')
  }
}

// Hàm lấy Hotel theo ID
export const getHotelById = async (id: string) => {
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      deleted: false,
    })
    return hotel
  } catch (error) {
    throw new Error('Lỗi khi lấy thông tin khách sạn!')
  }
}

// Hàm cập nhật Hotel
export const updateHotel = async (id: string, data: UpdateHotelDto) => {
  try {
    const updatedHotel = await Hotel.findOneAndUpdate(
      { _id: id, deleted: false },
      data,
      { new: true },
    )
    return updatedHotel
  } catch (error) {
    throw new Error('Lỗi khi cập nhật khách sạn!')
  }
}

// Hàm xóa Hotel (mềm)
export const deleteHotel = async (id: string) => {
  try {
    const deletedHotel = await Hotel.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true },
      { new: true },
    )
    return deletedHotel
  } catch (error) {
    throw new Error('Lỗi khi xóa khách sạn!')
  }
}

// Hàm lấy room types theo hotel ID
export const getRoomTypesByHotelId = async (hotelId: string) => {
  try {
    const roomTypes = await RoomType.find({
      hotel_id: hotelId,
      deleted: false,
    }).sort('position')
    return roomTypes
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách loại phòng!')
  }
}
