import { TourReview } from '../../../models/tours/tourReview.model'
import { Tour } from '../../../models/tours/tour.model'
import type { CreateReviewDto } from '../../../dto/tours/create.review.dto'

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
        _id: '$tour_id',
        averageRating: { $avg: '$rating' },
      },
    },
  ])

  const averageRating = result.length > 0 ? result[0].averageRating : 0

  // Update tour with new average rating
  await Tour.findByIdAndUpdate(tourId, {
    average_rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
  })
}

export const createReview = async (data: CreateReviewDto) => {
  // 1. Tạo review mới
  const newReview = await TourReview.create(data)

  // 2. Cập nhật điểm đánh giá trung bình
  await calculateAverageRating(data.tour_id)

  return newReview
}

export const updateReview = async (
  id: string,
  data: Partial<CreateReviewDto>,
) => {
  const review = await TourReview.findByIdAndUpdate(id, data, { new: true })
  if (review) {
    await calculateAverageRating(review.tour_id.toString())
  }
  return review
}

export const deleteReview = async (id: string) => {
  const review = await TourReview.findByIdAndUpdate(
    id,
    { deleted: true, deleted_at: new Date() },
    { new: true },
  )
  if (review) {
    await calculateAverageRating(review.tour_id.toString())
  }
  return review
}
