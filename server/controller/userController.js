import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import Session from "../model/sessionModel.js";

// User Registration

export const userRegistration = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  // find user

  const findUser = await User.findOne({ email });

  if (findUser) {
    res.status(409);
    throw new Error("user already exsist");
  }

  //hash pasword

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    fullName,
    email,
    password: hashPassword,
  });

  res.status(201).json({
    user,
    message: "user is successfully created",
  });
});

//User Login

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (!findUser || !(await bcrypt.compare(password, findUser?.password))) {
    res.status(401);
    throw new Error("invalid login credentials");
  }

  //find or create a session

  const findSession = await Session.findOne({ userId: findUser._id });

  if (findSession) {
    await Session.findOneAndDelete({ _id: findSession.id });
  }

  const session = await Session.create({ userId: findUser?._id });

  // generate tokens
  const accessToken = generateAccessToken({
    userId: findUser._id,
    isAdmin: findUser.isAdmin,
    email: findUser.email,
  });
  const refreshToken = generateRefreshToken({ sessionId: session._id });

  // set token un cookies

  res.cookie("refreshTkn", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("accessTkn", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.status(200).json({
    message: "login successfully",

    userInfo: {
      id: findUser._id,
      email: findUser.email,
      name: findUser.fullName,
    },
  });
});
