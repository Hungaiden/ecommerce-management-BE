import mongoose from 'mongoose'

const hotelSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    parking_included: { type: Boolean },
    deleted: { type: Boolean, default: false },
    query: { type: String },
    street_address: { type: String },
    city: { type: String },
    state_province: { type: String },
    postal_code: { type: String },
    country: { type: String },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Opened', 'Closed'],
      default: 'Opened',
      required: true,
    },
    position: Number,
    total_rooms: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

export const Hotel = mongoose.model('Hotel', hotelSchema, 'hotels')
