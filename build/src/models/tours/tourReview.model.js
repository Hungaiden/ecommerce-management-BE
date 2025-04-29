"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourReview = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tourReviewSchema = new mongoose_1.default.Schema({
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
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: String,
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
exports.TourReview = mongoose_1.default.model('TourReview', tourReviewSchema, 'tour_reviews');
