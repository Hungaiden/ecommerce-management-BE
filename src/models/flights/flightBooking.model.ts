import mongoose from 'mongoose'

const flightBookingSchema = new mongoose.Schema(
  {
    flight_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    travel_class: {
      type: String,
      required: true,
      ref: 'TicketClass',
    },
    booking_date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    seat_number: {
      type: String,
      required: true,
    },

    contact_info: {
      name: String,
      phone: String,
      email: String,
    },
    note: String,

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

    payment_method: {
      type: String,
      enum: ['vnpay', 'momo', 'cash', 'paypal', 'credit_card'],
      default: 'vnpay',
    },

    transaction_code: {
      type: String,
    },

    payment_time: {
      type: Date,
    },

    vnp_response_code: {
      type: String,
    },

    payment_url: {
      type: String,
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

export const FlightBooking = mongoose.model(
  'FlightBooking',
  flightBookingSchema,
  'flight_bookings',
)
