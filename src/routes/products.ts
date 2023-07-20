import { Router } from "express";
import {
  getProducts,
  getSearchProductsAndBrands,
  getProductById,
} from "../controllers/products";
import {getProductSanitizer} from "../validators/get-products-validator";

export const router = Router();
router.use(getProductSanitizer);
router.get("/", [getSearchProductsAndBrands, getProducts]);
router.get("/:id", getProductById);
