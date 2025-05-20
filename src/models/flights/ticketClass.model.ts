// models/FlightPrice.js
import mongoose from "mongoose";

const flightPriceSchema = new mongoose.Schema(
  {
    flight_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    class: {
      type: String,
      required: true,
      enum: ["economy", "premium_economy", "business", "first"],
    },
    base_price: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    service_fee: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    services: {
      type: [String], // e.g., ['meal', 'wifi', 'extra baggage']
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
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

export const FlightPrice = mongoose.model(
  "TicketClass",
  flightPriceSchema,
  "flight_ticket_classes"
);
