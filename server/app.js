const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const {protect} = require("./middleware/auth.middleware");
const {authorize} = require("./middleware/role.middleware");
const courseRoutes = require("./routes/course.routes");
const lessonRoutes = require("./routes/lesson.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");
const progressRoutes = require("./routes/progress.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
 })
);


// Routes 
app.use("/api/auth",authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/dashboard", dashboardRoutes);




// temporary auth middleware testing
app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "You accessed protected route",
    user: req.user,
  });
});

// temporary role middleware testing
app.get("/api/student-test",protect, authorize("student"),(req, res) => {
    res.json({
      success: true,
      message: "Student access granted",
    });
  }
);

// Test route
app.get("/api/test", (req, res) =>{
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

module.exports = app;