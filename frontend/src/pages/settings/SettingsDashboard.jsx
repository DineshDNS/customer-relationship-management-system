import { useNavigate } from "react-router-dom";

import MainLayout from
  "../../layouts/MainLayout";

import {
  FaUserCog,
  FaLock,
  FaCog,
  FaBell,
} from "react-icons/fa";

function SettingsDashboard() {

  const navigate =
    useNavigate();

  return (

    <MainLayout>

      <h1
        className="
        text-4xl
        font-bold
        mb-8
      "
      >
        Settings
      </h1>

      <div
        className="
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
      >

        {/* Profile Settings */}

        <div
          onClick={() =>
            navigate(
              "/settings/profile"
            )
          }
          className="
          bg-white
          p-8

          rounded-3xl

          shadow-md

          cursor-pointer

          hover:-translate-y-2
          hover:shadow-xl

          transition-all
          duration-300
        "
        >

          <FaUserCog
            className="
            text-red-600
            text-5xl
            mb-5
          "
          />

          <h2
            className="
            text-2xl
            font-bold
            mb-3
          "
          >
            Profile Settings
          </h2>

          <p
            className="
            text-gray-600
            text-lg
          "
          >
            Update your profile
            information.
          </p>

        </div>

        {/* Change Password */}

        <div
          onClick={() =>
            navigate(
              "/settings/password"
            )
          }
          className="
          bg-white
          p-8

          rounded-3xl

          shadow-md

          cursor-pointer

          hover:-translate-y-2
          hover:shadow-xl

          transition-all
          duration-300
        "
        >

          <FaLock
            className="
            text-blue-600
            text-5xl
            mb-5
          "
          />

          <h2
            className="
            text-2xl
            font-bold
            mb-3
          "
          >
            Change Password
          </h2>

          <p
            className="
            text-gray-600
            text-lg
          "
          >
            Secure your account
            by changing your
            password.
          </p>

        </div>

        {/* Notifications */}

        <div
          onClick={() =>
            navigate(
              "/settings/notifications"
            )
          }
          className="
          bg-white
          p-8

          rounded-3xl

          shadow-md

          cursor-pointer

          hover:-translate-y-2
          hover:shadow-xl

          transition-all
          duration-300
        "
        >

          <FaBell
            className="
            text-yellow-500
            text-5xl
            mb-5
          "
          />

          <h2
            className="
            text-2xl
            font-bold
            mb-3
          "
          >
            Notifications
          </h2>

          <p
            className="
            text-gray-600
            text-lg
          "
          >
            Manage notification
            preferences and alerts.
          </p>

        </div>

        {/* CRM Settings */}

        <div
          onClick={() =>
            navigate(
              "/settings/system"
            )
          }
          className="
          bg-white
          p-8

          rounded-3xl

          shadow-md

          cursor-pointer

          hover:-translate-y-2
          hover:shadow-xl

          transition-all
          duration-300
        "
        >

          <FaCog
            className="
            text-green-600
            text-5xl
            mb-5
          "
          />

          <h2
            className="
            text-2xl
            font-bold
            mb-3
          "
          >
            CRM Settings
          </h2>

          <p
            className="
            text-gray-600
            text-lg
          "
          >
            Configure CRM
            preferences and
            application options.
          </p>

        </div>

      </div>

    </MainLayout>
  );
}

export default SettingsDashboard;