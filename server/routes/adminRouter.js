const express = require("express");

const router = express.Router();

const {
  HandleSuperAdminSignup,
  handleSuperAminLogin,
} = require("../controllers/adminController");

const AdminCreateEmployer = require("../controllers/EmployerController");

router.route("/signup").post(HandleSuperAdminSignup);

router.route("/login").post(handleSuperAminLogin);

router.route("/createEmploye").post(AdminCreateEmployer);

module.exports = router;
