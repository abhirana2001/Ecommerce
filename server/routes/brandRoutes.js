import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
  createBrandController,
  deleteBrandController,
  getAllbrandsControllr,
  getSingleBrandCotroller,
  updateBrandController,
} from "../controller/brandController.js";
const brandRouter = express.Router();

brandRouter
  .route("/")
  .post(authenticateToken, createBrandController)
  .get(getAllbrandsControllr);
brandRouter
  .route("/:id")
  .get(getSingleBrandCotroller)
  .put(authenticateToken, updateBrandController)
  .delete(authenticateToken, deleteBrandController);

export default brandRouter;
