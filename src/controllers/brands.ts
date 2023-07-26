import { NextFunction, Request, Response } from "express";
import { Brand } from "../models/Brand";
import * as brandServices from "../services/brand";
export const getBrands = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const brands: Brand[] = await brandServices.getBrands();
    return response.status(200).json({
      error: false,
      status: 200,
      data: {
        brands: brands,
      },
    });
  } catch (e) {
    next(e);
  }
};
