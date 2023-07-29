import { NextFunction, Request, RequestHandler, Response } from "express";
import { Product } from "../models/Product";
import * as productServices from "../services/product";
import * as brandServices from "../services/brand";
import { FindOptions, Op } from "sequelize";
import { ProductImages } from "../models/Product-Images";
import { Category } from "../models/Category";
import { Brand } from "../models/Brand";
import { buildFilter } from "../utils/build-filter";
import { GeneralError } from "../errors/general-error";
import { buildPagination } from "../utils/build-pagination";

export const getProducts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const where = buildFilter(request);
    const count = await productServices.getCount({ where: where });
    const { pagination, limit, startingOffset } = buildPagination(
      count,
      request.query
    );
    const products = await productServices.getProducts({
      offset: startingOffset,
      limit: limit,
      include: [ProductImages, Brand, Category],
      where: where,
    });

    return response.status(200).json({
      error: false,
      status: 200,
      data: {
        products: products,
        pagination: pagination,
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
  try {
    const { q } = request.query;
    if (!q) return next();
    const where: FindOptions = {
      where: {
        title: {
          [Op.like]: `%${q}%`,
        },
      },
    };
    const productsCount = await productServices.getCount(where);
    const brandsCount = await brandServices.getCount(where);
    const { pagination, limit, startingOffset } = buildPagination(
      Math.max(productsCount, brandsCount),
      request.query
    );
    const products: Product[] = await productServices.getProducts({
      include: ProductImages,
      offset: startingOffset,
      limit: limit,
      ...where,
    });
    const brands: Brand[] = await Brand.findAll({
      offset: startingOffset,
      limit: limit,
      ...where,
    });
    response.status(200).json({
      error: false,
      status: 200,
      data: {
        products: products,
        brands: brands,
        pagination: pagination,
      },
    });
  } catch (e) {
    next(e);
  }
};
export const getProductById: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;
    const product = await productServices.getProductByID(id);
    if (!product)
      return next(new GeneralError("There is no product with this ID", 404));
    return response.status(200).json({
      error: false,
      status: 200,
      data: {
        product: product,
      },
    });
  } catch (e) {
    next(e);
  }
};
