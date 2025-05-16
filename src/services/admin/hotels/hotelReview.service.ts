import { HotelReview } from "../../../models/hotels/hotelReview.model";
import { Hotel } from "../../../models/hotels/hotel.model";
import type { CreateHotelReviewDto } from "../../../dto/hotels/create.hotelReview.dto";
import * as paramsTypes from "../../../utils/types/paramsTypes";

const calculateAverageRating = async (hotelId: string) => {
  const result = await HotelReview.aggregate([
    {
      $match: {
        hotel_id: hotelId,
        deleted: false,
        is_approved: true,
      },
    },
    {
      $group: {
        _id: "$hotel_id",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  const averageRating = result.length > 0 ? result[0].averageRating : 0;

  // Update hotel with new average rating
  await Hotel.findByIdAndUpdate(hotelId, {
    average_rating: Math.round(averageRating * 10) / 10,
  });
};

export const createReview = async (data: CreateHotelReviewDto) => {
  const newReview = await HotelReview.create(data);
  await calculateAverageRating(data.hotel_id);
  return newReview;
};

export const updateReview = async (
  id: string,
  data: Partial<CreateHotelReviewDto>
) => {
  const review = await HotelReview.findByIdAndUpdate(id, data, { new: true });
  if (review) {
    await calculateAverageRating(review.hotel_id.toString());
  }
  return review;
};

export const deleteReview = async (id: string) => {
  const review = await HotelReview.findByIdAndUpdate(
    id,
    { deleted: true, deleted_at: new Date() },
    { new: true }
  );
  if (review) {
    await calculateAverageRating(review.hotel_id.toString());
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

    const reviews = await HotelReview.find(query)
      .populate({
        path: "hotel_id",
        select: "name slug",
      })
      .populate({
        path: "user_id",
        select: "fullname email",
      })
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean();

    const totalRows = await HotelReview.countDocuments(query);
    const totalPages = Math.ceil(totalRows / limit);

    return { reviews, totalRows, totalPages };
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách đánh giá!");
  }
};

export const getReviewsByHotelId = async (
  hotelId: string,
  sortParams?: paramsTypes.SortParams,
  paginateParams?: paramsTypes.PaginateParams
) => {
  try {
    const query = { hotel_id: hotelId, deleted: false, is_approved: true };

    const offset = paginateParams?.offset || 0;
    const limit = paginateParams?.limit || 10;

    const sortQuery: any = {};
    if (sortParams?.sortBy) {
      sortQuery[sortParams.sortBy] =
        sortParams.sortType === paramsTypes.SORT_TYPE.ASC ? 1 : -1;
    }

    const reviews = await HotelReview.find(query)
      .populate({
        path: "user_id",
        select: "fullname avatar",
      })
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean();

    const totalRows = await HotelReview.countDocuments(query);
    const totalPages = Math.ceil(totalRows / limit);

    return { reviews, totalRows, totalPages };
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách đánh giá của khách sạn!");
  }
};
