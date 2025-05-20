import { Router } from 'express'
import upload from '../../../config/multer'
import { authMiddleware } from '../../../middlewares/auth.middleware'
import {
  uploadSingle,
  uploadMultiple,
} from '../../../middlewares/upload.middleware'
const router: Router = Router()

import * as tourReviewController from '../../../controllers/admin/tours/tourReview.controller'

router.post(
  '/create',
  upload.array('images', 5),
  uploadMultiple,
  tourReviewController.createReview,
)

router.patch(
  '/approve/:id',
  // authMiddleware.isAuthorized,
  tourReviewController.approveReview,
)

router.patch(
  '/update/:id',
  tourReviewController.updateReview,
)

router.delete(
  '/delete/:id',
  tourReviewController.deleteReview,
)

router.get(
  '/',
  tourReviewController.getAllReviews,
)

router.get(
  '/:tourId',
  tourReviewController.getReviewsByTourId,
)

export const tourReviewRoute: Router = router
