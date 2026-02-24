import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function CourseLessons() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
    try {
      const lessonRes = await api.get(`/lessons/${courseId}`);
      setLessons(lessonRes.data.data);
    } catch (err) {
      setError("Failed to load lessons");
    }
  };

  const fetchCompleted = async () => {
    try {
      const completedRes = await api.get(
        `/progress/completed/${courseId}`
      );
      setCompletedLessons(completedRes.data.data);
    } catch (err) {
      console.log("Failed to fetch completed lessons");
    }
  };

    fetchLessons();
   fetchCompleted();
  }, [courseId]);

  const markComplete = async (lessonId) => {
    try {
      await api.post(`/progress/${lessonId}`);
       setCompletedLessons((prev) => [...prev, lessonId])
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
       <button onClick={() => navigate(-1)}
          className="mb-4 mr-200 text-blue-600 hover:underline">
          ← Back
        </button>
        <h1 className="text-2xl font-bold mb-6">Course Lessons </h1>
        
        {error && <p className="text-red-500">{error}</p>}

        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="bg-white p-4 rounded shadow mb-4"
          >
            <h2 className="font-semibold">{lesson.title}</h2>
            <p className="text-sm text-gray-600">
              {lesson.type === "video"
                ? "Video Lesson"
                : lesson.content}
            </p>
            {completedLessons.includes(lesson._id) ? (

            <p className="mt-3 text-green-600 font-semibold">
                Completed
            </p>
            ) : (
            <button
              onClick={() => markComplete(lesson._id)}
              className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Mark as Complete
            </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default CourseLessons;