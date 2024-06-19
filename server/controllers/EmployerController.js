const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
// const config = require('../utils/constants')
const HttpStatusCodes = require("../utils/middlewares/statusCodes");
const { Employee ,validateEmployee } = require("../models/EmployerModel");
const crypto = require("crypto");

const AdminCreateEmployer = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);

    // Validate the request body
    const { error } = validateEmployee(req.body);

    if (error) {
      throw new AppError(error.details[0].message, HttpStatusCodes.BAD_REQUEST);
    }
    const {
      //   f_Image,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course,
      f_CreateDate,
    } = req.body;

    // Check if employee already exists
    const employeeExists = await Employee.findOne({ f_Email });
    if (employeeExists) {
      throw new AppError(
        "Employee with this email already exists",
        HttpStatusCodes.CONFLICT
      );
    }

    const newEmployee = new Employee({
      //   f_Image,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course,
      f_CreateDate,
    });

    await newEmployee.save();
    // Generate f_Id based on the new _id
    const hash = crypto.createHash("sha256");
    hash.update(newEmployee._id.toString()); // Convert ObjectId to string
    const hashedId = hash.digest("hex").slice(0, 6);
    // Update the new employee with f_Id
    newEmployee.f_Id = hashedId;
    await newEmployee.save();
    res.status(HttpStatusCodes.SUCCESS).json({
      message: "Employee registered successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error in AdminCreateEmployer:", error);
    next(error);
  }
});
module.exports = AdminCreateEmployer;
