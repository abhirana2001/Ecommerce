import express from "express";
import dotenv from "dotenv";
import dbConnect from "../config/dbConfig.js";
import userRouter from "../routes/userRoutes.js";
import cookieParser from "cookie-parser";
import qs from "qs";
import { globalErrHandler, notFound } from "../middleware/globalErrHandler.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import productRouter from "../routes/productRoutes.js";
import categoryRouter from "../routes/categoryRoutes.js";
import brandRouter from "../routes/brandRoutes.js";
import colorRouter from "../routes/colorRoutes.js";
import reviewRouter from "../routes/reviewRoutes,.js";
import cross from "cross";
dotenv.config();

dbConnect();
const app = express();
app.use(cross());

app.set("query parser", function (str) {
  return qs.parse(str, {
    depth: 10,
    allowPrototypes: false,
    plainObjects: true,
  });
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", authenticateToken, (req, res) => {
  console.log("test");
  res.status(200).json({
    msg: "wkb",
  });
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/color", colorRouter);
app.use("/api/v1/review", reviewRouter);

app.use(notFound);
app.use(globalErrHandler);

export default app;
