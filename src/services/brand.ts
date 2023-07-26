import {Brand} from "../models/Brand";

export const getBrands = async ():Promise<Brand[]>=>{
  return await Brand.findAll();
};