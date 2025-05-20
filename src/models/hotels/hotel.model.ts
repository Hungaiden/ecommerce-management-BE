import mongoose from 'mongoose'

const hotelSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [String],
    parking_included: { type: Boolean },
    deleted: { type: Boolean, default: false },
    street_address: { type: String },
    city: { type: String },
    state_province: { type: String },
    country: { type: String },
    // lat: { type: Number, required: true }, // vi do
    // lon: { type: Number, required: true }, // kinh do
    status: {
      type: String,
      enum: ['Opened', 'Closed'],
      default: 'Opened',
      required: true,
    },
    position: Number,
    total_rooms: { type: Number, required: true },
    phone: { type: String },
    email: { type: String },
    check_in_time: {
      type: Number,
      default: () => new Date('1970-01-01T14:00:00Z').getTime(),
    },
    check_out_time: {
      type: Number,
      default: () => new Date('1970-01-01T12:00:00Z').getTime(),
    },

    average_rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export const Hotel = mongoose.model('Hotel', hotelSchema, 'hotels')
