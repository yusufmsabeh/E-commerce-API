import { Sequelize } from "sequelize-typescript";
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
import dotenv from "dotenv";
dotenv.configDotenv();
const connection = new Sequelize({
  dialect: "mysql",
  port: parseInt( process.env.MYSQL_ADDON_PORT as string),
  database: process.env.MYSQL_ADDON_DB,
  host: process.env.MYSQL_ADDON_HOST,
  password: process.env.MYSQL_ADDON_PASSWORD,
  username: process.env.MYSQL_ADDON_USER,
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
export default connection;
