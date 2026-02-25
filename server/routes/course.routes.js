const express = require("express");
const router = express.Router();

const {createCourse, getAllCourses, getInstructorCourses} = require("../controllers/course.controller");
const {protect} = require('../middleware/auth.middleware');
const {authorize} = require("../middleware/role.middleware");


router.post("/", protect, authorize("instructor"), createCourse);
router.get("/", protect, getAllCourses);
router.get("/instructor", protect, authorize("instructor"), getInstructorCourses);

module.exports = router;