import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

subscriberSchema.index({ email: 1 }, { unique: true });

export const Subscriber = mongoose.model(
  "Subscriber",
  subscriberSchema,
  "subscribers",
);
