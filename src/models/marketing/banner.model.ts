import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true, trim: true },

    title: { type: String, trim: true, maxlength: 100 },

    subtitle: { type: String, trim: true, maxlength: 200 },

    link: { type: String, trim: true },

    order: { type: Number, required: true, min: 1 },

    isActive: { type: Boolean, default: true },

    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model('Banner', bannerSchema);
