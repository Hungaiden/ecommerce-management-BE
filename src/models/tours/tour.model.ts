import mongoose from 'mongoose'

const tourSchema = new mongoose.Schema(
  {
    title: String,
    code: {
      type: String,
      required: true,
      unique: true,
    },
    images: [String],
    price: {
      type: Number,
      required: true,
    },
    discount: Number,
    information: String,
    schedule: String,
    time_start: {
      type: Date,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive', 'pending'],
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
    deleted_at: Date,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

// tao slug truoc khi luu
tourSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})


export const Tour = mongoose.model('Tour', tourSchema, 'tours')
