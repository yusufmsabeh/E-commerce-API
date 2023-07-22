import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../models/User";
import { Order } from "../models/Order";
import { Cart } from "../models/Cart";
import { GeneralError } from "../errors/general-error";
import {postOrdersValidator} from "../validators/post-orders-validator";

export const postOrders: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    postOrdersValidator(request.body);
    const { transactionId, cartId, email } = request.body;
    const user = request.user as User;
    let order;
    const cart = await Cart.findOne({ where: { id: cartId, status: 0 } });
    if (!cart) return next(new GeneralError("Cart does not exist", 404));
    cart.status = 1;
    await cart.save();
    if (user) {

      order= await user.$create("order", {
        email: user.email,
        status: 0,
        cart_id: cartId,
        transaction_id: transactionId,
      });
    } else {
      order = await Order.create({
        email: email,
        status: 0,
        user_id: null,
        cart_id: cartId,
        transaction_id: transactionId,
      });
    }
    response.status(201).json({
      error: false,
      status: 201,
      data: {
        message: "Order created successfully",
        order: order,
      },
    });
  } catch (e) {
    next(e);
  }
};
