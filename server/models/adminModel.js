
const mongoose = require('mongoose');
const Joi = require("joi");
const passwordcomplexity = require('joi-password-complexity')
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
    f_sno: {
      type: Number,
      required: true,
      unique: true
    },
    f_userName: {
      type: String,
      required: true,
      unique: true
    },
    f_Pwd: {
      type: String,
      required: true
    },
    role: {
        type: String,
        default: 'admin'
    }
  });


  const validate = (data) => {
    const schema = Joi.object({
        f_sno: Joi.number().required().label("f_sno"),
        f_userName: Joi.string().required().label("f_userName"),
        f_Pwd: passwordcomplexity().required().label("f_Pwd"),
    });
  
    return schema.validate(data);
  };

  const LoginValidate = (data)=>{
    const schema = Joi.object({
      f_userName: Joi.string().required().label("f_userName"),
      f_Pwd: passwordcomplexity().required().label("f_Pwd"),
  });

  return schema.validate(data);
  }

  AdminSchema.pre("save", async function (next) {
    try {
        if (!this.isModified('f_Pwd')) return next();
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(this.f_Pwd, saltRounds);
        this.f_Pwd = hashedPassword
    } catch (error) {
        next(error)
    }
})
const adminModel = mongoose.model('admin', AdminSchema);

module.exports = {adminModel  ,validate, LoginValidate};
