import { response, Router } from "express";
import { postOrders } from "../controllers/orders";
import passport from "passport";
import { User } from "../models/User";

export const router = Router();
router.use((request, response, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: User, info: any) => {
      if (err) {
        return next(err);
      }
      if (user) {
        request.user = user;
      }
      return next();
    }
  )(request,response,next);
});
router.post("/", postOrders);
