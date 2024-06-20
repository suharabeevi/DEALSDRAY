const Joi = require('joi')

const JoiEmployeeUpdateSchemavalidate = (data) => {
    console.log(data);
    const JoiEmployeeSchema = Joi.object({
        U_f_Name: Joi.string().min(3).max(50).required().label("Name").messages({
        "string.min": `"Name" should have a minimum length of {#limit}`,
        "string.max": `"Name" should have a maximum length of {#limit}`,
        "any.required": `"Name" is a required field`,
      }),
      U_f_Email: Joi.string()
        .email()
        .pattern(/^\S+@\S+\.\S+$/)
        .required()
        .label("Email")
        .messages({
          "string.base": `"Email" should be a type of 'text'`,
          "string.email": `"Email" must be a valid email`,
          "any.required": `"Email" is a required field`,
        }),
        U_f_Mobile: Joi.string()
        .pattern(/^\d{10}$/)
        .required()
        .label("Mobile")
        .messages({
          "string.base": `"Mobile" should be a type of 'text'`,
          "string.empty": `"Mobile" cannot be an empty field`,
          "string.pattern.base": `"Mobile" must be a 10-digit number`,
          "any.required": `"Mobile" is a required field`,
        }),
        U_f_Designation: Joi.string().required().label("Designation"),
        U_f_Gender: Joi.string().required().valid("Male", "Female").label("Gender"),
        U_f_Course: Joi.array().items(Joi.string()).label("Course"), // Change to array of strings
        
      
    });
    return JoiEmployeeSchema.validate(data);
  };
  module.exports = JoiEmployeeUpdateSchemavalidate;