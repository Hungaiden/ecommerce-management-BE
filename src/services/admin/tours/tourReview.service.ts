import { TourReview } from "../../../models/tours/tourReview.model";
import { Tour } from "../../../models/tours/tour.model";
import type { CreateReviewDto } from "../../../dto/tours/create.review.dto";
import { CreateTourReviewSchema } from "../../../validations/tours/tourSchema.zod";
import * as paramsTypes from "../../../utils/types/paramsTypes";
const calculateAverageRating = async (tourId: string) => {
    const result = await TourReview.aggregate([
        {
            $match: {
                tour_id: tourId,
                deleted: false,
                is_approved: true,
            },
        },
        {
            $group: {
                _id: "$tour_id",
                averageRating: { $avg: "$rating" },
            },
        },
    ]);

    const averageRating = result.length > 0 ? result[0].averageRating : 0;

    // Update tour with new average rating
    await Tour.findByIdAndUpdate(tourId, {
        average_rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
    });
};

export const createReview = async (raw: any) => {
    const parseResult = CreateTourReviewSchema.safeParse(raw);
    if (!parseResult.success) {
        const error = parseResult.error.flatten();
        throw new Error(error.formErrors.join(", ") || "Invalid review data");
    }
    const data = parseResult.data;
    // 1. Tạo review mới
    const newReview = await TourReview.create(data);

    // 2. Cập nhật điểm đánh giá trung bình
    await calculateAverageRating(data.tour_id);

    return newReview;
};

export const updateReview = async (
    id: string,
    data: Partial<CreateReviewDto>
) => {
    const review = await TourReview.findByIdAndUpdate(id, data, { new: true });
    if (review) {
        await calculateAverageRating(review.tour_id.toString());
    }
    return review;
};

export const deleteReview = async (id: string) => {
    const review = await TourReview.findByIdAndUpdate(
        id,
        { deleted: true, deleted_at: new Date() },
        { new: true }
    );
    if (review) {
        await calculateAverageRating(review.tour_id.toString());
    }
    return review;
};

export const getAllReviews = async (
    searchParams?: paramsTypes.SearchParams,
    sortParams?: paramsTypes.SortParams,
    paginateParams?: paramsTypes.PaginateParams
) => {
    try {
        const query: any = { deleted: false };

        if (searchParams?.keyword && searchParams?.field) {
            query[searchParams.field] = {
                $regex: searchParams.keyword,
                $options: "i",
            };
        }

        const offset = paginateParams?.offset || 0;
        const limit = paginateParams?.limit || 10;

        const sortQuery: any = {};
        if (sortParams?.sortBy) {
            sortQuery[sortParams.sortBy] =
                sortParams.sortType === paramsTypes.SORT_TYPE.ASC ? 1 : -1;
        }

        const reviews = await TourReview.find(query)
            .populate({
                path: "tour_id",
                select: "title code",
            })
            .populate({
                path: "user_id",
                select: "fullname email",
            })
            .skip(offset)
            .limit(limit)
            .sort(sortQuery)
            .lean();

        const totalRows = await TourReview.countDocuments(query);
        const totalPages = Math.ceil(totalRows / limit);

        return { reviews, totalRows, totalPages };
    } catch (error) {
        throw new Error("Lỗi khi lấy danh sách đánh giá!");
    }
};

export const getReviewsByTourId = async (
    tourId: string,
    sortParams?: paramsTypes.SortParams,
    paginateParams?: paramsTypes.PaginateParams
) => {
    try {
        const query = { tour_id: tourId, deleted: false };

        const offset = paginateParams?.offset || 0;
        const limit = paginateParams?.limit || 10;

        const sortQuery: any = {};
        if (sortParams?.sortBy) {
            sortQuery[sortParams.sortBy] =
                sortParams.sortType === paramsTypes.SORT_TYPE.ASC ? 1 : -1;
        }

        const reviews = await TourReview.find(query)
            .populate({
                path: "user_id",
                select: "fullname avatar",
            })
            .skip(offset)
            .limit(limit)
            .sort(sortQuery)
            .lean();

        const totalRows = await TourReview.countDocuments(query);
        const totalPages = Math.ceil(totalRows / limit);

        return { reviews, totalRows, totalPages };
    } catch (error) {
        throw new Error("Lỗi khi lấy danh sách đánh giá của tour!");
    }
};
