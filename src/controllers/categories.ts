import { Request, Response } from "express";
import { Category } from "../models/Category";

export const getCategories = async (request: Request, response: Response) => {
  const categories = await Category.findAll();
  response.status(200).json({
    error: false,
    status: 200,
    data: {
      categories: categories,
    },
  });
};
