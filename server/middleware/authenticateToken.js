import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/token.js";
import Session from "../model/sessionModel.js";
import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

export const authenticateToken = asyncHandler(async (req, res, next) => {
  const { refreshTkn, accessTkn } = req.cookies;
  if (!accessTkn) {
    if (!refreshTkn) {
      res.status(401);
      throw new Error("token is invalid or expired . login again");
    }

    const verifyRefreshTkn = verifyRefreshToken(refreshTkn);
    const findSession = await Session.findOne({
      _id: verifyRefreshTkn.sessionId,
    });

    if (!findSession) {
      res.status(401);
      throw new Error("token is invalid");
    }

    const findUser = await User.findOne({ _id: findSession.userId });

    if (!findUser) {
      res.status(401);
      throw new Error("user not found . session invalid");
    }

    const accessToken = generateAccessToken({
      userId: findUser._id,
      isAdmin: findUser.isAdmin,
      email: findUser.email,
    });

    const refreshToken = generateRefreshToken({ sessionId: findSession._id });

    res.cookie("refreshTkn", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 - (new Date() - findSession.createdAt),
    });
    res.cookie("accessTkn", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    req.user = {
      id: findUser._id,
      email: findUser.email,
      name: findUser.fullName,
    };

    return next();
  }

  const verifyAccessTkn = verifyAccessToken(accessTkn);

  const findUser = await User.findOne({ _id: verifyAccessTkn.userId });

  if (!findUser) {
    res.status(401);
    throw new Error("user not found . session invalid");
  }

  req.user = {
    id: findUser._id,
    email: findUser.email,
    name: findUser.fullName,
  };

  next();
});
