const express = require("express");

const router = express.Router();

const {
  AdminCreateEmployer,
  GetAllEmployer,
  DeleteEmployerById,
  updateEmployer,
  getDetailsOfEmployee,
} = require("../controllers/EmployerController");

// const handleVerifyAdmin = require("../utils/middlewares/VerifyAdmin");
const IMGupload = require("../utils/middlewares/cloudinary");

router
  .route("/createEmploye")
  .all(IMGupload)
  .post(AdminCreateEmployer)

router.route("/getallEmployee").get(GetAllEmployer);

router.route("/deleteEmploye/:EmployerId").delete(DeleteEmployerById)

router.route("/updateEmployer/:EmployerId")
.all(IMGupload)
.put(updateEmployer)

router.route("/employee/:id").get(getDetailsOfEmployee)



module.exports = router;
