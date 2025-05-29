import { Router } from 'express'
import upload from '../../../config/multer'
import { authMiddleware } from '../../../middlewares/auth.middleware'
import { uploadSingle, uploadMultiple } from '../../../middlewares/upload.middleware'
const router: Router = Router()

import * as tourCategoryController from '../../../controllers/admin/tours/tourCategory.controller'

router.get('/', tourCategoryController.getAllCategories)

router.post(
  '/create',
  authMiddleware.isAuthorized,
  tourCategoryController.createCategory,
)

router.get('/detail/:id', tourCategoryController.getCategoryById)

router.patch(
  '/update/:id',
  authMiddleware.isAuthorized,
  upload.array('images', 5),
  uploadSingle,
  tourCategoryController.updateCategory,
)

router.delete(
  '/delete/:id',
  authMiddleware.isAuthorized,
  tourCategoryController.deleteCategory,
)

export const toursCategoryRoute: Router = router
