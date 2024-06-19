const asyncHandler = require("express-async-handler");
const AppError = require('../utils/AppError')
const { adminModel , validate , LoginValidate}  = require('../models/adminModel')
const config = require('../utils/constants')
const HttpStatusCodes = require('../utils/middlewares/statusCodes')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const HandleSuperAdminSignup = asyncHandler(async(req,res,next)=>{
    const { error } = validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, HttpStatusCodes.BAD_REQUEST));
  }
  const {f_sno,f_userName,f_Pwd} = req.body
    if ((!f_sno, !f_userName, !f_Pwd)) {
        const error = new AppError(
          "Please enter the all the values",
          HttpStatusCodes.BAD_REQUEST
        );
        next(error);
      }
      const AdminExist = await adminModel.findOne({ f_userName });

  if (AdminExist) {
    throw new AppError(
      "User with this email address already exists",
      HttpStatusCodes.CONFLICT
    );
  }
  const SuperAdmin = new adminModel({
    f_sno,
    f_userName,
    f_Pwd,
  });
  
  await SuperAdmin.save();

  res.status(HttpStatusCodes.SUCCESS).json({
    _id: SuperAdmin?._id,
    name: SuperAdmin?.f_userName,
    number:SuperAdmin.f_sno,
    message: "Admin registered sucessfully",
  });
});


const handleSuperAminLogin = asyncHandler(async (req, res, next) => {
    const { error } = LoginValidate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, HttpStatusCodes.BAD_REQUEST));
  }
  const { f_userName,f_Pwd } = req.body;
    if (( !f_userName, !f_Pwd)) {
      const error = new AppError(
        "Please enter the all the values",
        HttpStatusCodes.BAD_REQUEST
      );
      next(error);
    }
    const admin = await adminModel.findOne({ f_userName });
    if (!admin) {
      const err = new AppError(
        "Invalid Login Details",
        HttpStatusCodes.UNAUTHORIZED
      );
      return next(err);
    }
  
    const isCorrect = await bcrypt.compare(f_Pwd,admin.f_Pwd);
    if (isCorrect) {
      const payload = {
        id: admin._id,
        f_userName: admin.f_userName,
        f_sno: admin.f_sno,
        role:admin.role
      };
      
      const token = jwt.sign(payload, config.JWT_SECRET);
      console.log(token)
  
      return res
        .status(HttpStatusCodes.OK)
        .json({ status: "success", message: "Admin has been verified", token, data:admin });
    }
    const err = new AppError("Invalid Login details", HttpStatusCodes.UNAUTHORIZED);
    return next(err);
  });
  
module.exports={
    HandleSuperAdminSignup,
    handleSuperAminLogin
}
