import { FlightReview } from "../../../models/flights/flightReview.model";
import { Flight } from "../../../models/flights/flight.model";
import type { CreateFlightReviewDto } from "../../../dto/flights/create.flightReview.dto";
import * as paramsTypes from "../../../utils/types/paramsTypes";

const calculateAverageRating = async (flightId: string) => {
  const result = await FlightReview.aggregate([
    {
      $match: {
        flight_id: flightId,
        deleted: false,
        is_approved: true,
      },
    },
    {
      $group: {
        _id: "$flight_id",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  const averageRating = result.length > 0 ? result[0].averageRating : 0;

  // Update flight with new average rating
  await Flight.findByIdAndUpdate(flightId, {
    average_rating: Math.round(averageRating * 10) / 10,
  });
};

export const createReview = async (data: CreateFlightReviewDto) => {
  const newReview = await FlightReview.create(data);
  await calculateAverageRating(data.flight_id);
  return newReview;
};

export const updateReview = async (
  id: string,
  data: Partial<CreateFlightReviewDto>
) => {
  const review = await FlightReview.findByIdAndUpdate(id, data, { new: true });
  if (review) {
    await calculateAverageRating(review.flight_id.toString());
  }
  return review;
};

export const deleteReview = async (id: string) => {
  const review = await FlightReview.findByIdAndUpdate(
    id,
    { deleted: true, deleted_at: new Date() },
    { new: true }
  );
  if (review) {
    await calculateAverageRating(review.flight_id.toString());
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

    const reviews = await FlightReview.find(query)
      .populate({
        path: "flight_id",
        select: "flight_number departure_time arrival_time",
      })
      .populate({
        path: "user_id",
        select: "fullname email",
      })
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean();

    const totalRows = await FlightReview.countDocuments(query);
    const totalPages = Math.ceil(totalRows / limit);

    return { reviews, totalRows, totalPages };
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách đánh giá!");
  }
};

export const getReviewsByFlightId = async (
  flightId: string,
  sortParams?: paramsTypes.SortParams,
  paginateParams?: paramsTypes.PaginateParams
) => {
  try {
    const query = { flight_id: flightId, deleted: false, is_approved: true };

    const offset = paginateParams?.offset || 0;
    const limit = paginateParams?.limit || 10;

    const sortQuery: any = {};
    if (sortParams?.sortBy) {
      sortQuery[sortParams.sortBy] =
        sortParams.sortType === paramsTypes.SORT_TYPE.ASC ? 1 : -1;
    }

    const reviews = await FlightReview.find(query)
      .populate({
        path: "user_id",
        select: "fullname avatar",
      })
      .skip(offset)
      .limit(limit)
      .sort(sortQuery)
      .lean();

    const totalRows = await FlightReview.countDocuments(query);
    const totalPages = Math.ceil(totalRows / limit);

    return { reviews, totalRows, totalPages };
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách đánh giá của chuyến bay!");
  }
};
