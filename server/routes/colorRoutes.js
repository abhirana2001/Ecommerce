import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
  createColorController,
  deleteColorController,
  getAllColorController,
  getSingleColorController,
  updateColorController,
} from "../controller/colorController.js";

const colorRouter = express.Router();

colorRouter
  .route("/")
  .post(authenticateToken, createColorController)
  .get(getAllColorController);
colorRouter
  .route("/:id")
  .get(getSingleColorController)
  .put(authenticateToken, updateColorController)
  .delete(authenticateToken, deleteColorController);

export default colorRouter;
