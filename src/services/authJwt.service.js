const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/jwt.config");

exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "No token provided!"
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.userId;
    next();
  });
};
