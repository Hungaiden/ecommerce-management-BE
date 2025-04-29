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
exports.deleteOneTour = exports.updateTour = exports.getTourByIdService = exports.getAllTours = exports.createTour = void 0;
const tour_model_1 = require("../../../models/tours/tour.model");
const paramsTypes = __importStar(require("../../../utils/types/paramsTypes"));
const createTour = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTour = yield tour_model_1.Tour.findOne({ code: data.code });
    if (existingTour) {
        throw new Error("Tour code đã tồn tại!");
    }
    const newTour = new tour_model_1.Tour(data);
    yield newTour.save();
    return newTour;
});
exports.createTour = createTour;
const getAllTours = (filter, searchParams, sortParams, paginateParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = { deleted: false };
        if (filter.status)
            query.status = filter.status;
        if (filter.minPrice)
            query.price = { $gte: filter.minPrice };
        if (filter.maxPrice)
            query.price = { $lte: filter.maxPrice };
        if ((searchParams === null || searchParams === void 0 ? void 0 : searchParams.keyword) && (searchParams === null || searchParams === void 0 ? void 0 : searchParams.field)) {
            query[searchParams.field] = {
                $regex: searchParams.keyword,
                $options: "i",
            };
        }
        const offset = (paginateParams === null || paginateParams === void 0 ? void 0 : paginateParams.offset) || 0;
        const limit = (paginateParams === null || paginateParams === void 0 ? void 0 : paginateParams.limit) || 10;
        const sortQuery = {};
        if (sortParams === null || sortParams === void 0 ? void 0 : sortParams.sortBy) {
            sortQuery[sortParams.sortBy] =
                sortParams.sortType === paramsTypes.SORT_TYPE.ASC ? 1 : -1;
        }
        const tours = yield tour_model_1.Tour.find(query)
            .skip(offset)
            .limit(limit)
            .sort(sortQuery)
            .lean();
        const totalRows = yield tour_model_1.Tour.countDocuments(query);
        const totalPages = Math.ceil(totalRows / limit);
        return { tours, totalRows, totalPages };
    }
    catch (error) {
        throw new Error("Lỗi khi lấy danh sách tour!");
    }
});
exports.getAllTours = getAllTours;
const getTourByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tour = yield tour_model_1.Tour.findOne({
            _id: id,
            deleted: false,
        });
        return tour;
    }
    catch (error) {
        throw new Error("Lỗi khi lấy thông tin tour!");
    }
});
exports.getTourByIdService = getTourByIdService;
const updateTour = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTour = yield tour_model_1.Tour.findOneAndUpdate({ _id: id, deleted: false }, data, { new: true });
        return updatedTour;
    }
    catch (error) {
        throw new Error("Lỗi khi cập nhật tour!");
    }
});
exports.updateTour = updateTour;
const deleteOneTour = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTour = yield tour_model_1.Tour.findOneAndUpdate({ _id: id, deleted: false }, { deleted: true, deleted_at: new Date() }, { new: true });
        return deletedTour;
    }
    catch (error) {
        throw new Error("Lỗi khi xóa tour!");
    }
});
exports.deleteOneTour = deleteOneTour;
