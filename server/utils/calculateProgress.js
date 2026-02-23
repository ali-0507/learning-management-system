const Lesson = require("../models/lesson.model");
const Progress = require("../models/progress.model");

const calculateProgress = async (studentId, courseId) =>{
    const totalLessons = await Lesson.countDocuments({course: courseId});

    if(totalLessons === 0){
        return 0;
    }

    const lessons = await Lesson.find({course: courseId}).select("_id");

    const lessonIds = lessons.map((lesson) => lesson._id);

    const completedLessons = await Progress.countDocuments({
        student: studentId,
        lesson: {$in : lessonIds},
    });

    const percentage = (completedLessons / totalLessons) * 100;
    return Math.round(percentage);
};

module.exports = calculateProgress;