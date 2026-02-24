const express = require("express");
const router = express.Router();

const {createCourse, getAllCourses} = require("../controllers/course.controller");
const {protect} = require('../middleware/auth.middleware');
const {authorize} = require("../middleware/role.middleware");


router.post("/", protect, authorize("instructor"), createCourse);

router.get("/", protect, getAllCourses);

module.exports = router;