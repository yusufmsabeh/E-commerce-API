import { Product } from "../models/Product";
import {ProductImages} from "../models/Product-Images";
import {Brand} from "../models/Brand";
import {Category} from "../models/Category";
import {FindOptions} from "sequelize";

export const getProducts = async (options:FindOptions = {}):Promise<Product[]> => {
  return await Product.findAll(options);
};

export const getProductByID= async (id:string):Promise<Product|null>=>{
  return await Product.findByPk(id,{include:[ProductImages,Brand,Category]});
};