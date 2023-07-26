import { NextFunction, Request, Response } from "express";
import * as categoryServices from "../services/category";
export const getCategories = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryServices.getCategories();
    return response.status(200).json({
      error: false,
      status: 200,
      data: {
        categories: categories,
      },
    });
  } catch (e) {
    next(e);
  }
};
