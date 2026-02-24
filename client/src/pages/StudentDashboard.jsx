import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
   const navigate = useNavigate();
   
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard/student");
        setCourses(res.data.data);
      } catch (err) {
        setError("Failed to load dashboard");
      }
    };
    fetchDashboard();
  }, []);
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

        {error && <p className="text-red-500">{error}</p>}

        {courses.length === 0 ? (
          <p>No enrolled courses yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div
                key={course.courseId}
                className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-lg transition duration-300"
              >
                <h2 className="font-semibold text-lg">{course.title}</h2>

                {/* from here  progress bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1">{course.progress}% completed</p>
                </div>
                <button
                  onClick={() => navigate(`/course/${course.courseId}`)}
                  className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
                >
                  View Lessons
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default StudentDashboard;
