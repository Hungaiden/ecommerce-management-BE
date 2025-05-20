import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
const router: Router = Router();

import * as flightController from "../../../controllers/admin/flights/flight.controller";

router.post(
  "/create",
  authMiddleware.isAuthorized,
  flightController.createFlight
);

router.get("/", flightController.getAllFlights);

router.get("/detail/:id", flightController.getFlightById);

router.patch(
  "/update/:id",
  authMiddleware.isAuthorized,
  flightController.updateFlight
);

router.delete(
  "/delete/:id",
  authMiddleware.isAuthorized,
  flightController.deleteFlight
);

export const flightRoute: Router = router;
