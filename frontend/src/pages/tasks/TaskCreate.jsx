import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import BackButton from "../../components/common/BackButton";
import ModuleNav from "../../components/common/ModuleNav";

import {
  TASKS_NAV,
} from "../../theme/tasksNav";

import api from "../../api/api";

function TaskCreate() {

  const navigate =
    useNavigate();

  const [customers, setCustomers] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [formData, setFormData] =
    useState({

      title: "",

      description: "",

      customer: "",

      assigned_to: "",

      task_type: "CALL",

      due_date: "",
    });

  useEffect(() => {

    fetchCustomers();

    fetchUsers();

  }, []);

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
            ? response.data
            : response.data.results || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  const fetchUsers = async () => {

    try {

        const response =
        await api.get(
            "auth/users/"
        );

        console.log(
        "Users API:",
        response.data
        );

        setUsers(
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

        await api.post(
          "tasks/",
          formData
        );

        alert(
          "Task Created Successfully"
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

  return (

    <MainLayout>

      <BackButton
        path="/tasks"
        title="Tasks"
      />

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
          Create Task
        </h1>

      </div>

      <ModuleNav
        items={TASKS_NAV}
      />

      <form
        onSubmit={handleSubmit}
        className="
        bg-white

        rounded-2xl

        shadow-md

        p-8

        space-y-5
      "
      >

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="
          w-full

          border
          border-red-200

          rounded-xl

          p-3
        "
        />

        <textarea
          name="description"
          placeholder="Description"
          value={
            formData.description
          }
          onChange={handleChange}
          rows="4"
          className="
          w-full

          border
          border-red-200

          rounded-xl

          p-3
        "
        />

        <select
          name="customer"
          value={
            formData.customer
          }
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

          {customers.map(
            (customer) => (

              <option
                key={
                  customer.id
                }
                value={
                  customer.id
                }
              >
                {customer.name}
              </option>
            )
          )}

        </select>

        <select
          name="assigned_to"
          value={
            formData.assigned_to
          }
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
            Assign User
          </option>

          {Array.isArray(users) && users.map(
            (user) => (

              <option
                key={user.id}
                value={user.id}
              >
                {user.username}
                {" - "}
                {user.role}
              </option>
            )
          )}

        </select>

        <select
          name="task_type"
          value={
            formData.task_type
          }
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
            CALL
          </option>

          <option value="MEETING">
            MEETING
          </option>

          <option value="FOLLOW_UP">
            FOLLOW UP
          </option>

          <option value="EMAIL">
            EMAIL
          </option>

        </select>

        <input
          type="date"
          name="due_date"
          value={
            formData.due_date
          }
          onChange={handleChange}
          required
          className="
          w-full

          border
          border-red-200

          rounded-xl

          p-3
        "
        />

        <button
          type="submit"
          className="
          bg-red-600
          hover:bg-red-700

          text-white

          px-6
          py-3

          rounded-xl
        "
        >
          Create Task
        </button>

      </form>

    </MainLayout>
  );
}

export default TaskCreate;