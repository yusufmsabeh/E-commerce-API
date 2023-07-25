import { Router } from "express";
import { getFavourites, postFavourite } from "../controllers/favourites";
import passport from "passport";

export const router = Router();
router.use(passport.authenticate("jwt", { session: false }));
router.post("/:id", postFavourite);
router.get("/", getFavourites);
