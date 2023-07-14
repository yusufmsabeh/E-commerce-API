import { Router } from "express";
import {
  getCategoryProducts,
  getHandPicked,
  getNewArrivals,
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
