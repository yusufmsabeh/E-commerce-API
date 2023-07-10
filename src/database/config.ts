import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import { development } from "../../config/config.json";
import { Test } from "../models/Test";

const connection = new Sequelize({
  dialect: development.dialect as Dialect,
  database: development.database,
  host: development.host,
  password: development.password,
  username: development.username,
  logging: console.log,
  models: [Test],
});
export default connection;
