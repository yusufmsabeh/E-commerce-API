import { Router } from "express";
import { getBrands } from "../controllers/brands";

export const router = Router();
router.get("/", getBrands);
