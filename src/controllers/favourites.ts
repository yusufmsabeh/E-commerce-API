import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { Brand } from "../models/Brand";
import { ProductImages } from "../models/Product-Images";
import { Favourite } from "../models/Favourites";
import { Sequelize } from "sequelize-typescript";
import { date } from "joi";

export const toggleFavourite: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user: User = request.user as User;
    const productId = request.params.id;
    const product = await Product.findByPk(productId);
    const hasProduct = await user.$has("favourite", product!);
    if (hasProduct) {
      await user.$remove("favourite", product!);
      return response.status(201).json({
        error: false,
        status: 201,
        data: { message: "Item removed successfully" },
      });
    }
    await user.$add("favourite", product!);
    response.status(201).json({
      error: false,
      status: 201,
      data: { message: "Item added successfully" },
    });
  } catch (e) {
    next(e);
  }
};

export const getFavourites = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = request.user as User;
    const favourites: Product[] = await user.$get("favourites", {
      include: [Category, Brand, ProductImages],
    });
    return response.status(200).json({
      error: false,
      status: 200,
      data: {
        favourites: favourites,
      },
    });
  } catch (e) {
    next(e);
  }
};
