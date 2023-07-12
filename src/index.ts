import express from "express";
import dotenv from "dotenv";
import { router as testRouter } from "./routes/test";

import { router as productsRouter } from "./routes/products";

import { router as categoriesRouter } from "./routes/categories";

import connection from "./database/config";
dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT ?? "3000");
app.use("/test", testRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);

connection.authenticate().then(
  () => {
    connection.sync().then(() => {
      app.listen(PORT, "localhost", () => {
        console.log("server is listening on port ", PORT);
      });
    });
  },
  (error) => {
    console.log(error);
  }
);
