"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourBooking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tourBookingSchema = new mongoose_1.default.Schema({
    tour_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Tour',
        required: true,
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    booking_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending',
    },
    total_price: {
        type: Number,
        required: true,
    },
    payment_status: {
        type: String,
        required: true,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deleted_at: Date,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});
exports.TourBooking = mongoose_1.default.model('TourBooking', tourBookingSchema, 'tour_bookings');
