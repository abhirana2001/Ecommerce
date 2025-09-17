import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategorycontroller,
  getSingleCategoryController,
  updateCategoryController,
} from "../controller/categoryController.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(authenticateToken, createCategoryController)
  .get(getAllCategorycontroller);
categoryRouter
  .route("/:id")
  .get(getSingleCategoryController)
  .put(authenticateToken, updateCategoryController)
  .delete(authenticateToken, deleteCategoryController);

export default categoryRouter;
