const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
// const config = require('../utils/constants')
const HttpStatusCodes = require("../utils/middlewares/statusCodes");
const {
  Employee,
  JoiEmployeeSchemavalidate,
} = require("../models/EmployerModel");
const crypto = require("crypto");

const AdminCreateEmployer = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body, req.file);

    // Validate the request body
    const { error } = JoiEmployeeSchemavalidate(req.body);
    if (error) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.details[0].message
      });
    }

    const {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course
    } = req.body;

    let employeimageUrl;
    if (req.file && req.file.path) {
      employeimageUrl = req.file.path; // Use the URL generated by Cloudinary
    }

    // Check if employee already exists
    const employeeExists = await Employee.findOne({ f_Email });
    if (employeeExists) {
      return res.status(HttpStatusCodes.CONFLICT).json({
        success: false,
        message: "Employee with this email already exists"
      });
    }
    const employeemobileExists = await Employee.findOne({ f_Mobile });
    if (employeemobileExists) {
      return res.status(HttpStatusCodes.CONFLICT).json({
        success: false,
        message: "Employee with this mobile number already exists"
      });
    }

    const newEmployee = new Employee({
      f_Image: employeimageUrl,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course
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
      success: true,
      message: "Employee registered successfully",
      employee: newEmployee
    });
  } catch (error) {
    console.error("Error in AdminCreateEmployer:", error);
    next(error);
  }
});


const GetAllEmployer = asyncHandler(async (req, res, next) => {
  try {
    const AllEmployer = await Employee.find();
    if (AllEmployer.length === 0) {
      return next(
        new AppError("Employer List is Empty", HttpStatusCodes.NOT_FOUND)
      );
    }
    res.status(HttpStatusCodes.SUCCESS).json({
      message: "Fetch all the employers successfully",
      employee: AllEmployer,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    next(
      new AppError(
        "Internal Server error",
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
});

module.exports = { AdminCreateEmployer, GetAllEmployer };
