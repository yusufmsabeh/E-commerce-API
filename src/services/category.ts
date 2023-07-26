import {Category} from "../models/Category";
import {FindOptions} from "sequelize";

export const getCategories = async (options:FindOptions={}):Promise<Category[]>=>{
  return await Category.findAll(options);
};