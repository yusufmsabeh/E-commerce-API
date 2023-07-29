import { NextFunction, Request, Response } from "express";
import * as categoryServices from "../services/category";
import { buildPagination } from "../utils/build-pagination";
export const getCategories = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const count = await categoryServices.getCount();
    const { pagination, limit, startingOffset } = buildPagination(
      count,
      request.query
    );
    const categories = await categoryServices.getCategories({
      offset: startingOffset,
      limit: limit,
    });
    return response.status(200).json({
      error: false,
      status: 200,
      data: {
        categories: categories,
        pagination: pagination,
      },
    });
  } catch (e) {
    next(e);
  }
};
