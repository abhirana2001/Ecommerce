import express from "express";
import {
  updateShippingAddress,
  userLogin,
  userRegistration,
} from "../controller/userController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const userRouter = express.Router();

userRouter.route("/register").post(userRegistration);
userRouter.route("/login").post(userLogin);
// userRouter.route("/").get()
userRouter
  .route("/update/shipping")
  .post(authenticateToken, updateShippingAddress);

export default userRouter;
