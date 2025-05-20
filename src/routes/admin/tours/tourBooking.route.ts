import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router: Router = Router();

import * as tourBookingController from "../../../controllers/admin/tours/tourBooking.controller";

router.post("/create", tourBookingController.createTourBooking);

router.get("/getAll", tourBookingController.getAllTourBookings);

router.get("/detail/:bookingId", tourBookingController.getTourBookingById);

router.get("/tour/:tourId", tourBookingController.getBookingsByTourId);
router.get("/user/:userId", tourBookingController.getBookingsByUserId);

export const tourBookingRoute: Router = router;
