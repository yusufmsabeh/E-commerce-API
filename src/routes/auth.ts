import { Router } from "express";
import { signup } from "../controllers/auth";

export const router = Router();
router.post("/signup", signup);
