import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const res = await api.post("/auth/login", formData);

      if (res.data.success) {
        login(res.data.data); 

        if (res.data.data.role === "student") {
          navigate("/student");
        } else {
          navigate("/instructor");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl border shadow-sm w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />

        <button
          type="submit"
         className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl transition duration-200 font-medium"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;