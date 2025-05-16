import { Router } from 'express'
import { authMiddleware } from '../../../middlewares/auth.middleware'
import { uploadSingle } from '../../../middlewares/upload.middleware'
import upload from '../../../config/multer'

const router: Router = Router()

import * as roomTypeController from '../../../controllers/admin/hotels/roomType.controller'

router.get('/', roomTypeController.getAllRoomTypes)

router.post(
  '/create',
  authMiddleware.isAuthorized,
  upload.array('images', 5),
  uploadSingle,
  roomTypeController.createRoomType,
)

router.get('/detail/:id', roomTypeController.getRoomTypeById)

router.patch(
  '/update/:id',
  authMiddleware.isAuthorized,
  upload.array('images', 5),
  uploadSingle,
  roomTypeController.updateRoomType,
)

router.delete(
  '/delete/:id',
  authMiddleware.isAuthorized,
  roomTypeController.deleteRoomType,
)

export const roomTypeRoute: Router = router
