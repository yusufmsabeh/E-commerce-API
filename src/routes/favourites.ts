import { Router } from "express";
import { getFavourites } from "../controllers/favourites";
import passport from "passport";

export const router = Router();
router.use(passport.authenticate("jwt", { session: false }));
router.get("/", getFavourites);

