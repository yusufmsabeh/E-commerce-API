import {Order} from "../models/Order";
import {ORDER_STATUS} from "../enums/status-enums";

export const createOrder = async (order:OrderAttributes)=>{
  return await Order.create({ ...order });
};


interface OrderAttributes {
    email: string,
    status: ORDER_STATUS,
    user_id: string|null,
    cart_id: string,
    transaction_id: string,
    address_id:string
}