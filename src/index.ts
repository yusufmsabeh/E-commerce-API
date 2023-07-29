import express from "express";
import dotenv from "dotenv";
import { router as testRouter } from "./routes/test";
import { router as categoriesRouter } from "./routes/categories";
import { router as brandsRouter } from "./routes/brands";
import { router as productsRouter } from "./routes/products";
import { router as authRouter } from "./routes/auth";
import { router as favouritesRouter } from "./routes/favourites";
import { router as ordersRouter } from "./routes/orders";
import { router as cartsRouter } from "./routes/carts";
import { router as addressesRouter } from "./routes/addresses";
import getConnection from "./database/config";
import { errorHandler } from "./middlewares/error-handler";
import multer from "multer";
import passport from "passport";
import { passportConfig } from "./utils/passport-config";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT ?? "3000");
app.use(passport.initialize());
passportConfig();
const upload = multer();
app.use(cors());
app.use(upload.any());
app.use("/test", testRouter);
app.use("/auth", authRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/brands", brandsRouter);
app.use("/carts", cartsRouter);
app.use("/favourites", favouritesRouter);
app.use("/orders",ordersRouter);
app.use("/addresses",addressesRouter);
app.use(errorHandler);
process.on("unhandledRejection", (reason: Error | any) => {
  console.log("unhandled Rejection: ", reason.message | reason);
  throw new Error(reason.message || reason);
});
process.on("uncaughtException", (error: Error) => {
  console.log("uncaught Exception", error.message);
  throw error;
});
getConnection().authenticate().then(
  () => {
    getConnection().sync({alter:true}).then(() => {
      app.listen(PORT, "0.0.0.0", () => {
        console.log("server is listening on port ", PORT);
      });
    });
  },
  (error) => {
    console.log(error);
  }
);
