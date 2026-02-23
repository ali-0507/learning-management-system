const express = require("express");
const router = express.Router();

const {addLesson, getLessonsByCourse} = require("../controllers/lesson.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.post("/:courseId",protect, authorize("instructor"), addLesson);
router.get("/:courseId", getLessonsByCourse);

module.exports = router;
