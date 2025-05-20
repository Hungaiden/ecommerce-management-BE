import { Router } from 'express'
import upload from '../../../config/multer'
import { authMiddleware } from '../../../middlewares/auth.middleware'
import { uploadMultiple } from '../../../middlewares/upload.middleware'
const router: Router = Router()

import * as hotelReviewController from '../../../controllers/admin/hotels/hotelReview.controller'

router.post(
  '/create',
  upload.array('images', 5),
  uploadMultiple,
  hotelReviewController.createReview,
)

router.patch(
  '/approve/:id',
  hotelReviewController.approveReview,
)

router.patch(
  '/update/:id',
  hotelReviewController.updateReview,
)

router.delete(
  '/delete/:id',
  hotelReviewController.deleteReview,
)

router.get(
  '/',
  hotelReviewController.getAllReviews,
)

router.get('/hotel/:hotelId', hotelReviewController.getReviewsByHotelId)

export const hotelReviewRoute: Router = router
