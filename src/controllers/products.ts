import { NextFunction, Request, Response } from "express";
import { Product } from "../models/Product";
import { Op } from "sequelize";
import { ProductImages } from "../models/Product-Images";
import { Category } from "../models/Category";
import { Brand } from "../models/Brand";

export const getProducts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { type = "", page = 0, category } = request.query;
    const startingOffset = parseInt(page as string) * 20;
    let products: Product[] = [];
    if (category) {
      products = await getCategoryProducts(
        startingOffset,
        parseInt(category as string)
      );
    } else {
      if (type == "new-arrivals") {
        products = await getNewArrivals(startingOffset);
      } else if (type == "handpicked") {
        products = await getHandPicked(startingOffset);
      } else {
        products = await Product.findAll({ offset: startingOffset, limit: 20 ,include:[ProductImages,Brand,Category]});
      }
    }
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

const getNewArrivals = async (startingOffset: number): Promise<Product[]> => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const products = await Product.findAll({
    include: [ProductImages, Brand, Category],
    offset: startingOffset,
    limit: 20,
    where: {
      createdAt: {
        [Op.gte]: threeMonthsAgo,
      },
    },
  });
  return products;
};

const getHandPicked = async (startingOffset: number): Promise<Product[]> => {
  const products = await Product.findAll({
    include: [ProductImages, Brand, Category],
    offset: startingOffset,
    limit: 20,
    where: {
      rate: {
        [Op.gte]: 4.5,
      },
      price: {
        [Op.lte]: 100,
      },
    },
  });
  return products;
};

const getCategoryProducts = async (
  startingOffset: number,
  categoryId: number
): Promise<Product[]> => {
  const category = await Category.findByPk(categoryId);
  const products =
    (await category?.$get("products", {
      include: [ProductImages, Brand, Category],
      offset: startingOffset,
      limit: 20,
    })) ?? [];
  return products;
};
