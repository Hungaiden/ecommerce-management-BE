import { Router } from 'express'
import upload from '../../../config/multer'
import { authMiddleware } from '../../../middlewares/auth.middleware'
import { uploadSingle, uploadMultiple } from '../../../middlewares/upload.middleware'
const router: Router = Router()

import * as tourReviewController from '../../../controllers/admin/tours/tourReview.controller'

router.post(
  '/create',
  authMiddleware.isAuthorized,
  upload.array('images', 5),
  uploadMultiple, 
  tourReviewController.createReview,
)

router.patch(
  '/approve/:id',
  authMiddleware.isAuthorized,
  tourReviewController.approveReview,
)

router.patch(
  '/update/:id',
  authMiddleware.isAuthorized,
  tourReviewController.updateReview,
)

router.delete(
  '/delete/:id',
  authMiddleware.isAuthorized,
  tourReviewController.deleteReview,
)

export const tourReviewRoute: Router = router
