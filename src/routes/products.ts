import { Router } from "express";
import {
  getProducts,
  getSearchProductsAndBrands,
} from "../controllers/products";

export const router = Router();
router.get("/", [getSearchProductsAndBrands, getProducts]);

