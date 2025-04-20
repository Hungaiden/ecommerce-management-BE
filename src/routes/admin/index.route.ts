import type { Express } from "express";
import { toursRoute } from "./tours/tour.route";
import { hotelsRoute } from "./hotels/hotel.route";

const adminRoutes = (app: Express) => {
  app.use("/tours", toursRoute);

  app.use('/hotels', hotelsRoute);

};

export default adminRoutes;
