import express from "express";
import { userLogin, userRegistration } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.route("/register").post(userRegistration);
userRouter.route("/login").post(userLogin);

export default userRouter;
