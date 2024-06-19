const express = require("express");

const router = express.Router();

const {
  HandleSuperAdminSignup,
  handleSuperAminLogin,
} = require("../controllers/adminController");

const {AdminCreateEmployer,GetAllEmployer} = require("../controllers/EmployerController");

const handleVerifyAdmin= require('../utils/middlewares/VerifyAdmin')

router.route("/signup").post(HandleSuperAdminSignup);

router.route("/login").post(handleSuperAminLogin);

router.route("/createEmploye").post(AdminCreateEmployer);

router.route("/getallEmployee",handleVerifyAdmin).get(GetAllEmployer)

module.exports = router;
