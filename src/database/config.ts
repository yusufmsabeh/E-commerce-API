import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import { development as databaseConfig } from "../../config/config.json";
import { Test } from "../models/Test";
import { User } from "../models/User";
import { Address } from "../models/Address";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { CartProduct } from "../models/Cart-Product";
import { ProductImages } from "../models/Product-Images";
import { Favourite } from "../models/Favourites";
import { Order } from "../models/Order";
import { Variant } from "../models/Variant";
import { ProductVariant } from "../models/Product-Variant";
import { Category } from "../models/Category";
import { Brand } from "../models/Brand";
import * as fs from "fs";

let connection: Sequelize;
const getConnection = () => {
  if (!connection) {
    connection = new Sequelize({
      dialect: "postgres",
      database: process.env.DATABASE_NAME,
      host:process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USERNAME,
      ssl: true,
      port: Number(process.env.DATABASE_PORT),
      logging: console.log,
      models: [
        Test,
        User,
        Address,
        Cart,
        Product,
        CartProduct,
        ProductImages,
        Favourite,
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
