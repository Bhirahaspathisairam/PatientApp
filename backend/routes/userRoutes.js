const express = require("express");
const router = express.Router();

const {
  loginUser,
  signup,
  getPatientDetails,
  getMedicalDetails,
  getReport
} = require("../controllers/userController/userController");

router.route("/login").post(loginUser);
router.route("/register").post(signup);
router.route("/generatetreport").post(getReport);
router.route("/pateintdetails").get(getPatientDetails);
router.route("/medicalDetails").get(getMedicalDetails);

module.exports = router;
