import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { createOrderController } from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.route("/").post(authenticateToken, createOrderController);

export default orderRouter;
