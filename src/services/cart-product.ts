import { CartProduct } from "../models/Cart-Product";
import {FindOptions} from "sequelize";

export const getCartProducts = async (options:FindOptions = {}): Promise<CartProduct[]> => {
  return await CartProduct.findAll(options);
};
export const getCartProduct = async (options:FindOptions = {}) => {
  return await CartProduct.findOne(options);
};
