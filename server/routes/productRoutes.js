import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductsController,
  getSingleProductController,
  updateProductController,
} from "../controller/productController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const productRouter = express.Router();

productRouter.route("/").post(authenticateToken, createProductController);
productRouter.route("/").get(getProductsController);
productRouter
  .route("/:id")
  .get(getSingleProductController)
  .put(authenticateToken, updateProductController);
productRouter
  .route("/:id/delete")
  .delete(authenticateToken, deleteProductController);
export default productRouter;
