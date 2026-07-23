import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import BackButton from "../../components/common/BackButton";

import api from "../../api/api";

function TaskUpdate() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(true);

  const [customers,
    setCustomers] =
    useState([]);

  const [users,
    setUsers] =
    useState([]);

  const [formData,
    setFormData] =
    useState({

      title: "",

      description: "",

      customer: "",

      assigned_to: "",

      task_type: "CALL",

      status: "PENDING",

      due_date: "",

    });

  useEffect(() => {

    fetchTask();

    fetchCustomers();

    fetchUsers();

  }, []);

  const fetchTask =
    async () => {

      try {

        const response =
          await api.get(
            `tasks/${id}/`
          );

        setFormData({

          title:
            response.data.title,

          description:
            response.data.description || "",

          customer:
            response.data.customer,

          assigned_to:
            response.data.assigned_to,

          task_type:
            response.data.task_type,

          status:
            response.data.status,

          due_date:
            response.data.due_date,

        });

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

  const fetchCustomers =
    async () => {

      try {

        const response =
          await api.get(
            "customers/"
          );

        setCustomers(

          Array.isArray(
            response.data
          )

          ?

          response.data

          :

          response.data.results || []

        );

      }

      catch (error) {

        console.log(error);

      }

    };

  const fetchUsers =
    async () => {

      try {

        const response =
          await api.get(
            "auth/users/"
          );

        setUsers(

          Array.isArray(
            response.data
          )

          ?

          response.data

          :

          response.data.results || []

        );

      }

      catch (error) {

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

          `tasks/${id}/`,

          formData

        );

        alert(
          "Task updated successfully."
        );

        navigate(
          `/tasks/${id}`
        );

      }

      catch (error) {

        console.log(
          error.response?.data
        );

      }

    };

      if (loading) {

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

      <BackButton

        path={`/tasks/${id}`}

        title="Task Details"

      />

      <div
        className="
        flex

        justify-between

        items-center

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
            Update Task
          </h1>

          <p
            className="
            text-gray-500

            mt-1
          "
          >
            Modify task information and assignment.
          </p>

        </div>

      </div>

      <form

        onSubmit={handleSubmit}

        className="
        bg-white

        rounded-3xl

        shadow-md

        p-8

        space-y-6
      "
      >

        {/* Title */}

        <div>

          <label
            className="
            block

            mb-2

            font-semibold
          "
          >
            Task Title
          </label>

          <input

            type="text"

            name="title"

            value={formData.title}

            onChange={handleChange}

            required

            className="
            w-full

            border

            border-red-200

            rounded-xl

            p-3

            focus:ring-2

            focus:ring-red-500

            outline-none
          "
          />

        </div>

        {/* Description */}

        <div>

          <label
            className="
            block

            mb-2

            font-semibold
          "
          >
            Description
          </label>

          <textarea

            name="description"

            value={formData.description}

            onChange={handleChange}

            rows="5"

            className="
            w-full

            border

            border-red-200

            rounded-xl

            p-3

            resize-none

            focus:ring-2

            focus:ring-red-500

            outline-none
          "
          />

        </div>

        {/* Customer */}

        <div>

          <label
            className="
            block

            mb-2

            font-semibold
          "
          >
            Customer
          </label>

          <select

            name="customer"

            value={formData.customer}

            onChange={handleChange}

            required

            className="
            w-full

            border

            border-red-200

            rounded-xl

            p-3
          "
          >

            <option value="">
              Select Customer
            </option>

            {

              customers.map(

                (customer) => (

                  <option

                    key={customer.id}

                    value={customer.id}

                  >

                    {customer.name}

                  </option>

                )

              )

            }

          </select>

        </div>

        {/* Assigned User */}

        <div>

          <label
            className="
            block

            mb-2

            font-semibold
          "
          >
            Assigned To
          </label>

          <select

            name="assigned_to"

            value={formData.assigned_to}

            onChange={handleChange}

            required

            className="
            w-full

            border

            border-red-200

            rounded-xl

            p-3
          "
          >

            <option value="">
              Select User
            </option>

            {

              users.map(

                (user) => (

                  <option

                    key={user.id}

                    value={user.id}

                  >

                    {user.username} - {user.role}

                  </option>

                )

              )

            }

          </select>

        </div>

                {/* Task Type */}

        <div>

          <label
            className="
            block

            mb-2

            font-semibold
          "
          >
            Task Type
          </label>

          <select

            name="task_type"

            value={formData.task_type}

            onChange={handleChange}

            className="
            w-full

            border

            border-red-200

            rounded-xl

            p-3
          "
          >

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

        {/* Status */}

        <div>

          <label
            className="
            block

            mb-2

            font-semibold
          "
          >
            Status
          </label>

          <select

            name="status"

            value={formData.status}

            onChange={handleChange}

            className="
            w-full

            border

            border-red-200

            rounded-xl

            p-3
          "
          >

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

        </div>

        {/* Due Date */}

        <div>

          <label
            className="
            block

            mb-2

            font-semibold
          "
          >
            Due Date
          </label>

          <input

            type="date"

            name="due_date"

            value={formData.due_date}

            onChange={handleChange}

            required

            className="
            w-full

            border

            border-red-200

            rounded-xl

            p-3

            focus:ring-2

            focus:ring-red-500

            outline-none
          "
          />

        </div>

        {/* Buttons */}

        <div
          className="
          flex

          gap-4

          pt-4
        "
        >

          <button

            type="submit"

            className="
            bg-red-600

            hover:bg-red-700

            text-white

            px-8

            py-3

            rounded-xl

            font-semibold

            transition-all
          "
          >

            Update Task

          </button>

          <button

            type="button"

            onClick={() => navigate(`/tasks/${id}`)}

            className="
            bg-gray-200

            hover:bg-gray-300

            text-gray-700

            px-8

            py-3

            rounded-xl

            font-semibold

            transition-all
          "
          >

            Cancel

          </button>

        </div>

      </form>

          </MainLayout>

  );

}

export default TaskUpdate;