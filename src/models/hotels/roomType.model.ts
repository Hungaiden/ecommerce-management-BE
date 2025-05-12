import mongoose from 'mongoose'

const roomTypeSchema = new mongoose.Schema(
  {
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    description: { type: String, required: true },
    room_type: { type: String },
    total_beds: { type: Number, default: 1, required: true },
    bed_options: { type: String },
    sleeps_count: { type: Number },
    smoking_allowed: { type: Boolean },
  },
  {
    timestamps: true,
  },
)

export const RoomType = mongoose.model('RoomType', roomTypeSchema, 'room_types')
