const express = require("express");
const router = express.Router();


const { markLessonComplete } = require("../controllers/progress.controller");
const {protect} = require("../middleware/auth.middleware");
const {authorize} = require("../middleware/role.middleware");

router.post("/:lessonId", protect, authorize("student"), markLessonComplete);

module.exports = router;