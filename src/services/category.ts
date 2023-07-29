import { Category } from "../models/Category";
import { FindOptions } from "sequelize";

export const getCategories = async (
  options: FindOptions = {}
): Promise<Category[]> => {
  return await Category.findAll(options);
};
export const getCount = async (options: FindOptions = {}): Promise<number> => {
  return await Category.count(options);
};
