import {
  NextFunction,
  Request,
  RequestHandler,
  response,
  Response,
} from "express";
import { Product } from "../models/Product";
import { Op } from "sequelize";
import { ProductImages } from "../models/Product-Images";
import { Category } from "../models/Category";
import { Brand } from "../models/Brand";
import { buildFilter } from "../utils/build-filter";

export const getProducts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { page = 0 } = request.query;
    const startingOffset = parseInt(page as string) * 20;
    const where = buildFilter(request);
    const products = await Product.findAll({
      offset: startingOffset,
      limit: 20,
      include: [ProductImages, Brand, Category],
      where: where,
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
