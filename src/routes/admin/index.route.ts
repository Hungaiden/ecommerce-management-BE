import type { Express } from "express";

import { accountsRoute } from "./accounts/account.route";
import { authsRoute } from "./accounts/auth.route";

import { toursRoute } from "./tours/tour.route";
import { toursCategoryRoute } from "./tours/tourCategory.route";
import { tourReviewRoute } from "./tours/tourReview.route";
import { tourBookingRoute } from "./tours/tourBooking.route";

import { hotelsRoute } from "./hotels/hotel.route";
import { hotelBookingRoute } from "./hotels/hotelBooking.route";
import { hotelReviewRoute } from "./hotels/hotelReview.route";
import { roomTypeRoute } from "./hotels/roomType.route";

import { flightRoute } from "./flights/flight.route";
import { ticketClassRoute } from "./flights/ticketClass.route";
import { airportRoute } from "./flights/airport.route";
import { flightBookingRoute } from "./flights/flightBooking.route";
import { flightReviewRoute } from "./flights/flightReview.route";
import { airlineRoute } from "./flights/airline.route";
import { GeminiRoute } from "../client/tours/gemini.route";
import { dashboardRoute } from "./dashboard/dashboard.route";
import { systemSettingsRoute } from "./settings/systemSetting.route";
import uploadRoute from "./upload.route";

import { VNPayRoute } from "../client/payment/vnpay.route";

import { profileRoute } from "./profiles/profile.route";
import { productsRoute } from "./products/product.route";
const adminRoutes = (app: Express) => {
  // route tour
  app.use("/tour-categories", toursCategoryRoute);

  app.use("/tours/reviews", tourReviewRoute);

  app.use("/tours/bookings", tourBookingRoute);

  app.use("/tours", toursRoute);

  // route hotel
  app.use("/hotels/reviews", hotelReviewRoute);

  app.use("/hotels/bookings", hotelBookingRoute);

  app.use("/hotels", hotelsRoute);

  app.use("/room-types", roomTypeRoute);

  // route flight
  app.use("/flights/reviews", flightReviewRoute);

  app.use("/flights/bookings", flightBookingRoute);

  app.use("/flights", flightRoute);

  app.use("/ticket-classes", ticketClassRoute);

  app.use("/flights/airports", airportRoute);

  app.use("/flights/airlines", airlineRoute);

  // route account
  app.use("/accounts", accountsRoute);

  app.use("/auth", authsRoute);

  // route upload
  app.use("/upload", uploadRoute);

  // route gemini
  app.use("/gemini", GeminiRoute);

  // route payment
  app.use("/payment", VNPayRoute);

  // route dashboard
  app.use("/dashboard", dashboardRoute);

  // route system settings
  app.use("/system-settings", systemSettingsRoute);

  // route profile
  app.use("/profile", profileRoute);

  // route product
  app.use("/products", productsRoute);
};

export default adminRoutes;
