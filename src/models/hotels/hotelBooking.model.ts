import mongoose from "mongoose";

const hotelBookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    room_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomType",
      required: true,
    },
    check_in: {
      type: Number,
      required: true,
    },
    check_out: {
      type: Number,
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
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
      required: true,
    },
    payment_id: {
      type: String,
    },
    deleted: { type: Boolean, default: false },
    deleted_at: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const HotelBooking = mongoose.model(
  "HotelBooking",
  hotelBookingSchema,
  "hotel_bookings"
);
