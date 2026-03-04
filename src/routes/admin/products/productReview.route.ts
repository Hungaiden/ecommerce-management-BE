import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router: Router = Router();

import * as productReviewController from "../../../controllers/admin/products/productReview.controller";

router.post(
  "/create",
  authMiddleware.isAuthorized,
  productReviewController.createReview,
);

router.patch(
  "/approve/:id",
  authMiddleware.isAuthorized,
  productReviewController.approveReview,
);

router.patch("/update/:id", productReviewController.updateReview);

router.delete("/delete/:id", productReviewController.deleteReview);

router.get("/", productReviewController.getAllReviews);

router.get("/:productId", productReviewController.getReviewsByProductId);

export const productReviewRoute: Router = router;
