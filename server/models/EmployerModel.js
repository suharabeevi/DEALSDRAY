const mongoose = require("mongoose");
const Joi = require("joi");
// Define the Employee schema
const employeeSchema = new mongoose.Schema({
  f_Id: {
    type: String,
    unique: true,
  },
  f_Image: {
    type: String, // Assuming the image is stored as a URL or file path
    required: true,
  },
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

const JoiEmployeeSchemavalidate = (data) => {
  const JoiEmployeeSchema = Joi.object({
    f_Name: Joi.string().min(3).max(50).required().label("Name").messages({
      "string.min": `"Name" should have a minimum length of {#limit}`,
      "string.max": `"Name" should have a maximum length of {#limit}`,
      "any.required": `"Name" is a required field`,
    }),
    // f_Image:Joi.string().required().label("Image"),
    f_Email: Joi.string()
      .email()
      .pattern(/^\S+@\S+\.\S+$/)
      .required()
      .label("Email")
      .messages({
        "string.base": `"Email" should be a type of 'text'`,
        "string.email": `"Email" must be a valid email`,
        "any.required": `"Email" is a required field`,
      }),
    f_Mobile: Joi.string()
      .pattern(/^\d{10}$/)
      .required()
      .label("Mobile")
      .messages({
        "string.base": `"Mobile" should be a type of 'text'`,
        "string.empty": `"Mobile" cannot be an empty field`,
        "string.pattern.base": `"Mobile" must be a 10-digit number`,
        "any.required": `"Mobile" is a required field`,
      }),
    f_Designation: Joi.string().required().label("Designation"),
    f_Gender: Joi.string().required().valid("Male", "Female").label("Gender"),
    f_Course: Joi.string().required().label("Course"),
    f_CreateDate: Joi.date().default(() => new Date()),
  });
  return JoiEmployeeSchema.validate(data);
};

//   employeeSchema.pre('save', async function (next) {
//     const Employee = this;

//     // Validate user data using Joi
//     const { error } = JoiEmployeeSchema.validate(Employee.toObject(), { abortEarly: false });
//     if (error) {
//         // Convert Joi validation errors to Mongoose validation error
//         const mongooseError = new mongoose.Error.ValidationError(null);
//         error.details.forEach((err) => {
//             mongooseError.errors[err.path[0]] = new mongoose.Error.ValidatorError({
//                 path: err.path[0],
//                 message: err.message,
//             });
//         });
//         return next(mongooseError);
//     }
//     next();
// });
// Create the Employee model
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = { Employee, JoiEmployeeSchemavalidate };
