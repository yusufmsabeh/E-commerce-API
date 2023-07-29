import { NextFunction, Request, Response } from "express";
import { Brand } from "../models/Brand";
import * as brandServices from "../services/brand";
import { buildPagination } from "../utils/build-pagination";
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
