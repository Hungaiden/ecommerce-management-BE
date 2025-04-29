"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const hotelSchema = new mongoose_1.default.Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    parking_included: { type: Boolean },
    deleted: { type: Boolean, default: false },
    query: { type: String },
    street_address: { type: String },
    city: { type: String },
    state_province: { type: String },
    postal_code: { type: String },
    country: { type: String },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Opened', 'Closed'],
        default: 'Opened',
        required: true,
    },
    total_rooms: { type: Number, required: true },
}, {
    timestamps: true,
});
exports.Hotel = mongoose_1.default.model('Hotel', hotelSchema, 'hotels');
