const express = require("express");
const router = express.Router();

const {getStudentDashboard, getInstructorDashboard} = require("../controllers/dashboard.controller");
const {protect} = require("../middleware/auth.middleware");
const {authorize} = require("../middleware/role.middleware");

router.get("/student", protect, authorize("student"), getStudentDashboard);
router.get("/instructor", protect, authorize("instructor"), getInstructorDashboard);

module.exports = router;