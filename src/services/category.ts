import {Category} from "../models/Category";

export const getCategories = async (options={}):Promise<Category[]>=>{
  return await Category.findAll(options);
};