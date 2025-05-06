import { Router } from "express";
import multer from "multer";
import upload from '../../../config/multer'
import { uploadSingle, uploadMultiple } from "../../../middlewares/upload.middleware";
const router: Router = Router();

import * as hotelController from "../../../controllers/admin/hotels/hotel.controller";

router.get("/", hotelController.getAllHotels);

router.post(
  "/create", 
  upload.array('images', 5), 
  uploadMultiple, 
  hotelController.createHotel
);

router.get("/detail/:id", hotelController.getHotelById);

router.patch(
  "/update/:id", 
  upload.array('images', 5), 
  uploadMultiple, 
  hotelController.updateHotel
);

router.delete("/deleteOne/:id", hotelController.deleteHotel);

export const hotelsRoute: Router = router;
