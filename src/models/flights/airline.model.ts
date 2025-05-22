import mongoose from 'mongoose'

const airlineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    iata_code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    logo: {
      type: String, // URL to airline logo image
    },
    country: {
      type: String,
      required: true,
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

export const Airline = mongoose.model('Airline', airlineSchema, 'airlines')
