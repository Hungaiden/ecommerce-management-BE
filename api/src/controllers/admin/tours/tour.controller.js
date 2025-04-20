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
exports.deleteOneTour = exports.updateTour = exports.getTourById = exports.getAllTours = exports.createPost = void 0;
const tourService = __importStar(require("../../../services/admin/tours/tour.service"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tour = yield tourService.createTour(req.body);
        const response = {
            code: 201,
            message: "Tạo tour thành công",
            data: tour,
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
exports.createPost = createPost;
const getAllTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            status: req.query.status,
            minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
            maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        };
        const searchParams = {
            keyword: req.query.keyword,
            field: req.query.field,
        };
        const sortParams = {
            sortBy: req.query.sortBy,
            sortType: req.query.sortType,
        };
        const paginateParams = {
            offset: req.query.offset ? parseInt(req.query.offset) : 0,
            limit: req.query.limit ? parseInt(req.query.limit) : 10,
        };
        const result = yield tourService.getAllTours(filter, searchParams, sortParams, paginateParams);
        if (result.tours.length === 0) {
            const response = {
                code: 200,
                message: "Không tìm thấy tour nào phù hợp",
                data: {
                    hits: [],
                    pagination: {
                        totalRows: 0,
                        totalPages: 0,
                    },
                },
            };
            res.status(200).json(response);
            return;
        }
        const response = {
            code: 200,
            message: "Lấy danh sách tour thành công",
            data: {
                hits: result.tours,
                pagination: {
                    totalRows: result.totalRows,
                    totalPages: result.totalPages,
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
            message: "Lỗi khi lấy danh sách tour!",
            errors: [],
        };
        res.status(500).json(response);
    }
});
exports.getAllTours = getAllTours;
const getTourById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tour = yield tourService.getTourByIdService(req.params.id);
        if (!tour) {
            const response = {
                code: 404,
                timestamp: new Date().toISOString(),
                path: req.path,
                message: "Không tìm thấy tour",
                errors: [],
            };
            res.status(404).json(response);
        }
        const response = {
            code: 200,
            message: "Lấy thông tin tour thành công",
            data: tour,
        };
        res.status(200).json(response);
    }
    catch (error) {
        const response = {
            code: 500,
            timestamp: new Date().toISOString(),
            path: req.path,
            message: "Lỗi khi lấy thông tin tour!",
            errors: [],
        };
        res.status(500).json(response);
    }
});
exports.getTourById = getTourById;
const updateTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTour = yield tourService.updateTour(req.params.id, req.body);
        if (!updatedTour) {
            const response = {
                code: 404,
                timestamp: new Date().toISOString(),
                path: req.path,
                message: "Không tìm thấy tour",
                errors: [],
            };
            res.status(404).json(response);
        }
        const response = {
            code: 200,
            message: "Cập nhật tour thành công",
            data: updatedTour,
        };
        res.status(200).json(response);
    }
    catch (error) {
        const response = {
            code: 500,
            timestamp: new Date().toISOString(),
            path: req.path,
            message: "Lỗi khi cập nhật tour!",
            errors: [],
        };
        res.status(500).json(response);
    }
});
exports.updateTour = updateTour;
const deleteOneTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTour = yield tourService.deleteOneTour(req.params.id);
        if (!deletedTour) {
            const response = {
                code: 404,
                timestamp: new Date().toISOString(),
                path: req.path,
                message: "Không tìm thấy tour",
                errors: [],
            };
            res.status(404).json(response);
        }
        const response = {
            code: 200,
            message: "Xóa tour thành công",
            data: deletedTour,
        };
        res.status(200).json(response);
    }
    catch (error) {
        const response = {
            code: 500,
            timestamp: new Date().toISOString(),
            path: req.path,
            message: "Lỗi khi xóa tour!",
            errors: [],
        };
        res.status(500).json(response);
    }
});
exports.deleteOneTour = deleteOneTour;
