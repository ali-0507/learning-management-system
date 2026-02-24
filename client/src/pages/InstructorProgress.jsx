import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function InstructorProgress() {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get(`/progress/instructor/${courseId}`);
        setStudents(res.data.data);
      } catch (err) {
        setError("Failed to load progress data");
      }
    };

    fetchProgress();
  }, [courseId]);

  return (
    <>
      <Navbar />
      <button
        onClick={() => navigate(-1)}
        className="mt-4 mr-190 text-blue-600 hover:underline"
      >
        ← Back
      </button>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Course Progress</h1>
        {error && <p className="text-red-500">{error}</p>}

        {students.length === 0 ? (
          <p>No students enrolled yet.</p>
        ) : (
          <div className="bg-white rounded shadow p-4">
            {students.map((student) => (
              <div
                key={student.studentId}
                className="bg-white p-6 rounded-2xl border shadow-sm mb-6"
              >
                <h2 className="font-semibold">{student.studentName}</h2>

                <p className="text-sm text-gray-600">{student.email}</p>

                <p className="mt-2">
                  {student.completedLessons} / {student.totalLessons} lessons
                  completed
                </p>

                <div className="w-full bg-gray-100 rounded-full h-3 mt-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${student.progressPercentage}%`,
                    }}
                  ></div>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  {student.progressPercentage}% complete
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default InstructorProgress;
