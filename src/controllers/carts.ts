import { NextFunction, RequestHandler, Response, Request } from "express";
import { User } from "../models/User";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { Sequelize } from "sequelize-typescript";
import { GeneralError } from "../errors/general-error";
import * as cartServices from "../services/cart";
import * as productServices from "../services/product";
import * as cartProductServices from "../services/cart-product";
import { CART_STATUS } from "../enums/status-enums";
import { ProductImages } from "../models/Product-Images";
import { Category } from "../models/Category";

export const postCart: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user: User = request.user as User;
    const quantity: number = parseInt(
      (request.query.quantity as string) ?? "1"
    );
    if (quantity < 1)
      return next(
        new GeneralError("product quantity can not be less then 1", 422)
      );
    const cart: Cart = await cartServices.getCart(user.id);
    const productId = request.params.id;
    const product = await productServices.getProductByID(productId);
    if (!product)
      return next(new GeneralError("There is no product with this ID", 404));
    const hasProduct = await cart.$has("product", product);
    if (!hasProduct) {
      await cart.$add("product", product, { through: { quantity: quantity } });
    } else {
      await cart.$add("products", product, {
        through: { quantity: Sequelize.literal(`quantity+${quantity}`) },
      });
    }
    await cartServices.updateTotalPrice(cart);
    response.status(201).json({
      error: false,
      status: 201,
      data: { message: "Item added successfully" },
    });
  } catch (e) {
    next(e);
  }
};
export const updateCart: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = (await request.user) as User;
    const cart: Cart = await cartServices.getCart(user.id);
    const productId = request.params.id;
    const product: Product | null = await productServices.getProductByID(
      productId
    );
    if (!product)
      return next(new GeneralError("There is no product with this ID", 404));
    const productInCart = await cartProductServices.getCartProduct({
      where: {
        product_id: product.id,
        cart_id: cart.id,
      },
    });

    if (!productInCart)
      return next(new GeneralError("This product is not in your cart", 404));
    if (productInCart.quantity === 1) {
      await productInCart.destroy();
    } else {
      console.log(productInCart.quantity);
      await productInCart.update({ quantity: productInCart.quantity - 1 });
    }
    await cartServices.updateTotalPrice(cart);
    response.status(200).json({
      error: false,
      status: 200,
      data: {
        message: "product removed from cart successfully",
      },
    });
  } catch (e) {
    next(e);
  }
};

export const deleteCart = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = (await request.user) as User;
    const cart: Cart = await cartServices.getCart(user.id);
    const productId = request.params.id;
    const product: Product | null = await productServices.getProductByID(
      productId
    );
    if (!product)
      return next(new GeneralError("There is no product with this ID", 404));
    const productInCart = await cartProductServices.getCartProduct({
      where: {
        product_id: product.id,
        cart_id: cart.id,
      },
    });
    if (!productInCart)
      return next(new GeneralError("product does not exist in your cart", 404));
    await productInCart.destroy();
    response.status(200).json({
      error: false,
      status: 204,
      data: {
        message: "Product removed from cart successfully",
      },
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
      where: { status: CART_STATUS.IN_PROGRESS },
      include: [
        {
          model: Product,
          include: [ProductImages, Category],
        },
      ],
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
