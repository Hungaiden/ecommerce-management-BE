"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotel = exports.updateHotel = exports.getHotelById = exports.getAllHotels = exports.createHotel = void 0;
const hotelService = __importStar(require("../../../services/admin/hotels/hotel.service"));
const createHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = yield hotelService.createHotel(req.body);
        const response = {
            code: 201,
            message: "Tạo khách sạn thành công",
            data: hotel,
        };
        res.status(201).json(response);
    }
    catch (error) {
        const response = {
            code: 400,
            timestamp: new Date().toISOString(),
            path: req.path,
            message: error.message,
            errors: [],
        };
        res.status(400).json(response);
    }
});
exports.createHotel = createHotel;
const getAllHotels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield hotelService.getAllHotels();
        const response = {
            code: 200,
            message: "Lấy danh sách khách sạn thành công",
            data: {
                hits: result,
                pagination: {
                    totalRows: 10,
                    totalPages: 2,
                },
            },
        };
        res.status(200).json(response);
    }
    catch (error) {
        const response = {
            code: 500,
            timestamp: new Date().toISOString(),
            path: req.path,
            message: "Lỗi khi lấy danh sách khách sạn!",
            errors: [],
        };
        res.status(500).json(response);
    }
});
exports.getAllHotels = getAllHotels;
const getHotelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = yield hotelService.getHotelById(req.params.id);
        if (!hotel) {
            const response = {
                code: 404,
                timestamp: new Date().toISOString(),
                path: req.path,
                message: "Không tìm thấy khách sạn",
                errors: [],
            };
            res.status(404).json(response);
        }
        const response = {
            code: 200,
            message: "Lấy thông tin khách sạn thành công",
            data: hotel,
        };
        res.status(200).json(response);
    }
    catch (error) {
        const response = {
            code: 500,
            timestamp: new Date().toISOString(),
            path: req.path,
            message: "Lỗi khi lấy thông tin khách sạn!",
            errors: [],
        };
        res.status(500).json(response);
    }
});
exports.getHotelById = getHotelById;
const updateHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedHotel = yield hotelService.updateHotel(req.params.id, req.body);
        if (!updatedHotel) {
            const response = {
                code: 404,
                timestamp: new Date().toISOString(),
                path: req.path,
                message: "Không tìm thấy khách sạn",
                errors: [],
            };
            res.status(404).json(response);
            return;
        }
        const response = {
            code: 200,
            message: "Cập nhật khách sạn thành công",
            data: updatedHotel,
        };
        res.status(200).json(response);
    }
    catch (error) {
        const response = {
            code: 500,
            timestamp: new Date().toISOString(),
            path: req.path,
            message: "Lỗi khi cập nhật khách sạn!",
            errors: [],
        };
        res.status(500).json(response);
    }
});
exports.updateHotel = updateHotel;
const deleteHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedHotel = yield hotelService.deleteHotel(req.params.id);
        if (!deletedHotel) {
            const response = {
                code: 404,
                timestamp: new Date().toISOString(),
                path: req.path,
                message: "Không tìm thấy khách sạn",
                errors: [],
            };
            res.status(404).json(response);
        }
        const response = {
            code: 200,
            message: "Xóa khách sạn thành công",
            data: deletedHotel,
        };
        res.status(200).json(response);
    }
    catch (error) {
        const response = {
            code: 500,
            timestamp: new Date().toISOString(),
            path: req.path,
            message: "Lỗi khi xóa khách sạn!",
            errors: [],
        };
        res.status(500).json(response);
    }
});
exports.deleteHotel = deleteHotel;
