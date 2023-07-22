import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../models/User";
import { Order } from "../models/Order";
import { Cart } from "../models/Cart";
import { GeneralError } from "../errors/general-error";
import { postOrdersValidator } from "../validators/post-orders-validator";
import { ValidationError } from "../errors/validation";
import { ValidationErrorItem } from "sequelize";
import * as trace_events from "trace_events";

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
      order = await user.$create("order", {
        email: user.email,
        status: 0,
        cart_id: cartId,
        transaction_id: transactionId,
      });
    } else if (email) {
      order = await Order.create({
        email: email,
        status: 0,
        user_id: null,
        cart_id: cartId,
        transaction_id: transactionId,
      });
    } else {
      return response.status(422).json({
        error: true,
        status: 422,
        message: "email address can not be null",
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

export const getOrders:RequestHandler = async (request:Request,response:Response,next:NextFunction)=>{
  try{
    const user:User = request.user as User;
    const orders=await user.$get("orders");
    response.status(200).json({
      error:false,
      status:200,
      data:{
        orders:orders
      }
    });
  }catch (e) {
    next(e);
  }
};

export const getOrderById:RequestHandler = async (request:Request,response:Response,next:NextFunction)=>{
  try{
    const user:User = request.user as User;
    const {id} =request.params;
    const order:Order=(await user.$get("orders",{where:{id:id}}))[0];
    if(!order) return response.status(422).json({
      error:true,
      status:422,
      data:{
        message: "there is no order with this ID"
      }
    });

    const cart=    await order.$get("cart");
    const products = await cart?.$get("products");
    response.status(200).json({
      error:false,
      status:200,
      data:{
        products:products
      }
    });
  }catch (e) {
    next(e);
  }
};
