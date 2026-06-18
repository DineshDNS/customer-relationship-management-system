import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import MainLayout from
"../../layouts/MainLayout";

import BackButton from
"../../components/common/BackButton";

import api from
"../../api/api";

function UserDetail() {

  const { id } =
    useParams();

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    fetchUser();

  }, []);

  const fetchUser =
    async () => {

      try {

        const response =
          await api.get(
            `auth/users/${id}/`
          );

        setUser(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  if (!user) {

    return (
      <MainLayout>
        Loading...
      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <BackButton
        path="/users"
        title="Users"
      />

      <div
        className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
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
          {user.username}
        </h1>

        <div
          className="
          grid
          md:grid-cols-2
          gap-6
        "
        >

          <div
            className="
            bg-red-50
            p-5
            rounded-xl
          "
          >
            <p className="font-semibold">
              Email
            </p>

            <p>
              {user.email}
            </p>
          </div>

          <div
            className="
            bg-red-50
            p-5
            rounded-xl
          "
          >
            <p className="font-semibold">
              Phone
            </p>

            <p>
              {user.phone}
            </p>
          </div>

          <div
            className="
            bg-red-50
            p-5
            rounded-xl
          "
          >
            <p className="font-semibold">
              Role
            </p>

            <p>
              {user.role}
            </p>
          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default UserDetail;