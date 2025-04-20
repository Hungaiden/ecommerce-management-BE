import { Router } from "express";
import multer from "multer";
const router: Router = Router();

import * as hotelController from "../../../controllers/admin/hotels/hotel.controller";

router.get("/", hotelController.getAllHotels);

router.post("/create", hotelController.createHotel);

router.get("/detail/:id", hotelController.getHotelById);

router.patch("/update/:id", hotelController.updateHotel);

router.delete("/delete/:id", hotelController.deleteHotel);

export const hotelsRoute: Router = router;
