import { NextFunction, Request, RequestHandler, Response } from "express";
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
    const { page = 0 } = request.query;
    const startingOffset = parseInt(page as string) * 20;

    const products = await Product.findAll({
      offset: startingOffset,
      limit: 20,
      include: [ProductImages, Brand, Category],
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

export const getCategoryProducts: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { category: categoryId, page = 0 } = request.query;
  if (!categoryId) return next();
  const startingOffset = parseInt(page as string) * 20;
  const category = await Category.findByPk(parseInt(categoryId as string));
  const products =
    (await category?.$get("products", {
      include: [ProductImages, Brand, Category],
      offset: startingOffset,
      limit: 20,
    })) ?? [];

  return response.status(200).json({
    error: false,
    status: 200,
    data: {
      products: products,
    },
  });
};

export const getSearchProductsAndBrands: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { q, page = 0 } = request.query;
  if (!q) return next();
  const startingOffset = parseInt(page as string) * 20;
  const products: Product[] = await Product.findAll({
    include: ProductImages,
    offset: startingOffset,
    limit: 20,
    where: {
      title: {
        [Op.like]: `%${q}%`,
      },
    },
  });
  const brands: Brand[] = await Brand.findAll({
    offset: startingOffset,
    limit: 20,
    where: {
      title: {
        [Op.like]: `%${q}%`,
      },
    },
  });
  response.status(200).json({
    error: false,
    status: 200,
    data: {
      products: products,
      brands: brands,
    },
  });
};

export const getNewArrivals: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { type, page } = request.query;
  if (!(type == "new-arrivals")) return next();
  const startingOffset = parseInt(page as string) * 20;
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
  return response.status(200).json({
    error: false,
    status: 200,
    data: {
      products: products,
    },
  });
};

export const getHandPicked: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { type, page } = request.query;
  if (!(type == "handpicked")) return next();
  const startingOffset = parseInt(page as string) * 20;
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
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
  return response.status(200).json({
    error: false,
    status: 200,
    data: {
      products: products,
    },
  });
};

export const getProductById: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;
    const product = await Product.findByPk(id,{
      include:[ProductImages,Brand,Category]
    });
    if (!product) return next(new Error("There is no product with this ID"));
    return response.status(200).json({
      error: false,
      status: 200,
      data: {
        product: product,
      },
    });
  } catch (error) {
    next(error);
  }
};
