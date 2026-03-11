import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import upload from "../../../config/multer";

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

router.post(
  "/import",
  authMiddleware.isAuthorized,
  upload.single("file"),
  productController.importProducts,
);

export const productsRoute: Router = router;
