const Lesson = require("../models/lesson.model");
const Course = require("../models/course.model");

// only instructor can add lessons 
exports.addLesson = async (req,res) => {
    try{
      const {title, type, content, order} = req.body;
      const {courseId} = req.params;

      if(!title || !type || !content || order === undefined){
         return res.status(400).json({
            success:false,
            message:"All fields are required",
         });
      }

      const course = await Course.findById(courseId);

      if(!course){
        return res.status(400).json({
            success:false,
            message:"Course not found"
        });
      }

    // here ensuring that instructor owns the particular course
     if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only add lessons to your own course",
      });
    }

    const lesson = await Lesson.create({
        title,
        type,
        content,
        order,
        course:courseId,
    });

    res.status(201).json({
        success: true,
        message:"Lesson added successfully..",
        data:lesson,
    });

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
}



exports.getLessonsByCourse = async (req, res) =>{
    try{
      const {courseId} = req.params;

      const lessons = await Lesson.find({course: courseId}).sort({order : 1});

      res.status(200).json({
        success:true,
        data: lessons,
      });
    }catch(err){
        res.status(500).json({
         success:false,
         message:"Server error"
      });
    }
};