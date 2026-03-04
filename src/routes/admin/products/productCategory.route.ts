import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router: Router = Router();

import * as productCategoryController from "../../../controllers/admin/products/productCategory.controller";

router.get("/", productCategoryController.getAllCategories);

router.post(
  "/create",
  authMiddleware.isAuthorized,
  productCategoryController.createCategory,
);

router.get("/detail/:id", productCategoryController.getCategoryById);

router.patch(
  "/update/:id",
  authMiddleware.isAuthorized,
  productCategoryController.updateCategory,
);

router.delete(
  "/delete/:id",
  authMiddleware.isAuthorized,
  productCategoryController.deleteCategory,
);

export const productCategoryRoute: Router = router;
