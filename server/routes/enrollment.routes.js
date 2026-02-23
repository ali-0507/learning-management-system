const express = require("express");
const router = express.Router();

const { enrollCourse, getEnrolledCourse } = require("../controllers/enrollment.controller");
const {protect} = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.post("/:courseId", protect, authorize("student"), enrollCourse);
router.get("/my-courses", protect, authorize("student"), getEnrolledCourse);

module.exports = router;