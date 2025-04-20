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
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

export const TourReview = mongoose.model('TourReview', tourReviewSchema, 'tour_reviews')