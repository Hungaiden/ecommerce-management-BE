"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleImages = exports.uploadImage = void 0;
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
const uploadImage = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream((error, result) => {
            if (result) {
                resolve(result.secure_url);
            }
            else {
                reject(error);
            }
        });
        streamifier_1.default.createReadStream(fileBuffer).pipe(stream);
    });
};
exports.uploadImage = uploadImage;
const uploadMultipleImages = (fileBuffers) => {
    return Promise.all(fileBuffers.map(fileBuffer => (0, exports.uploadImage)(fileBuffer)));
};
exports.uploadMultipleImages = uploadMultipleImages;
