const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
   {
     title:{
        type:String,
        required: [true, "Lesson title is required"],
        trim:true,
     },
     type:{
        type:String,
        enum: ["video", "text"],
        required: true,
     },
     content:{
        type:String,
        required: [true, "Lesson content is required"],
     },
     order:{
        type:Number,
        required:true,
     },
     course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
     },
 },
 {timestamps: true}
);

module.exports = mongoose.model("Lesson", lessonSchema);