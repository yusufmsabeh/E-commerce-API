import { NextFunction, Request, Response } from "express";
import { Product } from "../models/Product";
import { Op } from "sequelize";

export const getProducts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { q = "", page = 0 } = request.query;
    const startingOffset = parseInt(page as string) * 20 + 1;
    let whereObject = {};
    if (q == "new-arrivals") {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      console.log(threeMonthsAgo);
      whereObject = {
        createdAt: {
          [Op.gte]: threeMonthsAgo,
        },
      };
    } else if (q == "handpicked") {
      whereObject = {
        rate: {
          [Op.gte]: 4.5,
        },
        price: {
          [Op.lte]: 100,
        },
      };
    }
    const products = await Product.findAll({
      offset: startingOffset,
      limit: 20,
      where: whereObject,
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
