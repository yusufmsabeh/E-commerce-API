import {Cart} from "../models/Cart";
import {Product} from "../models/Product";
import {getCartProducts} from "./cart-product";
import getConnection from "../database/config";

export const getCart = async (user_id:string)=>{
  const [cart] = await Cart.findOrCreate<Cart>({
    where: { status: CART_STATUS.IN_PROGRESS, user_id: user_id },
  });
  return cart;
};

export const getActiveCartById = async (cartId:string)=>{
  return  await Cart.findOne({
    where: { id: cartId, status: CART_STATUS.IN_PROGRESS },
  });
};
export const cartHasProduct = async (cart:Cart,product:Product)=>{
  return await cart.$has("product", product);
    
};

export const addProductToCart = async (cart:Cart,product:Product)=>{
  await cart.$add("product",product);
};
export const updateCartProduct = async (cart:Cart,product:Product,options={})=>{
  await cart.$set("products", product, options);
};

export const updateTotalPrice = async (cart:Cart)=>{

  const connection = getConnection();
  const result: any = await getCartProducts({
    attributes: [
      [connection.literal("quantity*products.price"), "totalPrice"],
    ],
    include: [
      {
        model: Product,
        attributes: [],
      },
    ],

    where: {
      cart_id: cart.id,
    },
    raw: true,
  });

  cart.total_cost=0;
  if (result.length>0) {
    const totalPrice = result[0].totalPrice ?? 0;
    const cartDiscount: number = cart.discount / 100;
    const tax = cart.tax;
    cart.total_cost = totalPrice - totalPrice * cartDiscount + tax;
  }
  await cart.save();
};