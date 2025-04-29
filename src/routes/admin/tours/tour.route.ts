import { Router } from "express";
import multer from "multer";
import upload from '../../../config/multer'
import { uploadSingle, uploadMultiple } from "../../../middlewares/upload.middleware";
const router: Router = Router();

import * as tourController from "../../../controllers/admin/tours/tour.controller";

router.get("/", tourController.getAllTours);

router.post(
  "/create", 
  upload.array('images', 5), 
  uploadMultiple, 
  tourController.createPost
);

router.get("/detail/:id", tourController.getTourById);

router.patch(
  "/update/:id", 
  upload.array('images', 5), 
  uploadMultiple,
  tourController.updateTour);

router.delete("/deleteOne/:id", tourController.deleteOneTour);

export const toursRoute: Router = router;
