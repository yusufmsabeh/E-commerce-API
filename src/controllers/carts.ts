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
  const user: User = request.user as User;
  const cart: Cart = await user.getCart(user);
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
};
