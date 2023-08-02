import {Router} from "express";
import {getAddresses, postAddress} from "../controllers/addresses";
import passport from "passport";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";

export const router = Router();
router.post("/",authorizationMiddleware, postAddress);
router.use(passport.authenticate("jwt",{session:false}));
router.get("/",getAddresses);

