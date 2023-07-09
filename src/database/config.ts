import { Sequelize } from "sequelize-typescript";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dbConfig = require("../../config/config.json")["development"];

const connection = new Sequelize({
  dialect: dbConfig.dialect,
  database: dbConfig.database,
  host: dbConfig.host,
  password: dbConfig.password,
  username: dbConfig.username,
  logging: console.log,
});
export default connection;
