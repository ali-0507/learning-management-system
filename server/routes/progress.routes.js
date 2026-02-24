const express = require("express");
const router = express.Router();


const { markLessonComplete, getCompletedLessons, getCourseProgressForInstructor } = require("../controllers/progress.controller");
const {protect} = require("../middleware/auth.middleware");
const {authorize} = require("../middleware/role.middleware");

router.post("/:lessonId", protect, authorize("student"), markLessonComplete);
router.get("/completed/:courseId", protect, authorize("student"), getCompletedLessons)
router.get("/instructor/:courseId", protect, authorize("instructor"),getCourseProgressForInstructor);

module.exports = router;