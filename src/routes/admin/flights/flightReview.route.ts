import { Router } from "express";
import upload from "../../../config/multer";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import {
  uploadSingle,
  uploadMultiple,
} from "../../../middlewares/upload.middleware";
const router: Router = Router();

import * as flightReviewController from "../../../controllers/admin/flights/flightReview.controller";

router.post(
  "/create",
  upload.array("images", 5),
  uploadMultiple,
  flightReviewController.createReview
);

router.patch(
  "/approve/:id",
  authMiddleware.isAuthorized,
  flightReviewController.approveReview
);

router.patch("/update/:id", flightReviewController.updateReview);

router.delete("/delete/:id", flightReviewController.deleteReview);

router.get("/", flightReviewController.getAllReviews);

router.get("/:flightId", flightReviewController.getReviewsByFlightId);

export const flightReviewRoute: Router = router;
