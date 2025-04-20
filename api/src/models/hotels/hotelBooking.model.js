"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelBooking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const hotelBookingSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hotel_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    room_type_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'RoomType',
        required: true,
    },
    check_in: {
        type: Date,
        required: true,
    },
    check_out: {
        type: Date,
        required: true,
    },
    num_rooms: {
        type: Number,
        required: true,
    },
    special_requests: {
        type: String,
    },
    total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
        required: true,
    },
    payment_id: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});
exports.HotelBooking = mongoose_1.default.model('HotelBooking', hotelBookingSchema, 'hotel_bookings');
