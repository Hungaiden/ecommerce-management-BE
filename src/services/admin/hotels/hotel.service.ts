import { Hotel } from "../../../models/hotels/hotel.model";
import { CreateHotelDto } from "../../../dto/hotels/create.hotel.dto";
import { UpdateHotelDto } from "../../../dto/hotels/update.hotel.dto";

// Hàm tạo Hotel
export const createHotel = async (data: CreateHotelDto) => {
  // Kiểm tra nếu slug đã tồn tại
  const existingHotel = await Hotel.findOne({ slug: data.slug });
  if (existingHotel) {
    throw new Error("Hotel slug đã tồn tại!");
  }

  const newHotel = new Hotel(data);
  await newHotel.save();
  return newHotel;
};

// Hàm lấy tất cả Hotel
export const getAllHotels = async () => {
  try {
    const hotels = await Hotel.find({
      deleted: false,
    });
    return hotels;
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách khách sạn!");
  }
};

// Hàm lấy Hotel theo ID
export const getHotelById = async (id: string) => {
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      deleted: false,
    });
    return hotel;
  } catch (error) {
    throw new Error("Lỗi khi lấy thông tin khách sạn!");
  }
};

// Hàm cập nhật Hotel
export const updateHotel = async (id: string, data: UpdateHotelDto) => {
  try {
    const updatedHotel = await Hotel.findOneAndUpdate(
      { _id: id, deleted: false },
      data,
      { new: true }
    );
    return updatedHotel;
  } catch (error) {
    throw new Error("Lỗi khi cập nhật khách sạn!");
  }
};

// Hàm xóa Hotel (mềm)
export const deleteHotel = async (id: string) => {
  try {
    const deletedHotel = await Hotel.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true },
      { new: true }
    );
    return deletedHotel;
  } catch (error) {
    throw new Error("Lỗi khi xóa khách sạn!");
  }
};
