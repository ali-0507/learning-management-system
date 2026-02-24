import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/courses", {
        title,
        description,
      });

      if (res.data.success) {
        alert("Course created successfully");
        navigate("/instructor");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error creating course");
    }
  };

  return (
    <>
      <Navbar />
       <button
            onClick={() => navigate(-1)}
            className="mt-4 mb-2 mr-180 text-blue-600 hover:underline"
          >
            ← Back
          </button>
      <div className="flex justify-center mt-2">
      
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl border shadow-sm w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">Create New Course</h2>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
           className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl transition duration-200 font-medium"
          >
            Create Course
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateCourse;
