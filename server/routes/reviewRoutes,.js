import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { createReviewController } from "../controller/reviewController.js";

const reviewRouter = express.Router();

reviewRouter
  .route("/:productId")
  .post(authenticateToken, createReviewController);

export default reviewRouter;
