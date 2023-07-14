import express from "express";
import dotenv from "dotenv";
import { router as testRouter } from "./routes/test";
import { router as categoriesRouter } from "./routes/categories";
import connection from "./database/config";
dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT ?? "8080");
app.use("/test", testRouter);
app.use("/categories", categoriesRouter);

connection.authenticate().then(
  () => {
    connection.sync().then(() => {
      return app;
    });
  },
  (error) => {
    console.log(error);
  }
);
