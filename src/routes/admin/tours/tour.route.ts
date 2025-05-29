import { Router } from 'express'
import upload from '../../../config/multer'
import { authMiddleware } from '../../../middlewares/auth.middleware'

const router: Router = Router()

import * as tourController from '../../../controllers/admin/tours/tour.controller'

router.get('/', tourController.getAllTours)

router.post(
  '/create',
  authMiddleware.isAuthorized,
  tourController.createPost,
)

router.get('/detail/:id', tourController.getTourById)

router.get('/category/:categoryId', tourController.getToursByCategory)

router.patch(
  '/update/:id',
  authMiddleware.isAuthorized,
  tourController.updateTour,
)

router.delete(
  '/deleteOne/:id',
  authMiddleware.isAuthorized,
  tourController.deleteOneTour,
)


export const toursRoute: Router = router
