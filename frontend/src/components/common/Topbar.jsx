import {
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

function Topbar() {

  const username =
    localStorage.getItem(
      "username"
    );

  const role =
    localStorage.getItem(
      "role"
    );

  const handleLogout = () => {

    localStorage.clear();

    window.location.href =
      "/login";
  };

  return (

    <div
      className="
      h-20
      bg-white
      border-b
      border-red-100
      px-8
      flex
      items-center
      justify-between
      shadow-sm
    "
    >

      {/* Left Section */}

      <div>

        <h2
          className="
          text-2xl
          font-bold
          text-gray-800
        "
        >
          Welcome, {username}
        </h2>

        <p
          className="
          text-sm
          text-red-600
          font-medium
          mt-1
        "
        >
          {role}
        </p>

      </div>

      {/* Right Section */}

      <div
        className="
        flex
        items-center
        gap-5
      "
      >

        <div className="relative">

          <FaBell
            className="
            text-red-600
            text-2xl
            cursor-pointer
          "
          />

          <span
            className="
            absolute
            -top-2
            -right-2

            bg-red-600
            text-white

            text-xs

            w-5
            h-5

            rounded-full

            flex
            items-center
            justify-center
          "
          >
            3
          </span>

        </div>

        <div
          className="
          flex
          items-center
          gap-2
        "
        >

          <FaUserCircle
            className="
            text-red-600
            text-4xl
          "
          />

          <div>

            <p
              className="
              text-sm
              font-semibold
              text-gray-800
            "
            >
              {username}
            </p>

            <p
              className="
              text-xs
              text-gray-500
            "
            >
              {role}
            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="
          bg-red-600
          hover:bg-red-700

          text-white

          px-4
          py-2

          rounded-lg

          transition-all
        "
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Topbar;