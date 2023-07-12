import express from "express";
import dotenv from "dotenv";
import { router as testRouter } from "./routes/test";
import connection from "./database/config";
dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT ?? "3000");
app.use("/test", testRouter);

connection.authenticate().then(
  () => {
    connection.sync({ force: true }).then(() => {
      app.listen(PORT, "localhost", () => {
        console.log("server is listening on port ", PORT);
      });
    });
  },
  (error) => {
    console.log(error);
  }
);
