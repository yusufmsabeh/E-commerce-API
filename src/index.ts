import express from "express";
import dotenv from "dotenv";
import { router as testRouter } from "./routes/test";
dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT ?? "3000");
app.use("/test", testRouter);
app.listen(PORT, "localhost", () => {
  console.log("server is listening on port ", PORT);
});
