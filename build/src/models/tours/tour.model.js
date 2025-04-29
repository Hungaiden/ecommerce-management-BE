"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tour = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tourSchema = new mongoose_1.default.Schema({
    title: String,
    code: {
        type: String,
        required: true,
        unique: true,
    },
    images: String,
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
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});
tourSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});
exports.Tour = mongoose_1.default.model('Tour', tourSchema, 'tours');
