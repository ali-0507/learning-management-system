const Course = require("../models/course.model");

exports.createCourse = async (req, res) => {
    try{
       const {title, description} = req.body;

       if(!title || !description){
        return res.status(400).json({
            success: false,
            message: "Title and description are required",
        });
       }

       const course = await Course.create({
         title,
         description,
         instructor: req.user._id,
       });

       res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: course,
       })
    }catch(err){
      res.status(500).json({
      success: false,
      message: "Server error",
     });
    }
}



exports.getAllCourses = async (req, res) => {
     try{
       const courses = await Course.find().populate("instructor", "name email");

       res.status(200).json({
        success:true,
        data:courses,
       });

     }catch(err){
         res.status(500).json({
         success: false,
         message: "Server error",
       });
     }
}
