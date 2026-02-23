const Enrollment = require("../models/enrollment.model");
const Course = require("../models/course.model");


exports.enrollCourse = async (req, res) => {
     try{
       const {courseId} = req.params;

       const course = await Course.findById(courseId);

       if(!course){
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
       }

       const enrollment = await Enrollment.create({
           student: req.user._id,
           course: courseId,
       });

       res.status(201).json({
         success: true,
         message: "Enrolled successfully",
         data: enrollment,
    });
     }catch(err){
         if (err.code === 11000) {
          return res.status(400).json({
            success: false,
            message: "Already enrolled in this course",
      });
    }
        res.status(500).json({
            success: false,
            message: "Server error"
        });
     }
};




exports.getEnrolledCourse = async (req, res) => {
    try{
       const enrollments = await Enrollment.find({ student: req.user._id}).populate("course");

    res.status(200).json({
      success: true,
      data: enrollments,
    });
    }catch(err){
      res.status(500).json({
        success: false,
        message: "Server error",
    });
  }
};