import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Not Authenticated User",
      });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = tokenDecode.id;

    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: error.message,
    });
  }
};