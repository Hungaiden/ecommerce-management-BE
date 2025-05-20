// models/Airport.ts
import mongoose from 'mongoose'

const airportSchema = new mongoose.Schema(
  {
    _id: {
      type: String, 
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

export const Airport = mongoose.model('Airport', airportSchema, 'airports')
