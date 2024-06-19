const asyncHandler = require("express-async-handler");
const AppError = require("../AppError");
const HttpStatusCodes = require("../middlewares/statusCodes")
const jwt = require("jsonwebtoken");
const config = require('.././constants')


const handleVerifyAdmin = asyncHandler(async (req, res, next) => {
    if (req.headers["authorization"]) {
      const token = req.headers["authorization"].split(" ")[1];
      console.log(token);
      jwt.verify(token, config.JWT_SECRET, (error, decoded) => {
        if (error) {
          const err = new AppError(error.message, HttpStatusCodes.UNAUTHORIZED);
          next(err);
        }
        console.log(decoded,"Decodedddd");
        if(decoded.role === !'admin'){
          const err = new AppError("This user does not have the access", HttpStatusCodes.UNAUTHORIZED);
          next(err);
        }
      });
      next()
    }
  });
  module.exports = handleVerifyAdmin