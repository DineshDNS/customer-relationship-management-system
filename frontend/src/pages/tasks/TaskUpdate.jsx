import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import BackButton from "../../components/common/BackButton";
import api from "../../api/api";

function TaskUpdate() {

  const { id } = useParams();

  const navigate = useNavigate();

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
      task_type: "",
      due_date: "",
      status: "",
    });

  useEffect(() => {

    fetchTask();
    fetchCustomers();
    fetchUsers();

  }, []);

  const fetchTask =
    async () => {

      const response =
        await api.get(
          `tasks/${id}/`
        );

      setFormData(response.data);
    };

  const fetchCustomers =
    async () => {

      const response =
        await api.get(
          "customers/"
        );

      setCustomers(
        response.data.results ||
        response.data
      );
    };

  const fetchUsers =
    async () => {

      const response =
        await api.get(
          "auth/users/"
        );

      setUsers(
        response.data.results ||
        response.data
      );
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

      await api.put(
        `tasks/${id}/`,
        formData
      );

      navigate(
        `/tasks/${id}`
      );
    };

  return (

    <MainLayout>

      <BackButton
        path={`/tasks/${id}`}
        title="Task Details"
      />

      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Update Task
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
        bg-white
        p-8
        rounded-2xl
        shadow-md
        space-y-4
      "
      >

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <button
          className="
          bg-red-600
          text-white
          px-6
          py-3
          rounded-xl
        "
        >
          Update Task
        </button>

      </form>

    </MainLayout>
  );
}

export default TaskUpdate;