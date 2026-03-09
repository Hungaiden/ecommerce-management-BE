import express from "express";
import { Router } from "express";
import { recommendProduct } from "../../../controllers/client/products/gemini.controller";

const router: Router = Router();

router.post("/recommend-product", recommendProduct);

export const GeminiRoute: Router = router;
