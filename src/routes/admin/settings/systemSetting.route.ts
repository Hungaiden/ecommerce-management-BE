import express from "express";
import { Router } from 'express'
import {
  createSystemSetting,
  getSystemSetting,
  updateSystemSetting,
} from "../../../controllers/systemSetting.controller";

const router = express.Router();

router.post("/", createSystemSetting);

router.get("/", getSystemSetting);

router.patch("/", updateSystemSetting);

export const systemSettingsRoute: Router = router
