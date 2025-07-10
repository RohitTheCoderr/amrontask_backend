import { jwtGenToken, jwtVerifyToken } from "../services/library/jwt.js";

export const createToken = (req, res, next) => {
  try {
    const userID = req.userID;
    if (!userID) {
      console.log("userID not found");
      return res
        .status(401)
        .json({ success: false, message: "userID not found" });
    }

    const token = jwtGenToken(userID);

    console.log("token", token);
    
    res
      .status(202)
      .json({
        success: true,
        message: "Token generated successfully",
        data: { token: token },
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate token",
    });
  }
};


// Verify token middleware
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decodeToken= jwtVerifyToken(token);
      (req).userID = decodeToken.userID
      console.log(`Token verification ended.`);
      if ((req).userID) {
        return next()
      }
      throw new Error("jwt token not verified")
    } else {
      res.status(401).json({
        success: false,
        message: "Authorization header missing or malformed"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify token"
    });
  }
};
