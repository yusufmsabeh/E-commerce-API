import {Brand} from "../models/Brand";
import {FindOptions} from "sequelize";

export const getBrands = async (options:FindOptions={}):Promise<Brand[]>=>{
  return await Brand.findAll(options);
};export const getCount = async (options:FindOptions ={}):Promise<number>=>{
  return await Brand.count(options);
};