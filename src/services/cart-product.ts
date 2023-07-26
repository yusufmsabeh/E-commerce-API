import { CartProduct } from "../models/Cart-Product";

export const getCartProducts = async (options = {}): Promise<CartProduct[]> => {
  return await CartProduct.findAll(options);
};
export const getCartProduct = async (options = {}) => {
  return await CartProduct.findOne(options);
};
