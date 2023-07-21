import { Router } from "express";
import { getPrivateRoute, getTest } from "../controllers/test";
import passport from "passport";

export const router = Router();

router.get("/", getTest);
router.get("/reqbin-verify.txt",(req,res,next)=>{
  res.status(200).send("");
});
router.use(passport.authenticate("jwt", { session: false }));
router.get("/private", getPrivateRoute);
