import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router: Router = Router();

import * as productBookingController from "../../../controllers/admin/products/productBooking.controller";

router.post("/create", productBookingController.createProductBooking);

router.get(
  "/getAll",
  authMiddleware.isAuthorized,
  productBookingController.getAllProductBookings,
);

router.get(
  "/detail/:bookingId",
  productBookingController.getProductBookingById,
);

router.get(
  "/user/:userId",
  productBookingController.getProductBookingsByUserId,
);

router.patch(
  "/update/:bookingId",
  authMiddleware.isAuthorized,
  productBookingController.updateProductBooking,
);

router.delete(
  "/delete/:bookingId",
  authMiddleware.isAuthorized,
  productBookingController.deleteProductBooking,
);

export const productBookingRoute: Router = router;
