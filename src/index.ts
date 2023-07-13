import express from "express";
import dotenv from "dotenv";
import { router as testRouter } from "./routes/test";
import { router as categoriesRouter } from "./routes/categories";
import { router as brandsRouter } from "./routes/brands";
import { router as productsRouter } from "./routes/products";
import connection from "./database/config";
dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT ?? "3000");
app.use("/test", testRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("brands", brandsRouter);
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
