"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelReview = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const hotelReviewSchema = new mongoose_1.default.Schema({
    hotel_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});
exports.HotelReview = mongoose_1.default.model('HotelReview', hotelReviewSchema, 'hotel_reviews');
