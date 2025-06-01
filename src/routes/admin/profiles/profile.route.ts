import express from "express";
import { Router } from "express";
import { getBooking, getProfile } from "../../../controllers/admin/profiles/profile.controller";
import { authMiddleware } from '../../../middlewares/auth.middleware'
const router = express.Router();

router.get("/", authMiddleware.isAuthorized, getProfile);

router.get('/booking', authMiddleware.isAuthorized, getBooking);
export const profileRoute: Router = router;
