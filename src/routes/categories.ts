import { Router } from "express";
import {getCategories, getCategoryById} from "../controllers/categories";

export const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
