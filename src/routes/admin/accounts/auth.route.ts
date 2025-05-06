import { Router } from "express";

const router: Router = Router();

import * as authController from "../../../controllers/admin/accounts/auth.controller";

router.post("/login", authController.login);

router.post('/logout', authController.logout)


