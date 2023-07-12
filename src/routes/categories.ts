import { Router } from "express";
import { getCategories } from "../controllers/categories";

export const router = Router();

router.get("/", getCategories);
