import { Router } from "express";
import { getFavourites, toggleFavourite } from "../controllers/favourites";
import passport from "passport";

export const router = Router();
router.use(passport.authenticate("jwt", { session: false }));
router.post("/:id", toggleFavourite);
router.get("/", getFavourites);
