import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
const router: Router = Router();

import * as flightBookingController from "../../../controllers/admin/flights/flightBooking.controller";

router.post(
  "/create",
  authMiddleware.isAuthorized,
  flightBookingController.createBooking
);

router.get(
  "/",
  authMiddleware.isAuthorized,
  flightBookingController.getAllBookings
);

router.get(
  "/detail/:id",
  authMiddleware.isAuthorized,
  flightBookingController.getBookingById
);

router.patch(
  "/update/:id",
  authMiddleware.isAuthorized,
  flightBookingController.updateBooking
);

router.delete(
  "/delete/:id",
  authMiddleware.isAuthorized,
  flightBookingController.deleteBooking
);

router.get(
  "/user/:userId",
  authMiddleware.isAuthorized,
  flightBookingController.getBookingsByUserId
);

export const flightBookingRoute: Router = router;
