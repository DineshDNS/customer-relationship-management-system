import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import PageActions from "../../components/common/PageActions";

import api from "../../api/api";

function TaskDetail() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const role =
    localStorage.getItem(
      "role"
    );

  const [task, setTask] =
    useState(null);

  const [status, setStatus] =
    useState("");

  useEffect(() => {

    fetchTask();

  }, []);

  // ===========================
  // Get Next Allowed Statuses
  // ===========================

  const getNextStatuses =
    (currentStatus) => {

      switch (currentStatus) {

        case "PENDING":

          return [
            "IN_PROGRESS",
          ];

        case "IN_PROGRESS":

          return [
            "COMPLETED",
          ];

        default:

          return [];

      }

    };

  // ===========================
  // Fetch Task
  // ===========================

  const fetchTask =
    async () => {

      try {

        const response =
          await api.get(
            `tasks/${id}/`
          );

        setTask(
          response.data
        );

        const nextStatuses =
          getNextStatuses(
            response.data.status
          );

        setStatus(

          nextStatuses.length

            ?

            nextStatuses[0]

            :

            ""

        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // ===========================
  // Delete Task
  // ===========================

  const handleDelete =
    async () => {

      if (

        !window.confirm(
          "Delete this task?"
        )

      ) return;

      try {

        await api.delete(
          `tasks/${id}/`
        );

        alert(
          "Task deleted successfully."
        );

        navigate(
          "/tasks"
        );

      }

      catch (error) {

        console.log(
          error.response?.data
        );

      }

    };

  // ===========================
  // Update Status
  // ===========================

  const updateStatus =
    async () => {

      if (!status) {

        alert(
          "Please select the next status."
        );

        return;

      }

      try {

        await api.patch(

          `tasks/${id}/status/`,

          {
            status,
          }

        );

        alert(
          "Task status updated successfully."
        );

        fetchTask();

      }

      catch (error) {

        console.log(
          error.response?.data
        );

        alert(

          error.response?.data?.error ||

          "Unable to update task."

        );

      }

    };

  // ===========================
  // Status Badge
  // ===========================

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

  // ===========================
  // Task Type Badge
  // ===========================

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

  // ===========================
  // Loading
  // ===========================

  if (!task) {

    return (

      <MainLayout>

        <div
          className="
          p-10

          text-center

          text-xl
        "
        >

          Loading Task...

        </div>

      </MainLayout>

    );

  }
    return (

    <MainLayout>

      <PageActions

        backPath="/tasks"

        backTitle="Tasks"

        editPath={
          role !== "SALES_EXECUTIVE"
            ? `/tasks/${id}/edit`
            : null
        }

        onDelete={
          role !== "SALES_EXECUTIVE"
            ? handleDelete
            : null
        }

      />

      {/* Header */}

      <div
        className="
        bg-white

        rounded-3xl

        shadow-md

        p-8

        mb-6
      "
      >

        <div
          className="
          flex

          flex-col

          lg:flex-row

          lg:justify-between

          lg:items-center

          gap-5
        "
        >

          <div>

            <h1
              className="
              text-4xl

              font-bold

              text-gray-800
            "
            >
              {task.title}
            </h1>

            <p
              className="
              text-gray-500

              mt-2
            "
            >
              Task Details
            </p>

          </div>

          <div
            className="
            flex

            gap-3

            flex-wrap
          "
          >

            <span
              className={`
                px-4

                py-2

                rounded-full

                font-semibold

                ${getStatusBadge(
                  task.status
                )}
              `}
            >
              {task.status}
            </span>

            <span
              className={`
                px-4

                py-2

                rounded-full

                font-semibold

                ${getTaskTypeBadge(
                  task.task_type
                )}
              `}
            >
              {task.task_type}
            </span>

          </div>

        </div>

      </div>

      {/* Information Cards */}

      <div
        className="
        grid

        md:grid-cols-2

        lg:grid-cols-3

        gap-6

        mb-8
      "
      >

        <div
          className="
          bg-red-50

          rounded-2xl

          p-6
        "
        >

          <h3
            className="
            font-bold

            mb-2

            text-red-700
          "
          >
            Customer
          </h3>

          <p>
            {task.customer_name}
          </p>

        </div>

        <div
          className="
          bg-red-50

          rounded-2xl

          p-6
        "
        >

          <h3
            className="
            font-bold

            mb-2

            text-red-700
          "
          >
            Assigned To
          </h3>

          <p>
            {task.assigned_to_name}
          </p>

        </div>

        <div
          className="
          bg-red-50

          rounded-2xl

          p-6
        "
        >

          <h3
            className="
            font-bold

            mb-2

            text-red-700
          "
          >
            Created By
          </h3>

          <p>
            {task.created_by_name}
          </p>

        </div>

        <div
          className="
          bg-red-50

          rounded-2xl

          p-6
        "
        >

          <h3
            className="
            font-bold

            mb-2

            text-red-700
          "
          >
            Due Date
          </h3>

          <p>
            {task.due_date}
          </p>

        </div>

        <div
          className="
          bg-red-50

          rounded-2xl

          p-6
        "
        >

          <h3
            className="
            font-bold

            mb-2

            text-red-700
          "
          >
            Created At
          </h3>

          <p>

            {new Date(
              task.created_at
            ).toLocaleString()}

          </p>

        </div>

        <div
          className="
          bg-red-50

          rounded-2xl

          p-6
        "
        >

          <h3
            className="
            font-bold

            mb-2

            text-red-700
          "
          >
            Updated At
          </h3>

          <p>

            {new Date(
              task.updated_at
            ).toLocaleString()}

          </p>

        </div>

      </div>
            {/* Description */}

      <div
        className="
        bg-white

        rounded-3xl

        shadow-md

        p-8

        mb-8
      "
      >

        <h2
          className="
          text-2xl

          font-bold

          text-gray-800

          mb-5
        "
        >
          Description
        </h2>

        <div
          className="
          bg-gray-50

          rounded-2xl

          p-5

          min-h-[140px]
        "
        >

          {

            task.description

            ?

            (

              <p
                className="
                leading-8

                text-gray-700
              "
              >

                {task.description}

              </p>

            )

            :

            (

              <p
                className="
                italic

                text-gray-400
              "
              >

                No description available.

              </p>

            )

          }

        </div>

      </div>

      {/* Status Workflow */}

      <div
        className="
        bg-white

        rounded-3xl

        shadow-md

        p-8
      "
      >

        <h2
          className="
          text-2xl

          font-bold

          text-gray-800

          mb-2
        "
        >
          Task Workflow
        </h2>

        <p
          className="
          text-gray-500

          mb-6
        "
        >
          Update the task to its next workflow stage.
        </p>

        <div
          className="
          flex

          flex-col

          lg:flex-row

          gap-5

          items-start

          lg:items-center
        "
        >

          <div
            className="
            flex-1
          "
          >

            <label
              className="
              block

              font-semibold

              mb-2
            "
            >
              Next Status
            </label>

            <select

              value={status}

              onChange={(e)=>

                setStatus(
                  e.target.value
                )

              }

              disabled={
                task.status ===
                "COMPLETED"
              }

              className="
              w-full

              border

              border-red-200

              rounded-xl

              px-4

              py-3

              focus:ring-2

              focus:ring-red-500

              outline-none

              disabled:bg-gray-100

              disabled:cursor-not-allowed
            "
            >

              {

                task.status ===
                "COMPLETED"

                ?

                (

                  <option>

                    Task Completed

                  </option>

                )

                :

                (

                  getNextStatuses(

                    task.status

                  ).map(

                    (nextStatus)=>(

                      <option

                        key={nextStatus}

                        value={nextStatus}

                      >

                        {

                          nextStatus.replace(

                            "_",

                            " "

                          )

                        }

                      </option>

                    )

                  )

                )

              }

            </select>

          </div>

          <div
            className="
            pt-7
          "
          >

            <button

              onClick={updateStatus}

              disabled={

                task.status ===
                "COMPLETED"

              }

              className="
              bg-red-600

              hover:bg-red-700

              disabled:bg-gray-400

              disabled:cursor-not-allowed

              text-white

              px-8

              py-3

              rounded-xl

              font-semibold

              transition-all
            "
            >

              Update Status

            </button>

          </div>

        </div>

        {/* Workflow */}

        <div
          className="
          mt-10

          border-t

          pt-6
        "
        >

          <h3
            className="
            font-semibold

            mb-4
          "
          >
            Workflow
          </h3>

          <div
            className="
            flex

            items-center

            gap-4

            flex-wrap
          "
          >

            <div
              className="
              px-4

              py-2

              rounded-full

              bg-red-100

              text-red-700

              font-semibold
            "
            >
              Pending
            </div>

            <span className="text-gray-400">
              →
            </span>

            <div
              className="
              px-4

              py-2

              rounded-full

              bg-yellow-100

              text-yellow-700

              font-semibold
            "
            >
              In Progress
            </div>

            <span className="text-gray-400">
              →
            </span>

            <div
              className="
              px-4

              py-2

              rounded-full

              bg-green-100

              text-green-700

              font-semibold
            "
            >
              Completed
            </div>

          </div>

        </div>

      </div>
          </MainLayout>

  );

}

export default TaskDetail;