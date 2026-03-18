import type { Express } from "express";

import { accountsRoute } from "./accounts/account.route";
import { authsRoute } from "./accounts/auth.route";

import { dashboardRoute } from "./dashboard/dashboard.route";
import { systemSettingsRoute } from "./settings/systemSetting.route";
import uploadRoute from "./upload.route";

import { GroqRoute } from "../client/chatbot/groq.route";
import { VNPayRoute } from "../client/payment/vnpay.route";
import { cartRoute } from "../client/cart/cart.route";

import { profileRoute } from "./profiles/profile.route";
import { productsRoute } from "./products/product.route";
import { productCategoryRoute } from "./products/productCategory.route";
import { adminCartRoute } from "./cart/adminCart.route";
import { productBookingRoute } from "./products/productBooking.route";
import { productReviewRoute } from "./products/productReview.route";
import { newsletterRoute } from "./marketing/newsletter.route";
import { subscribeRoute } from "../client/newsletter/subscribe.route";

const adminRoutes = (app: Express) => {
  // route account
  app.use("/accounts", accountsRoute);

  app.use("/auth", authsRoute);

  // route upload
  app.use("/upload", uploadRoute);

  // route groq
  app.use("/groq", GroqRoute);

  // route payment
  app.use("/payment", VNPayRoute);

  // route cart
  app.use("/cart", cartRoute);

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

  // route admin carts
  app.use("/admin-carts", adminCartRoute);

  // route product booking
  app.use("/products/bookings", productBookingRoute);

  // route product review
  app.use("/products/reviews", productReviewRoute);

  // route newsletter (admin)
  app.use("/newsletter", newsletterRoute);

  // route subscribe (public)
  app.use("/subscribe", subscribeRoute);
};

export default adminRoutes;
