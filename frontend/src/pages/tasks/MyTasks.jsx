import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import ModuleNav from "../../components/common/ModuleNav";

import {
  TASKS_NAV,
} from "../../theme/tasksNav";

import api from "../../api/api";

function MyTasks() {

  const [tasks, setTasks] =
    useState([]);

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks =
    async () => {

      try {

        const response =
          await api.get(
            "tasks/my-tasks/"
          );

        setTasks(
          Array.isArray(
            response.data
          )
            ? response.data
            : response.data.results || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  const getStatusBadge =
    (status) => {

      switch (status) {

        case "COMPLETED":

          return `
            bg-green-100
            text-green-700
          `;

        case "IN_PROGRESS":

          return `
            bg-yellow-100
            text-yellow-700
          `;

        default:

          return `
            bg-red-100
            text-red-700
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
          My Tasks
        </h1>

      </div>

      <ModuleNav
        items={TASKS_NAV}
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
                Title
              </th>

              <th className="p-4">
                Customer
              </th>

              <th className="p-4">
                Type
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Due Date
              </th>

              <th className="p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {tasks.map(
              (task) => (

                <tr
                  key={task.id}
                  className="
                  border-b
                  hover:bg-red-50
                "
                >

                  <td className="p-4">
                    {task.title}
                  </td>

                  <td className="p-4">
                    {
                      task.customer_name
                    }
                  </td>

                  <td className="p-4">
                    {
                      task.task_type
                    }
                  </td>

                  <td className="p-4">

                    <span
                      className={`
                        px-3
                        py-1

                        rounded-full

                        text-sm
                        font-semibold

                        ${getStatusBadge(
                          task.status
                        )}
                      `}
                    >
                      {task.status}
                    </span>

                  </td>

                  <td className="p-4">
                    {task.due_date}
                  </td>

                  <td className="p-4">

                    <Link
                      to={`/tasks/${task.id}`}
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

export default MyTasks;