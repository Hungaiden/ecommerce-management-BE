import mongoose from 'mongoose'

const tourBookingSchema = new mongoose.Schema(
  {
    tour_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    booking_date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    start_date: {
      type: Date,
      required: true,
    },
    number_of_people: {
      type: Number,
      required: true,
      default: 1,
    },
    contact_info: {
      name: String,
      phone: String,
      email: String,
    },
    note: String,

    // Trạng thái xử lý booking
    status: {
      type: String,
      required: true,
      enum: ['pending', 'cancelled', 'completed'],
      default: 'pending',
    },

    total_price: {
      type: Number,
      required: true,
    },

    // Trạng thái thanh toán (bắt buộc nếu có cổng thanh toán)
    payment_status: {
      type: String,
      required: true,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },

    // Thêm phương thức thanh toán
    payment_method: {
      type: String,
      enum: ['vnpay', 'momo', 'cash'],
      default: 'vnpay',
    }, // => Cho biết khách chọn thanh toán qua đâu

    // Mã giao dịch từ cổng thanh toán (ví dụ từ VNPAY: vnp_TxnRef)
    transaction_code: {
      type: String,
    },

    // Thời điểm thanh toán thành công (ghi log)
    payment_time: {
      type: Date,
    },

    //  Mã phản hồi từ cổng thanh toán (VNPAY: "00" = thành công)
    vnp_response_code: {
      type: String,
    },

    // (Optional) lưu lại link thanh toán redirect (dùng cho debug hoặc redirect lại client)
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

export const TourBooking = mongoose.model(
  'TourBooking',
  tourBookingSchema,
  'tour_bookings',
)
