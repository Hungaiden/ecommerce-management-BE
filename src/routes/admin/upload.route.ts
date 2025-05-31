import { Router } from 'express'
import upload from '../../config/multer'
import { authMiddleware } from '../../middlewares/auth.middleware'
const router: Router = Router()

import * as uploadController from '../../controllers/admin/upload.controller'

// Upload single file
router.post(
  '/single',
  // authMiddleware.isAuthorized,
  upload.single('image'),
  uploadController.uploadSingle,
)

// Upload multiple files
router.post(
  '/multiple',
  // authMiddleware.isAuthorized,
  upload.array('images', 5), // Giới hạn 5 file
  uploadController.uploadMultiple,
)

export default router
