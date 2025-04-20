import mongoose from 'mongoose'

const hotelReviewSchema = new mongoose.Schema(
  {
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
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
    comment: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

export const HotelReview = mongoose.model('HotelReview', hotelReviewSchema, 'hotel_reviews')
