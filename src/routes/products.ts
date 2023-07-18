import { Router } from "express";
import {
  getProducts,
  getSearchProductsAndBrands,
  getProductById,
} from "../controllers/products";

export const router = Router();
router.get("/", [getSearchProductsAndBrands, getProducts]);
router.get("/:id", getProductById);
