"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourCategory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
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
    deleted_at: Date,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});
categorySchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});
exports.TourCategory = mongoose_1.default.model('TourCategory', categorySchema, 'tour_categories');
