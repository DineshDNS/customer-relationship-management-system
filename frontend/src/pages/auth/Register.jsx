import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUserTag,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import api from "../../api/api";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({

      first_name: "",

      username: "",

      email: "",

      phone: "",

      role: "SALES_EXECUTIVE",

      password: "",

      confirm_password: "",
    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (
      formData.password !==
      formData.confirm_password
    ) {

      setError(
        "Passwords do not match."
      );

      return;
    }

    try {

      setLoading(true);

      await api.post(
        "auth/register/",
        formData
      );

      alert(
        "Registration Successful"
      );

      navigate(
        "/login"
      );

    } catch (error) {

      console.error(error);

      setError(
        "Registration Failed. Please try again."
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
        rounded-3xl
        shadow-2xl
        overflow-hidden
        w-full
        max-w-7xl
        grid
        md:grid-cols-2
      "
      >

        {/* Left Side */}

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
            text-xl
            text-center
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
            leading-relaxed
          "
          >
            Manage Customers,
            Leads, Deals,
            Tasks, Reports,
            Notifications and Revenue.
          </p>

        </div>

        {/* Right Side */}

        <div className="p-10">

          <h2
            className="
            text-4xl
            font-bold
            text-gray-800
            mb-2
          "
          >
            Create Account
          </h2>

          <p
            className="
            text-gray-500
            mb-8
          "
          >
            Register your CRM account
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
            className="
            grid
            grid-cols-1
            gap-4
          "
          >

            {/* Full Name */}

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
                name="first_name"
                placeholder="Full Name"
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

            {/* Username */}

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

            {/* Email */}

            <div className="relative">

              <FaEnvelope
                className="
                absolute
                top-4
                left-3
                text-red-500
              "
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
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

            {/* Phone */}

            <div className="relative">

              <FaPhone
                className="
                absolute
                top-4
                left-3
                text-red-500
              "
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
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

            {/* Role */}

            <div className="relative">

              <FaUserTag
                className="
                absolute
                top-4
                left-3
                text-red-500
              "
              />

              <select
                name="role"
                onChange={handleChange}
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
              >

                <option
                  value="SALES_EXECUTIVE"
                >
                  Sales Executive
                </option>

                <option
                  value="MANAGER"
                >
                  Manager
                </option>

              </select>

            </div>

            {/* Password */}

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
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="
                w-full
                border
                border-red-200
                rounded-xl
                pl-10
                pr-12
                p-3
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
              "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                absolute
                right-4
                top-4
                text-gray-500
              "
              >
                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </button>

            </div>

            {/* Confirm Password */}

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
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
                className="
                w-full
                border
                border-red-200
                rounded-xl
                pl-10
                pr-12
                p-3
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
              "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="
                absolute
                right-4
                top-4
                text-gray-500
              "
              >
                {showConfirmPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </button>

            </div>

            {/* Submit */}

            <button
              disabled={loading}
              className="
              bg-red-600
              hover:bg-red-700
              text-white
              p-3
              rounded-xl
              shadow-lg
              transition-all
            "
            >

              {loading
                ? "Creating Account..."
                : "Create Account"}

            </button>

          </form>

          <p
            className="
            mt-6
            text-center
            text-gray-600
          "
          >

            Already have an account?

            <Link
              to="/login"
              className="
              text-red-600
              font-semibold
              ml-2
            "
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;