import mongoose from 'mongoose'

const flightReviewSchema = new mongoose.Schema(
  {
    flight_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
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
      trim: true,
      maxLength: [1000, 'Review comment must not exceed 1000 characters'],
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
    deleted_at: Date,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

// Prevent users from reviewing the same flight multiple times
flightReviewSchema.index({ flight_id: 1, user_id: 1 }, { unique: true })

export const FlightReview = mongoose.model(
  'FlightReview',
  flightReviewSchema,
  'flight_reviews',
)
