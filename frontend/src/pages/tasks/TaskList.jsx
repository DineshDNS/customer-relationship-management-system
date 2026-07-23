import {
  useEffect,
  useMemo,
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

function TaskList() {

  const role =
    localStorage.getItem(
      "role"
    );

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("ALL");

  const [typeFilter,
    setTypeFilter] =
    useState("ALL");

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks =
    async () => {

      setLoading(true);

      try {

        const response =
          await api.get(
            "tasks/"
          );

        const data =

          Array.isArray(
            response.data
          )

            ? response.data

            : response.data.results || [];

        setTasks(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const filteredTasks =
    useMemo(() => {

      return tasks.filter(
        (task) => {

          const matchSearch =

            task.title
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            task.customer_name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchStatus =

            statusFilter ===
            "ALL"

            ||

            task.status ===
            statusFilter;

          const matchType =

            typeFilter ===
            "ALL"

            ||

            task.task_type ===
            typeFilter;

          return (

            matchSearch

            &&

            matchStatus

            &&

            matchType

          );

        }

      );

    }, [

      tasks,

      search,

      statusFilter,

      typeFilter,

    ]);

  const stats = {

    total:

      tasks.length,

    pending:

      tasks.filter(

        (task) =>

          task.status ===
          "PENDING"

      ).length,

    progress:

      tasks.filter(

        (task) =>

          task.status ===
          "IN_PROGRESS"

      ).length,

    completed:

      tasks.filter(

        (task) =>

          task.status ===
          "COMPLETED"

      ).length,

  };

  const getStatusBadge =
    (status) => {

      switch (status) {

        case "COMPLETED":

          return "bg-green-100 text-green-700";

        case "IN_PROGRESS":

          return "bg-yellow-100 text-yellow-700";

        default:

          return "bg-red-100 text-red-700";

      }

    };

  const getTaskTypeBadge =
    (type) => {

      switch (type) {

        case "CALL":

          return "bg-blue-100 text-blue-700";

        case "MEETING":

          return "bg-purple-100 text-purple-700";

        case "FOLLOW_UP":

          return "bg-orange-100 text-orange-700";

        case "EMAIL":

          return "bg-cyan-100 text-cyan-700";

        default:

          return "bg-gray-100 text-gray-700";

      }

    };

  const isOverdue =
    (
      dueDate,
      status
    ) => {

      if (
        status ===
        "COMPLETED"
      ) {

        return false;

      }

      return (
        new Date(dueDate) <
        new Date()
      );

    };

  const dueToday =

    tasks.filter(

      (task) => {

        const today =

          new Date()

            .toISOString()

            .split("T")[0];

        return (

          task.due_date ===
          today

        );

      }

    ).length;

  const overdue =

    tasks.filter(

      (task) =>

        isOverdue(

          task.due_date,

          task.status

        )

    ).length;

    return (

    <MainLayout>

      {/* Header */}

      <div
        className="
        flex

        flex-col

        lg:flex-row

        lg:justify-between

        lg:items-center

        gap-5

        mb-6
      "
      >

        <div>

          <h1
            className="
            text-3xl

            font-bold

            text-gray-800
          "
          >
            Task Management
          </h1>

          <p
            className="
            text-gray-500

            mt-1
          "
          >
            Manage, assign and monitor all CRM tasks.
          </p>

        </div>

        <Link

          to="/tasks/create"

          className="
          bg-red-600

          hover:bg-red-700

          text-white

          px-6

          py-3

          rounded-xl

          font-semibold

          transition-all
        "
        >

          + Create Task

        </Link>

      </div>

      {/* Navigation */}

      <ModuleNav

        items={TASKS_NAV}

      />

      {/* Dashboard */}

      <div
        className="
        grid

        grid-cols-2

        lg:grid-cols-6

        gap-5

        my-6
      "
      >

        <div
          className="
          bg-white

          rounded-2xl

          shadow

          p-5
        "
        >

          <p className="text-gray-500 text-sm">

            Total

          </p>

          <h2
            className="
            text-3xl

            font-bold

            mt-2
          "
          >

            {stats.total}

          </h2>

        </div>

        <div
          className="
          bg-white

          rounded-2xl

          shadow

          p-5
        "
        >

          <p className="text-gray-500 text-sm">

            Pending

          </p>

          <h2
            className="
            text-3xl

            font-bold

            text-red-600

            mt-2
          "
          >

            {stats.pending}

          </h2>

        </div>

        <div
          className="
          bg-white

          rounded-2xl

          shadow

          p-5
        "
        >

          <p className="text-gray-500 text-sm">

            In Progress

          </p>

          <h2
            className="
            text-3xl

            font-bold

            text-yellow-600

            mt-2
          "
          >

            {stats.progress}

          </h2>

        </div>

        <div
          className="
          bg-white

          rounded-2xl

          shadow

          p-5
        "
        >

          <p className="text-gray-500 text-sm">

            Completed

          </p>

          <h2
            className="
            text-3xl

            font-bold

            text-green-600

            mt-2
          "
          >

            {stats.completed}

          </h2>

        </div>

        <div
          className="
          bg-white

          rounded-2xl

          shadow

          p-5
        "
        >

          <p className="text-gray-500 text-sm">

            Due Today

          </p>

          <h2
            className="
            text-3xl

            font-bold

            text-blue-600

            mt-2
          "
          >

            {dueToday}

          </h2>

        </div>

        <div
          className="
          bg-white

          rounded-2xl

          shadow

          p-5
        "
        >

          <p className="text-gray-500 text-sm">

            Overdue

          </p>

          <h2
            className="
            text-3xl

            font-bold

            text-red-700

            mt-2
          "
          >

            {overdue}

          </h2>

        </div>

      </div>

      {/* Search & Filters */}

      <div
        className="
        bg-white

        rounded-2xl

        shadow

        p-5

        mb-6

        flex

        flex-col

        lg:flex-row

        gap-4
      "
      >

        <input

          type="text"

          value={search}

          placeholder="Search by task title or customer..."

          onChange={(e)=>

            setSearch(

              e.target.value

            )

          }

          className="
          flex-1

          border

          border-red-200

          rounded-xl

          p-3

          focus:outline-none

          focus:ring-2

          focus:ring-red-500
        "
        />

        <select

          value={statusFilter}

          onChange={(e)=>

            setStatusFilter(

              e.target.value

            )

          }

          className="
          border

          border-red-200

          rounded-xl

          p-3
        "
        >

          <option value="ALL">

            All Status

          </option>

          <option value="PENDING">

            Pending

          </option>

          <option value="IN_PROGRESS">

            In Progress

          </option>

          <option value="COMPLETED">

            Completed

          </option>

        </select>

        <select

          value={typeFilter}

          onChange={(e)=>

            setTypeFilter(

              e.target.value

            )

          }

          className="
          border

          border-red-200

          rounded-xl

          p-3
        "
        >

          <option value="ALL">

            All Types

          </option>

          <option value="CALL">

            Call

          </option>

          <option value="MEETING">

            Meeting

          </option>

          <option value="FOLLOW_UP">

            Follow Up

          </option>

          <option value="EMAIL">

            Email

          </option>

        </select>

      </div>

      {/* Task Table */}

      <div
        className="
        bg-white

        rounded-2xl

        shadow-md

        overflow-hidden
      "
      ></div>

              {

          loading ? (

            <div
              className="
              p-12

              text-center
            "
            >

              <h2
                className="
                text-xl

                font-semibold

                text-gray-700
              "
              >
                Loading Tasks...
              </h2>

            </div>

          ) : filteredTasks.length === 0 ? (

            <div
              className="
              p-12

              text-center
            "
            >

              <h2
                className="
                text-2xl

                font-bold
              "
              >
                No Tasks Found
              </h2>

              <p
                className="
                text-gray-500

                mt-2
              "
              >
                Try changing the search or filters.
              </p>

            </div>

          ) : (

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

                  <th className="p-4 text-left">

                    Title

                  </th>

                  <th className="p-4 text-left">

                    Customer

                  </th>

                  <th className="p-4 text-left">

                    Assigned To

                  </th>

                  <th className="p-4 text-left">

                    Type

                  </th>

                  <th className="p-4 text-left">

                    Status

                  </th>

                  <th className="p-4 text-left">

                    Due Date

                  </th>

                  <th className="p-4 text-center">

                    Actions

                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  filteredTasks.map(

                    (task) => (

                      <tr

                        key={task.id}

                        className="
                        border-b

                        hover:bg-red-50

                        transition
                      "

                      >

                        <td className="p-4 font-medium">

                          {task.title}

                        </td>

                        <td className="p-4">

                          {task.customer_name}

                        </td>

                        <td className="p-4">

                          {task.assigned_to_name}

                        </td>

                        <td className="p-4">

                          <span
                            className={`
                              px-3

                              py-1

                              rounded-full

                              text-sm

                              font-semibold

                              ${getTaskTypeBadge(
                                task.task_type
                              )}
                            `}
                          >

                            {task.task_type}

                          </span>

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

                        <td
                          className={`
                            p-4

                            font-medium

                            ${
                              isOverdue(

                                task.due_date,

                                task.status

                              )

                              ?

                              "text-red-600"

                              :

                              "text-gray-700"

                            }
                          `}
                        >

                          {task.due_date}

                        </td>

                        <td className="p-4">

                          <div
                            className="
                            flex

                            justify-center

                            gap-3
                          "
                          >

                            <Link

                              to={`/tasks/${task.id}`}

                              className="
                              bg-blue-600

                              hover:bg-blue-700

                              text-white

                              px-4

                              py-2

                              rounded-lg

                              text-sm
                            "
                            >

                              View

                            </Link>

                            {

                              role !==
                              "SALES_EXECUTIVE"

                              &&

                              (

                                <Link

                                  to={`/tasks/${task.id}/edit`}

                                  className="
                                  bg-yellow-500

                                  hover:bg-yellow-600

                                  text-white

                                  px-4

                                  py-2

                                  rounded-lg

                                  text-sm
                                "
                                >

                                  Edit

                                </Link>

                              )

                            }

                          </div>

                        </td>

                      </tr>

                    )

                  )

                }

              </tbody>

            </table>

          )

        }

      </MainLayout>

  );

}

export default TaskList;