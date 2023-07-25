import { NextFunction, RequestHandler, Response, Request } from "express";
import { User } from "../models/User";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import {annotateModelWithIndex, Sequelize} from "sequelize-typescript";
import { GeneralError } from "../errors/general-error";
import {CartProduct} from "../models/Cart-Product";

export const postCart: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user: User = request.user as User;
  const cart: Cart = await user.getCart();
  const productId = request.params.id;
  const product = await Product.findByPk(productId);
  if (!product)
    return next(new GeneralError("There is no product with this ID", 404));
  const hasProduct = await cart.$has("product", product);
  if (!hasProduct) {
    await cart.$add("product", product);
  } else {
    await cart.$set("products", product, {
      through: { quantity: Sequelize.literal("quantity+1") },
    });
  }
  await cart.updateTotalCost();
  response.status(201).json({
    error: false,
    status: 201,
    data: { message: "Item added successfully" },
  });
};
export const deleteCart:RequestHandler = async (request:Request,response:Response,next:NextFunction)=>{
  try{
    const user = await request.user as User;
    const cart:Cart = await user.getCart();
    const productId = request.params.id;
    const product:Product|null = await Product.findByPk(productId);
    if (!product)
      return next(new GeneralError("There is no product with this ID", 404));
    const productInCart =await CartProduct.findOne({
      where:{
        product_id:product.id,
        cart_id:cart.id
      }
    });

    if (!productInCart) return next (new GeneralError("This product is not in your cart",404));
    if (productInCart.quantity===1){
      await productInCart.destroy();
    }else{
      console.log(productInCart.quantity);
      await productInCart.update({quantity:productInCart.quantity-1});
    }
    await cart.updateTotalCost();
    response.status(200).json({
      error:false,
      status:200,
      data:{
        message:"product removed from cart successfully"
      }

    });
  }catch (e) {
    next(e);
  }
};

export const getCart: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user: User = request.user as User;
    const cart = await user.$get("carts", {
      where: { status: CART_STATUS.IN_PROGRESS },
      include: [Product],
    });
    response.status(200).json({
      error: false,
      status: 200,
      data: {
        cart: cart,
      },
    });
  } catch (e) {
    next(e);
  }
};
