import { NextFunction, RequestHandler, Response, Request } from "express";
import { User } from "../models/User";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { Sequelize } from "sequelize-typescript";

export const postCart: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user: User = request.user as User;
    const cart: Cart = await user.getCart();
    const productId = request.params.id;
    const product = await Product.findByPk(productId);
    const hasProduct = await cart.$has("product", product!);
    if (!hasProduct) {
      await cart.$add("product", product!);
    } else {
      await cart.$set("products", product, {
        through: { quantity: Sequelize.literal("quantity+1") },
      });
    }
    await cart.updateTotalCost(cart);
    response.status(201).json({
      error: false,
      status: 201,
      data: { message: "Item added successfully" },
    });
  } catch (e) {
    next(e);
  }
};

export const getCart: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user: User = request.user as User;
    const cart = await user.$get("carts", {
      where: { status: 0 },
      include: [Product],
    });
    response.status(200).json({
      error: false,
      status: 200,
      data: {
        cart: cart,
      },
    });
  } catch (e) {
    next(e);
  }
};
