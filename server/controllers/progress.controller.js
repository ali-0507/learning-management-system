const Progress = require("../models/progress.model");
const Lesson = require("../models/lesson.model");
const Enrollment = require("../models/enrollment.model");


exports.markLessonComplete = async (req, res) => {
    try{
        const {lessonId} = req.params;
         
        const lesson = await Lesson.findById(lessonId);
      
        if(!lesson){
          return res.status(404).json({
           success: false,
           message: "Lesson not found",
       });
     }

     const enrollment = await Enrollment.findOne({
        student: req.user._id,
        course: lesson.course,
     });

     if(!enrollment){
        return res.status(403).json({
           success: false,
           message: "You must enroll before completing lesson"
        });
     }

     const progress = await Progress.create({
        student: req.user._id,
        lesson: lessonId,
     });

     res.status(201).json({
        success: true,
        message:"Lesson marked as completed",
        data: progress,
     });

    }catch(err){
        if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Lesson already completed",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
   }
}