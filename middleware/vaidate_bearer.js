const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {

  if (!req.headers.authorization) {
    res.status(401).json({ message: "No bearer token" });
    throw new Error("No bearer token");
  }
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
        throw new Error("Unauthorized");
      }
      req.user = decoded.user;
      console.log(req.user);
      next();
    });
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      throw new Error("Unauthorized");
    }
  }
});

module.exports = validateToken;
