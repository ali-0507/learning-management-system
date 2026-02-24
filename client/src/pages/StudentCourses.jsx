import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data.data);
    } catch (err) {
      setError("Failed to load courses");
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await api.post(`/enrollments/${courseId}`);
      fetchCourses(); // refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Error enrolling");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 mr-200 text-blue-700 hover:underline"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold mb-6">All Courses</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <h2 className="font-semibold text-lg">{course.title}</h2>

              <p className="text-gray-600 mb-3">{course.description}</p>

              {course.isEnrolled ? (
                <span className="text-green-600 font-medium mt-3 inline-block">
                  ✓ Already Enrolled
                </span>
              ) : (
                <button
                  onClick={() => handleEnroll(course._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition duration-200 mt-3"
                >
                  Enroll
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default StudentCourses;
