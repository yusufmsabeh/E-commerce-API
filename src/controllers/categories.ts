import {
  NextFunction,
  Request,
  RequestHandler,
  response,
  Response,
} from "express";
import * as categoryServices from "../services/category";
import { buildPagination } from "../utils/build-pagination";
import { GeneralError } from "../errors/general-error";
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

export const getCategoryById: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const categoryId = request.params.id;
    const category = await categoryServices.getCategoryById(categoryId);
    if (!category)
      return next(new GeneralError("There is no category with this ID", 404));

    return response.status(200).json({
      error: false,
      status: 200,
      data: {
        category: category,
      },
    });
  } catch (e) {
    next(e);
  }
};
