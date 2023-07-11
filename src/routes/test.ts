import { Router } from "express";
import { getTest } from "../controllers/test";

export const router = Router();

router.get("/", getTest);
