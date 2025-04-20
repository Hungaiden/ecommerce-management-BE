"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tour_route_1 = require("./tours/tour.route");
const hotel_route_1 = require("./hotels/hotel.route");
const adminRoutes = (app) => {
    app.use("/tours", tour_route_1.toursRoute);
    app.use('/hotels', hotel_route_1.hotelsRoute);
};
exports.default = adminRoutes;
