"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const roomTypeSchema = new mongoose_1.default.Schema({
    hotel_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    description: { type: String, required: true },
    room_type: { type: String },
    total_beds: { type: Number, default: 1, required: true },
    bed_options: { type: String },
    sleeps_count: { type: Number },
    smoking_allowed: { type: Boolean },
}, {
    timestamps: true,
});
exports.RoomType = mongoose_1.default.model('RoomType', roomTypeSchema, 'room_types');
