import { response, Router } from "express";
import {getOrderById, getOrders, postOrders, postOrderWithoutUser} from "../controllers/orders";
import passport from "passport";
import { User } from "../models/User";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";

export const router = Router();
router.post("/",authorizationMiddleware, postOrders,postOrderWithoutUser);
router.use(passport.authenticate("jwt", { session: false }));
router.get("/", getOrders);
router.get("/:id",getOrderById);
