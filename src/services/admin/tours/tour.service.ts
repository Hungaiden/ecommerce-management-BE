import { Tour } from "../../../models/tours/tour.model";

import { CreateTourDto } from "../../../dto/tours/create.tour.dto";
import { UpdateTourDto } from "../../../dto/tours/update.tour.dto";

// Hàm tạo Tour
export const createTour = async (data: CreateTourDto) => {
  // Kiểm tra nếu code đã tồn tại
  const existingTour = await Tour.findOne({ code: data.code });
  if (existingTour) {
    throw new Error("Tour code đã tồn tại!");
  }

  // Tạo tour mới
  const newTour = new Tour(data);
  await newTour.save();
  return newTour;
};

// Hàm lấy tất cả Tour
export const getAllTours = async () => {
  try {
    const tours = await Tour.find({
      deleted: false,
    });
    return tours;
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách tour!");
  }
};

// Hàm lấy Tour theo ID
export const getTourByIdService = async (id: string) => {
  try {
    const tour = await Tour.findOne({
      _id: id,
      deleted: false,
    });
    return tour;
  } catch (error) {
    throw new Error("Lỗi khi lấy thông tin tour!");
  }
};

// Hàm cập nhật Tour
export const updateTour = async (id: string, data: UpdateTourDto) => {
  try {
    const updatedTour = await Tour.findOneAndUpdate(
      { _id: id, deleted: false },
      data,
      { new: true }
    );
    return updatedTour;
  } catch (error) {
    throw new Error("Lỗi khi cập nhật tour!");
  }
};

// Hàm xóa Tour
export const deleteOneTour = async (id: string) => {
  try {
    const deletedTour = await Tour.findOneAndUpdate(
      { _id: id, deleted: false },
      { deleted: true, deleted_at: new Date() },
      { new: true }
    );
    return deletedTour;
  } catch (error) {
    throw new Error("Lỗi khi xóa tour!");
  }
};
