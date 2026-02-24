import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CourseLessons from "./pages/CourseLessons";
import CreateCourse from "./pages/CreateCourse";
import AddLesson from "./pages/AddLesson";
import StudentCourses from "./pages/StudentCourses";
import InstructorProgress from "./pages/InstructorProgress";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor"
        element={
          <ProtectedRoute role="instructor">
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/course/:courseId"
        element={
          <ProtectedRoute role="student">
            <CourseLessons />
          </ProtectedRoute>
        }
      />
      <Route path="/create-course" element={<CreateCourse />} />
      <Route path="/add-lesson/:courseId" element={<AddLesson />} />
      <Route path="/courses" element={<StudentCourses />} />
      <Route path="/instructor/progress/:courseId" element={<InstructorProgress />} />
    </Routes>
  );
}

export default App;
