const mongoose = require("mongoose");
const Joi = require("joi");
// Define the Employee schema
const employeeSchema = new mongoose.Schema({
  f_Id: {
    type: String,
    unique: true,
  },
  //   f_Image: {
  //     type: String, // Assuming the image is stored as a URL or file path
  //     required: true,
  //   },
  f_Name: {
    type: String,
    required: true,
  },
  f_Email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  f_Mobile: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, "Please use a valid 10-digit mobile number."],
  },
  f_Designation: {
    type: String,
    required: true,
  },
  f_Gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"], // Assuming gender options
  },
  f_Course: {
    type: String,
    required: true,
  },
  f_CreateDate: {
    type: Date,
    default: Date.now,
  },
});


//     const schema = Joi.object({
//       f_Name: Joi.string().required().label("Name"),
//       f_Email: Joi.string().email().required().label("Email"),
//       f_Mobile: Joi.string()
//         .pattern(/^\d{10}$/)
//         .required()
//         .label("Mobile"),
//       f_Designation: Joi.string().required().label("Designation"),
//       f_Gender: Joi.string().valid("Male", "Female").required().label("Gender"),
//       f_Course: Joi.string().required().label("Course"),
//       f_CreateDate: Joi.date()
//         .default(() => new Date(), "current date")
//         .label("Create Date"),
//     });
  
//     const { error } = schema.validate(data);
//     return error ? { status: "error", message: error.details[0].message } : { status: "success" };
//   };

// Create the Employee model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = { Employee,};
