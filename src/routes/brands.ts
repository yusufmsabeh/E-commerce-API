import { Router } from "express";
import {getBrandById, getBrands} from "../controllers/brands";

export const router = Router();
router.get("/", getBrands);
router.get("/:id", getBrandById);
