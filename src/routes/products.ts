import { Router } from "express";
import {
  getCategoryProducts,
  getHandPicked,
  getNewArrivals,
  getProductById,
  getProducts,
  getSearchProductsAndBrands,
} from "../controllers/products";

export const router = Router();
router.get(
  "/",
  getCategoryProducts,
  getSearchProductsAndBrands,
  getNewArrivals,
  getHandPicked,
  getProducts
);
router.get("/:id", getProductById);
