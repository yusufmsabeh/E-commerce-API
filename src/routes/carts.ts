import { Router } from "express";
import { postCart } from "../controllers/carts";
import passport from "passport";

export const router = Router();
router.use(passport.authenticate("jwt", { session: false }));
router.post("/:id", postCart);
