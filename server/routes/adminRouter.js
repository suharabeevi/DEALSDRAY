const express = require("express");

const router = express.Router();

const {
  HandleSuperAdminSignup,
  handleSuperAminLogin,
} = require("../controllers/adminController");

// const {AdminCreateEmployer,GetAllEmployer} = require("../controllers/EmployerController");

// const handleVerifyAdmin= require('../utils/middlewares/VerifyAdmin')
// const IMGupload = require('../utils/middlewares/cloudinary')

router.route("/signup").post(HandleSuperAdminSignup);

router.route("/login").post(handleSuperAminLogin);

// router.route("/createEmploye")

//   .all(handleVerifyAdmin) // Middleware to handle admin verification
//   .all(IMGupload)
//   .post(AdminCreateEmployer)
// router.route("/getallEmployee")
// .all(handleVerifyAdmin)
// .get(GetAllEmployer)

module.exports = router;
