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


exports.getCompletedLessons = async (req, res) =>{
   try{
    const { courseId } = req.params;

    const lessons = await Lesson.find({ course: courseId }).select("_id");

    const lessonIds = lessons.map(l => l._id);

    const completed = await Progress.find({
      student: req.user._id,
      lesson: { $in: lessonIds }
    }).select("lesson");

    const completedIds = completed.map(c => c.lesson);

    res.status(200).json({
      success: true,
      data: completedIds
    });
   }catch(err){
      res.status(500).json({
         success:false,
         message:"Server error"
      });
   }
}



exports.getCourseProgressForInstructor = async (req, res) => {
  try {
    const { courseId } = req.params;

    const lessons = await Lesson.find({ course: courseId });

    const totalLessons = lessons.length;

    const enrollments = await Enrollment.find({ course: courseId })
      .populate("student", "name email");

    const result = [];

    for (const enrollment of enrollments) {
      const studentId = enrollment.student._id;

      const completedCount = await Progress.countDocuments({
        student: studentId,
        lesson: { $in: lessons.map(l => l._id) }
      });

      const percentage =
        totalLessons === 0
          ? 0
          : Math.round((completedCount / totalLessons) * 100);

      result.push({
        studentId,
        studentName: enrollment.student.name,
        email: enrollment.student.email,
        totalLessons,
        completedLessons: completedCount,
        progressPercentage: percentage,
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};