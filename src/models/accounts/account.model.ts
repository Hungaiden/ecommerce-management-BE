import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    phone: { type: String },
    avatar: { type: String },
    role_id: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['Active', 'Inactive', 'Suspended'], 
      default: 'Active', 
      required: true 
    },
    deleted: { 
      type: Boolean, 
      default: false 
    },
    deletedAt: { type: Date }
  },
  {
    timestamps: true
  }
);

export const Account = mongoose.model('Account', accountSchema, 'accounts');
