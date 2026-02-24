import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        setCourses(res.data.data);
      } catch (err) {
        setError("Failed to load courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Instructor Dashboard</h1>

          <button
            onClick={() => navigate("/create-course")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl shadow-sm transition duration-200"
          >
            + Create Course
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {courses.length === 0 ? (
          <p>No courses created yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-lg transition duration-300"
              >
                <h2 className="font-semibold text-lg">
                  {course.title}
                </h2>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() =>
                      navigate(`/add-lesson/${course._id}`)
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg transition duration-100"
                  >
                    Add Lesson
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/instructor/progress/${course._id}`)
                    }
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-lg transition duration-200"
                  >
                    View Progress
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default InstructorDashboard;