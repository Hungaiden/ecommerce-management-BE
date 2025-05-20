import mongoose from 'mongoose'

const tourReviewSchema = new mongoose.Schema(
  {
    tour_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
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
      trim: true, // Loại bỏ khoảng trắng thừa
      maxLength: [1000, 'Nội dung đánh giá không được vượt quá 1000 ký tự'],
    },
    images: [String],
    is_approved: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)
// Thêm unique constraint để ngăn người dùng review nhiều lần:
tourReviewSchema.index({ tour_id: 1, user_id: 1 }, { unique: true })
export const TourReview = mongoose.model(
  'TourReview',
  tourReviewSchema,
  'tour_reviews',
)
