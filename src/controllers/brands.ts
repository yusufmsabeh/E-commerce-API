import { NextFunction, Request, RequestHandler, Response } from "express";
import { Brand } from "../models/Brand";
import * as brandServices from "../services/brand";
import { buildPagination } from "../utils/build-pagination";
import { GeneralError } from "../errors/general-error";
export const getBrands = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const count = await brandServices.getCount();
    const { pagination, limit, startingOffset } = buildPagination(
      count,
      request.query
    );
    const brands: Brand[] = await brandServices.getBrands({
      offset: startingOffset,
      limit: limit,
    });
    return response.status(200).json({
      error: false,
      status: 200,
      data: {
        brands: brands,
        pagination: pagination,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const getBrandById: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const brandId = request.params.id;
    const brand = await brandServices.getBrandById(brandId);
    if (!brand)
      return next(new GeneralError("There is no brand with this ID", 404));
    return response.status(200).json({
      error: false,
      status: 200,
      data: {
        brand: brand,
      },
    });
  } catch (e) {
    next(e);
  }
};
