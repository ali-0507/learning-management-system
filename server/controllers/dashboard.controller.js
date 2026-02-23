const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");
const calculateProgress = require("../utils/calculateProgress");


exports.getStudentDashboard = async (req, res) => {
    try{
      const enrollments = await Enrollment.find({student: req.user._id}).populate("course");

      const dashboard = [];

      for(let enroll of enrollments){
        const progress = await calculateProgress(
            req.user._id,
            enroll.course._id
        );

        dashboard.push({
            courseId: enroll.course._id,
            title: enroll.course.title,
            progress,
        });
      }

      res.status(200).json({
        success: true,
        data:dashboard,
      });
    }catch(error){
     res.status(500).json({
       success: false,
       message: "Server error",
    });
  }
}



exports.getInstructorDashboard = async (req, res) => {
    try{
      const courses = await Course.find({instructor: req.user._id});

      const dashboard = [];

      for(let course of courses){
        const enrollments = await Enrollment.find({course : course._id});
        const totalStudents = enrollments.length;

        let totalProgress = 0;

        for (let enroll of enrollments) {
        const progress = await calculateProgress(
          enroll.student,
          course._id
        );
        totalProgress += progress;
       }
       const averageProgress = totalStudents === 0 ? 0 : Math.round(totalProgress / totalStudents);

       dashboard.push({
        courseId: course._id,
         title: course.title,
         totalStudents,
         averageProgress,
       });
      }

    res.status(200).json({
      success: true,
      data: dashboard,
    });

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}