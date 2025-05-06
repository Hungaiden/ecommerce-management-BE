import type { Express } from "express";
import { toursRoute } from "./tours/tour.route";
import { hotelsRoute } from "./hotels/hotel.route";
import { accountsRoute } from "./accounts/account.route";

const adminRoutes = (app: Express) => {
  app.use("/tours", toursRoute);
  app.use('/hotels', hotelsRoute);
  app.use('/accounts', accountsRoute);
};

export default adminRoutes;
