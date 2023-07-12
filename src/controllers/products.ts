import { NextFunction, Request, Response } from "express";
import { Product } from "../models/Product";

export const getProducts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { q, page = 0 } = request.query;
    const startingOffset = parseInt(page as string) * 20 + 1;
    const whereObject = {};

    const products = await Product.findAll({
      offset: startingOffset,
      limit: 20,
    });
    return response.status(200).json({
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
