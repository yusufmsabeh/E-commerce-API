import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import { development } from "../../config/config.json";
import { Test } from "../models/Test";
import { User } from "../models/User";
import { Address } from "../models/Address";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { CartProduct } from "../models/Cart-Product";
import { ProductImages } from "../models/Product-Images";
import { Favourites } from "../models/Favourites";
import { Order } from "../models/Order";
import { Variant } from "../models/Variant";
import { ProductVariant } from "../models/Product-Variant";
import { Category } from "../models/Category";
import { Brand } from "../models/Brand";

let connection:Sequelize ;
const getConnection =()=>{
  if (!connection){
    connection= new Sequelize({
      dialect: development.dialect as Dialect,
      database: development.database,
      host: development.host,
      password: development.password,
      username: development.username,
      logging: console.log,
      models: [
        Test,
        User,
        Address,
        Cart,
        Product,
        CartProduct,
        ProductImages,
        Favourites,
        Order,
        Variant,
        ProductVariant,
        Brand,
        Category,
      ],
    });
  }
  return connection;
};
export default getConnection;
