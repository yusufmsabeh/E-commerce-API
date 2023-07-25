import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { Brand } from "../models/Brand";
import { ProductImages } from "../models/Product-Images";
import { Favourite } from "../models/Favourites";
import { Sequelize } from "sequelize-typescript";
import { date } from "joi";

export const postFavourite: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user: User = request.user as User;
    const productId = request.params.id;
    console.log(productId);
    const product = await Product.findByPk(productId);
    console.log(product);
    const hasProduct = await user.$has("favourite", product!);
    console.log(hasProduct);
    if (hasProduct) {
      return response.status(422).json({
        error: false,
        status: 422,
        data: { message: "Item is already in the favourites" },
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
