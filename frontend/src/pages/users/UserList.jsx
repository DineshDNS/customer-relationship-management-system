import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import MainLayout from
"../../layouts/MainLayout";

import ModuleNav from
"../../components/common/ModuleNav";

import {
  USERS_NAV,
} from "../../theme/usersNav";

import api from
"../../api/api";

function UserList() {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
    async () => {

      try {

        const response =
          await api.get(
            "auth/users/"
          );

        setUsers(
          Array.isArray(response.data)
            ? response.data
            : response.data.results || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  const getRoleBadge =
    (role) => {

      switch (role) {

        case "ADMIN":

          return `
            bg-red-100
            text-red-700
          `;

        case "MANAGER":

          return `
            bg-blue-100
            text-blue-700
          `;

        default:

          return `
            bg-green-100
            text-green-700
          `;
      }
    };

  return (

    <MainLayout>

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
      "
      >

        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Users
        </h1>

      </div>

      <ModuleNav
        items={USERS_NAV}
      />

      <div
        className="
        bg-white
        rounded-2xl
        shadow-md
        overflow-hidden
      "
      >

        <table
          className="
          w-full
        "
        >

          <thead>

            <tr
              className="
              bg-red-600
              text-white
            "
            >

              <th className="p-4">
                Username
              </th>

              <th className="p-4">
                Email
              </th>

              <th className="p-4">
                Phone
              </th>

              <th className="p-4">
                Role
              </th>

              <th className="p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map(
              (user) => (

                <tr
                  key={user.id}
                  className="
                  border-b
                  hover:bg-red-50
                "
                >

                  <td className="p-4">
                    {user.username}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">
                    {user.phone}
                  </td>

                  <td className="p-4">

                    <span
                      className={`
                        px-3
                        py-1

                        rounded-full

                        text-sm
                        font-semibold

                        ${getRoleBadge(
                          user.role
                        )}
                      `}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="p-4">

                    <Link
                      to={`/users/${user.id}`}
                      className="
                      text-red-600
                      font-semibold
                    "
                    >
                      View
                    </Link>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}

export default UserList;