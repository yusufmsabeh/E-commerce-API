import { Router } from "express";
import {
  deleteCart,
  getCart,
  postCart,
  updateCart,
} from "../controllers/carts";
import passport from "passport";

export const router = Router();
router.use(passport.authenticate("jwt", { session: false }));
router.post("/:id", postCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);
router.get("/", getCart);
