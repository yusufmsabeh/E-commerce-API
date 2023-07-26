import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../models/User";
import { Order } from "../models/Order";
import { GeneralError } from "../errors/general-error";
import { postOrdersValidator } from "../validators/post-orders-validator";
import * as cartServices from"../services/cart";
import * as orderServices from"../services/order";
import {CART_STATUS,ORDER_STATUS} from "../enums/status-enums";

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
    const cart = await cartServices.getActiveCartById(cartId);
    if (!cart) return next(new GeneralError("Cart does not exist", 404));
    cart.status = CART_STATUS.MOVE_TO_ORDERS;
    await cart.save();
    if (user) {
      order = await user.$create("order", {
        email: user.email,
        status: ORDER_STATUS.ACTIVE,
        cart_id: cartId,
        transaction_id: transactionId,
      });
    } else if (email) {
      order = await orderServices.createOrder({
        email: email,
        status: ORDER_STATUS.ACTIVE,
        user_id: null,
        cart_id: cartId,
        transaction_id: transactionId,
      });
    } else {
      return next(new GeneralError("Email address can not be null or login please",422));
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

export const getOrders: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user: User = request.user as User;
    const orders = await user.$get("orders");
    response.status(200).json({
      error: false,
      status: 200,
      data: {
        orders: orders,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const getOrderById: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user: User = request.user as User;
    const { id } = request.params;
    const order: Order = (await user.$get("orders", { where: { id: id } }))[0];
    if (!order)
      return response.status(422).json({
        error: true,
        status: 422,
        data: {
          message: "there is no order with this ID",
        },
      });

    const cart = await order.$get("cart");
    const products = await cart?.$get("products");
    response.status(200).json({
      error: false,
      status: 200,
      data: {
        products: products,
      },
    });
  } catch (e) {
    next(e);
  }
};
