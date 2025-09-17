import jwt from "jsonwebtoken";

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SIGN, { expiresIn: "7d" });
};

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SIGN, { expiresIn: "15m" });
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SIGN, (err, decode) => {
    if (err) {
      throw new Error("token is invalid or expired . login again");
    }

    return decode;
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SIGN, (err, decode) => {
    if (err) {
      throw new Error("token is invalid or expired . login again");
    }

    return decode;
  });
};
