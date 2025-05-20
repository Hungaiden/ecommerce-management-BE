// models/Flight.ts
import mongoose from 'mongoose'

const flightSchema = new mongoose.Schema(
  {
    flight_number: {
      type: String,
      required: true,
      unique: true,
    },
    airline_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Airline',
    },
    origin_airport_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Airport',
    },
    destination_airport_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Airport',
    },
    departure_datetime: {
      type: Date,
      required: true,
    },
    arrival_datetime: {
      type: Date,
      required: true,
    },
    duration_minutes: {
      type: Number,
      required: true,
    },
    available_seats: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['scheduled', 'in-air', 'landed', 'canceled'],
      default: 'scheduled',
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

// Optional: Tự động cập nhật deleted_at khi deleted = true
flightSchema.pre('save', function (next) {
  if (this.deleted && !this.deleted_at) {
    this.deleted_at = new Date()
  }
  next()
})

export const Flight = mongoose.model('Flight', flightSchema, 'flights')
