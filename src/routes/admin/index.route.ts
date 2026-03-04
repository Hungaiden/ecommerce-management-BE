import type { Express } from "express";

import { accountsRoute } from "./accounts/account.route";
import { authsRoute } from "./accounts/auth.route";

import { toursRoute } from "./tours/tour.route";
import { toursCategoryRoute } from "./tours/tourCategory.route";
import { tourReviewRoute } from "./tours/tourReview.route";
import { tourBookingRoute } from "./tours/tourBooking.route";

import { GeminiRoute } from "../client/tours/gemini.route";
import { dashboardRoute } from "./dashboard/dashboard.route";
import { systemSettingsRoute } from "./settings/systemSetting.route";
import uploadRoute from "./upload.route";

import { VNPayRoute } from "../client/payment/vnpay.route";

import { profileRoute } from "./profiles/profile.route";
import { productsRoute } from "./products/product.route";
import { productCategoryRoute } from "./products/productCategory.route";
import { productBookingRoute } from "./products/productBooking.route";
import { productReviewRoute } from "./products/productReview.route";

const adminRoutes = (app: Express) => {
  // route tour
  app.use("/tour-categories", toursCategoryRoute);

  app.use("/tours/reviews", tourReviewRoute);

  app.use("/tours/bookings", tourBookingRoute);

  app.use("/tours", toursRoute);

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

  // route product category
  app.use("/product-categories", productCategoryRoute);

  // route product booking
  app.use("/products/bookings", productBookingRoute);

  // route product review
  app.use("/products/reviews", productReviewRoute);
};

export default adminRoutes;
