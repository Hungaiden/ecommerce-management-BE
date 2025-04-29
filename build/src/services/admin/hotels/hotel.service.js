"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotel = exports.updateHotel = exports.getHotelById = exports.getAllHotels = exports.createHotel = void 0;
const hotel_model_1 = require("../../../models/hotels/hotel.model");
const createHotel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingHotel = yield hotel_model_1.Hotel.findOne({ slug: data.slug });
    if (existingHotel) {
        throw new Error("Hotel slug đã tồn tại!");
    }
    const newHotel = new hotel_model_1.Hotel(data);
    yield newHotel.save();
    return newHotel;
});
exports.createHotel = createHotel;
const getAllHotels = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield hotel_model_1.Hotel.find({
            deleted: false,
        });
        return hotels;
    }
    catch (error) {
        throw new Error("Lỗi khi lấy danh sách khách sạn!");
    }
});
exports.getAllHotels = getAllHotels;
const getHotelById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = yield hotel_model_1.Hotel.findOne({
            _id: id,
            deleted: false,
        });
        return hotel;
    }
    catch (error) {
        throw new Error("Lỗi khi lấy thông tin khách sạn!");
    }
});
exports.getHotelById = getHotelById;
const updateHotel = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedHotel = yield hotel_model_1.Hotel.findOneAndUpdate({ _id: id, deleted: false }, data, { new: true });
        return updatedHotel;
    }
    catch (error) {
        throw new Error("Lỗi khi cập nhật khách sạn!");
    }
});
exports.updateHotel = updateHotel;
const deleteHotel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedHotel = yield hotel_model_1.Hotel.findOneAndUpdate({ _id: id, deleted: false }, { deleted: true }, { new: true });
        return deletedHotel;
    }
    catch (error) {
        throw new Error("Lỗi khi xóa khách sạn!");
    }
});
exports.deleteHotel = deleteHotel;
