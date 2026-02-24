import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

 return (
  <div className="bg-white shadow-md border-b">
    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      
      <h1 className="text-xl font-bold text-gray-800 tracking-wide">
        LMS
      </h1>

      {user && (
        <div className="flex gap-6 items-center">
            <span className="text-gray-700 font-medium">
            {user.name}
          </span>
          {user.role === "student" && (
            <>
            <Link to="/student"
              className="text-gray-600 hover:text-blue-600 transition">
               Student  Dashboard
            </Link>
            <Link
              to="/courses"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Explore Courses
            </Link>
            </>
          )}

          {user.role === "instructor" && (
            <Link
              to="/instructor"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Instructor Dashboard
            </Link>
          )}
   
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
  );
}

export default Navbar;
