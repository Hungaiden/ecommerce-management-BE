import mongoose from 'mongoose'

const roomTypeSchema = new mongoose.Schema(
  {
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    description: { type: String, required: true },
    title: { type: String },
    total_beds: { type: Number, default: 1, required: true },
    // bed_options: { type: String },
    sleeps_count: { type: Number }, // tổng số người ở
    price_per_night: { type: Number, required: true }, // giá theo đêm 
    amenities: [{ type: String }], // ví dụ: ['WiFi', 'TV', 'Minibar'],
    images: [{ type: String }], 
    available_rooms: { type: Number, required: true, default: 1 }, 
    total_rooms: { type: Number, required: true }, 
    deleted: { type: Boolean, default: false }, 
    position: { type: Number }, // vị trí của loại phòng trong danh sách
  },
  {
    timestamps: true,
  },
)

export const RoomType = mongoose.model('RoomType', roomTypeSchema, 'room_types')
