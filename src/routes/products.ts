import { Router } from "express";
import { getProducts } from "../controllers/products";

export const router = Router();
router.get("/", getProducts);
