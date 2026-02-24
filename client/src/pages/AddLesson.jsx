import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function AddLesson() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "text",
    content: "",
    order: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post(`/lessons/${courseId}`, formData);
      alert("Lesson added successfully");
      navigate("/instructor");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add lesson");
    }
  };

  return (
    <>
      <Navbar />
      <button
          onClick={() => navigate(-1)}
          className="mt-4 mr-180 text-blue-600 hover:underline"
          >
          ← Back
        </button>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add Lesson</h1>
        
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border shadow-sm w-full max-w-md">
          <input
            type="text"
            name="title"
            placeholder="Lesson Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="text">Text</option>
            <option value="video">Video</option>
          </select>

          <textarea
            name="content"
            placeholder={
              formData.type === "video" ? "Paste video URL" : "Lesson Content"
            }
            value={formData.content}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <input
            type="number"
            name="order"
            placeholder="Lesson Order"
            value={formData.order}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl transition duration-200 font-medium"
          >
            Add Lesson
          </button>
        </form>
      </div>
    </>
  );
}

export default AddLesson;
