import { Router } from 'express'
import upload from '../../../config/multer'
import { authMiddleware } from '../../../middlewares/auth.middleware'
import { uploadSingle, uploadMultiple } from '../../../middlewares/upload.middleware'
const router: Router = Router()

import * as tourController from '../../../controllers/admin/tours/tour.controller'

router.get('/', tourController.getAllTours)

router.post(
  '/create', 
  authMiddleware.isAuthorized,
  upload.array('images', 5), 
  uploadMultiple, 
  tourController.createPost,
)

router.get('/detail/:id', tourController.getTourById)

router.patch(
  '/update/:id',
  authMiddleware.isAuthorized, 
  upload.array('images', 5), 
  uploadMultiple,
  tourController.updateTour)

router.delete(
  '/deleteOne/:id', 
  authMiddleware.isAuthorized,
  tourController.deleteOneTour)

export const toursRoute: Router = router
