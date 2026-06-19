import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import PageActions from "../../components/common/PageActions";

import api from "../../api/api";

function TaskDetail() {

  const { id } =
    useParams();

  const navigate = useNavigate();

  const [task, setTask] =
    useState(null);

  const [status, setStatus] =
    useState("");

  useEffect(() => {

    fetchTask();

  }, []);

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
          "Task deleted successfully"
        );

        navigate(
          "/tasks"
        );

      } catch (error) {

        console.log(
          error.response?.data
        );
      }
    };

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

        setStatus(
          response.data.status
        );

      } catch (error) {

        console.log(error);
      }
    };

  const updateStatus =
    async () => {

      try {

        await api.patch(
          `tasks/${id}/status/`,
          {
            status,
          }
        );

        alert(
          "Task Status Updated"
        );

        fetchTask();

      } catch (error) {

        console.log(
          error.response?.data
        );
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

  if (!task) {

    return (

      <MainLayout>

        Loading...

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <PageActions
        backPath="/tasks"
        backTitle="Tasks"
        editPath={`/tasks/${id}/edit`}
        onDelete={handleDelete}
      />

      <div
        className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
      "
      >

        <div
          className="
          flex
          justify-between
          items-center
          mb-8
        "
        >

          <h1
            className="
            text-4xl
            font-bold
            text-red-700
          "
          >
            {task.title}
          </h1>

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

        </div>

        <div
          className="
          grid
          md:grid-cols-2
          gap-6
          mb-8
        "
        >

          <div
            className="
            bg-red-50
            p-5
            rounded-xl
          "
          >

            <p
              className="
              font-semibold
              mb-2
            "
            >
              Customer
            </p>

            <p>
              {
                task.customer_name
              }
            </p>

          </div>

          <div
            className="
            bg-red-50
            p-5
            rounded-xl
          "
          >

            <p
              className="
              font-semibold
              mb-2
            "
            >
              Assigned To
            </p>

            <p>
              {
                task.assigned_to_name
              }
            </p>

          </div>

          <div
            className="
            bg-red-50
            p-5
            rounded-xl
          "
          >

            <p
              className="
              font-semibold
              mb-2
            "
            >
              Task Type
            </p>

            <p>
              {task.task_type}
            </p>

          </div>

          <div
            className="
            bg-red-50
            p-5
            rounded-xl
          "
          >

            <p
              className="
              font-semibold
              mb-2
            "
            >
              Due Date
            </p>

            <p>
              {task.due_date}
            </p>

          </div>

        </div>

        <div
          className="
          bg-gray-50
          p-6
          rounded-xl
          mb-8
        "
        >

          <h2
            className="
            text-xl
            font-bold
            mb-3
          "
          >
            Description
          </h2>

          <p>
            {
              task.description ||
              "No Description"
            }
          </p>

        </div>

        <div>

          <h2
            className="
            text-xl
            font-bold
            mb-4
          "
          >
            Update Status
          </h2>

          <div
            className="
            flex
            gap-3
          "
          >

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="
              border
              border-red-200

              p-3

              rounded-xl
            "
            >

              <option
                value="PENDING"
              >
                PENDING
              </option>

              <option
                value="IN_PROGRESS"
              >
                IN PROGRESS
              </option>

              <option
                value="COMPLETED"
              >
                COMPLETED
              </option>

            </select>

            <button
              onClick={
                updateStatus
              }
              className="
              bg-red-600
              hover:bg-red-700

              text-white

              px-5

              rounded-xl
            "
            >
              Update
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default TaskDetail;