import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import { Product } from "../models/Product";
import {Category} from "../models/Category";
import {Brand} from "../models/Brand";
import {ProductImages} from "../models/Product-Images";

export const getFavourites = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.user as User;
  const favourites: Product[] = await user.$get("favourites",{include:[Category,Brand,ProductImages]});
  return response.status(200).json({
    error: false,
    status: 200,
    data: {
      favourites: favourites,
    },
  });
};
