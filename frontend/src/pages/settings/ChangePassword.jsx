import {
  useState,
} from "react";

import MainLayout from
  "../../layouts/MainLayout";

import BackButton from
  "../../components/common/BackButton";

import api from
  "../../api/api";

function ChangePassword() {

  const [formData,
    setFormData] =
    useState({

      old_password: "",

      new_password: "",

      confirm_password: "",
    });

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

      if (

        formData.new_password
        !==
        formData.confirm_password

      ) {

        alert(
          "Passwords do not match"
        );

        return;
      }

      try {

        await api.post(

          "auth/change-password/",

          {

            old_password:
              formData.old_password,

            new_password:
              formData.new_password,
          }
        );

        alert(
          "Password Changed Successfully"
        );

        setFormData({

          old_password: "",

          new_password: "",

          confirm_password: "",
        });

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
          Change Password
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
              Current Password
            </label>

            <input
              type="password"
              name="old_password"
              value={
                formData.old_password
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
              New Password
            </label>

            <input
              type="password"
              name="new_password"
              value={
                formData.new_password
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
              Confirm Password
            </label>

            <input
              type="password"
              name="confirm_password"
              value={
                formData.confirm_password
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
            Change Password
          </button>

        </form>

      </div>

    </MainLayout>
  );
}

export default ChangePassword;