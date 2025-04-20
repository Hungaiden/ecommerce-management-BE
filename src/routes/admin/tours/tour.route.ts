import { Router } from "express";
import multer from "multer";
const router: Router = Router();

import * as tourController from "../../../controllers/admin/tours/tour.controller";

router.get("/", tourController.getAllTours);

router.post("/create", tourController.createPost);

router.get("/detail/:id", tourController.getTourById);

router.patch("/update/:id", tourController.updateTour);

router.delete("/deleteOne/:id", tourController.deleteOneTour);

export const toursRoute: Router = router;
