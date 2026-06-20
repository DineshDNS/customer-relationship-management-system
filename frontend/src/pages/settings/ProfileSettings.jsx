import {
  useEffect,
  useState,
} from "react";

import MainLayout from
  "../../layouts/MainLayout";

import BackButton from
  "../../components/common/BackButton";

import api from
  "../../api/api";

function ProfileSettings() {

  const [formData,
    setFormData] =
    useState({

      username: "",

      first_name: "",

      last_name: "",

      email: "",
    });

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      try {

        const response =
          await api.get(
            "auth/profile/"
          );

        setFormData(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.put(

          "auth/profile/update/",

          formData
        );

        alert(
          "Profile Updated Successfully"
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <MainLayout>

      <BackButton
        path="/settings"
        title="Settings"
      />

      <div
        className="
        max-w-3xl
        mx-auto

        bg-white

        p-10

        rounded-3xl

        shadow-md
      "
      >

        <h1
          className="
          text-4xl
          font-bold
          text-red-700
          mb-8
        "
        >
          Profile Settings
        </h1>

        <form
          onSubmit={handleSubmit}
          className="
          space-y-6
        "
        >

          <div>

            <label
              className="
              block
              mb-2
              font-semibold
            "
            >
              Username
            </label>

            <input
              type="text"
              name="username"
              value={
                formData.username
              }
              onChange={
                handleChange
              }
              className="
              w-full

              border
              border-red-200

              p-4

              rounded-xl

              focus:outline-none
              focus:ring-2
              focus:ring-red-500
            "
            />

          </div>

          <div>

            <label
              className="
              block
              mb-2
              font-semibold
            "
            >
              First Name
            </label>

            <input
              type="text"
              name="first_name"
              value={
                formData.first_name
              }
              onChange={
                handleChange
              }
              className="
              w-full

              border
              border-red-200

              p-4

              rounded-xl

              focus:outline-none
              focus:ring-2
              focus:ring-red-500
            "
            />

          </div>

          <div>

            <label
              className="
              block
              mb-2
              font-semibold
            "
            >
              Last Name
            </label>

            <input
              type="text"
              name="last_name"
              value={
                formData.last_name
              }
              onChange={
                handleChange
              }
              className="
              w-full

              border
              border-red-200

              p-4

              rounded-xl

              focus:outline-none
              focus:ring-2
              focus:ring-red-500
            "
            />

          </div>

          <div>

            <label
              className="
              block
              mb-2
              font-semibold
            "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              className="
              w-full

              border
              border-red-200

              p-4

              rounded-xl

              focus:outline-none
              focus:ring-2
              focus:ring-red-500
            "
            />

          </div>

          <button
            className="
            bg-red-600
            hover:bg-red-700

            text-white

            px-8
            py-4

            rounded-xl

            font-semibold

            transition-all
          "
          >
            Update Profile
          </button>

        </form>

      </div>

    </MainLayout>
  );
}

export default ProfileSettings;