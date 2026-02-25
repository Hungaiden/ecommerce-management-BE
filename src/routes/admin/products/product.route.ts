import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router: Router = Router();

import * as productController from "../../../controllers/admin/products/product.controller";

router.get("/", productController.getAllProducts);

router.post(
  "/create",
  authMiddleware.isAuthorized,
  productController.createProduct,
);

router.get("/detail/:id", productController.getProductById);

router.get("/category/:category", productController.getProductsByCategory);

router.patch(
  "/update/:id",
  authMiddleware.isAuthorized,
  productController.updateProduct,
);

router.delete(
  "/deleteOne/:id",
  authMiddleware.isAuthorized,
  productController.deleteOneProduct,
);

export const productsRoute: Router = router;
