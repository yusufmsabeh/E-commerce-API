import {Router} from "express";
import {getAddresses, postAddress} from "../controllers/addresses";
import passport from "passport";

export const router = Router();
router.use(passport.authenticate("jwt",{session:false}));
router.post("/",postAddress);
router.get("/",getAddresses);

