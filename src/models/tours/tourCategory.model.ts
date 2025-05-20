import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: String,
    description: String,
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    position: Number,
    slug: {
      type: String,
      unique: true,
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

// Thêm slug từ title trước khi lưu
categorySchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

export const TourCategory = mongoose.model(
  'TourCategory',
  categorySchema,
  'tour_categories',
)
