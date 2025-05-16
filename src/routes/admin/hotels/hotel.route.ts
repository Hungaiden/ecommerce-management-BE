import { Router } from 'express'
import multer from 'multer'
import upload from '../../../config/multer'
import { authMiddleware } from '../../../middlewares/auth.middleware'
import {
  uploadSingle,
  uploadMultiple,
} from '../../../middlewares/upload.middleware'
const router: Router = Router()

import * as hotelController from '../../../controllers/admin/hotels/hotel.controller'

router.get('/', hotelController.getAllHotels)

router.post(
  '/create',
  authMiddleware.isAuthorized,
  upload.array('images', 5),
  uploadMultiple,
  hotelController.createHotel,
)

router.get('/detail/:id', hotelController.getHotelById)

router.get('/room-types/:hotelId', hotelController.getRoomTypesByHotelId)

router.patch(
  '/update/:id',
  authMiddleware.isAuthorized,
  upload.array('images', 5),
  uploadMultiple,
  hotelController.updateHotel,
)

router.delete(
  '/deleteOne/:id',
  authMiddleware.isAuthorized,
  hotelController.deleteHotel,
)

export const hotelsRoute: Router = router
