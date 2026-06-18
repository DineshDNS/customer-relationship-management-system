import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import api from "../../api/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        "auth/login/",
        formData
      );

      localStorage.setItem(
        "accessToken",
        response.data.access
      );

      localStorage.setItem(
        "refreshToken",
        response.data.refresh
      );

      const profile = await api.get(
        "auth/profile/"
      );

      localStorage.setItem(
        "username",
        profile.data.username
      );

      localStorage.setItem(
        "role",
        profile.data.role
      );

      navigate("/dashboard");

    } catch {
      setError(
        "Invalid username or password"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-red-700
        via-red-600
        to-red-800
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        className="
          bg-white/95
          backdrop-blur-md
          shadow-2xl
          rounded-3xl
          overflow-hidden
          w-full
          max-w-6xl
          grid
          md:grid-cols-2
        "
      >
        {/* Left Panel */}
        <div
          className="
            hidden
            md:flex
            flex-col
            justify-center
            items-center
            bg-gradient-to-b
            from-red-800
            to-red-950
            text-white
            p-10
          "
        >
          <div
            className="
              w-24
              h-24
              rounded-full
              bg-white/20
              flex
              items-center
              justify-center
              mb-6
            "
          >
            <span className="text-5xl">
              🚀
            </span>
          </div>

          <h1
            className="
              text-5xl
              font-extrabold
              mb-4
            "
          >
            CRM PRO
          </h1>

          <p
            className="
              text-lg
              text-center
              leading-relaxed
            "
          >
            Customer Relationship
            Management System
          </p>

          <p
            className="
              mt-4
              text-center
              text-red-200
            "
          >
            Manage Customers,
            Leads, Deals,
            Tasks and Revenue
          </p>
        </div>

        {/* Right Panel */}
        <div className="p-10">
          <h2
            className="
              text-4xl
              font-bold
              text-gray-800
              mb-2
            "
          >
            Welcome Back
          </h2>

          <p
            className="
              text-gray-500
              mb-8
            "
          >
            Sign in to continue
          </p>

          {error && (
            <div
              className="
                bg-red-100
                text-red-600
                p-3
                rounded-xl
                mb-5
              "
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="relative">
              <FaUser
                className="
                  absolute
                  top-4
                  left-3
                  text-red-500
                "
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="
                  w-full
                  border
                  border-red-200
                  rounded-xl
                  pl-10
                  p-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-500
                "
              />
            </div>

            <div className="relative">
              <FaLock
                className="
                  absolute
                  top-4
                  left-3
                  text-red-500
                "
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="
                  w-full
                  border
                  border-red-200
                  rounded-xl
                  pl-10
                  p-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-500
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-red-600
                hover:bg-red-700
                text-white
                p-3
                rounded-xl
                shadow-lg
                transition-all
                disabled:opacity-50
              "
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>
          </form>

          <p
            className="
              mt-6
              text-center
              text-gray-600
            "
          >
            Don't have an account?

            <Link
              to="/register"
              className="
                text-red-600
                font-semibold
                ml-2
              "
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;