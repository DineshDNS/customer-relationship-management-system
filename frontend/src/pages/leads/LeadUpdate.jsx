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

function LeadUpdate() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [customers, setCustomers] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [formData, setFormData] =
    useState({
      customer: "",
      assigned_to: "",
      priority: "",
      status: "",
      notes: "",
    });

  useEffect(() => {

    fetchLead();
    fetchCustomers();
    fetchUsers();

  }, []);

  const fetchLead =
    async () => {

      const response =
        await api.get(
          `leads/${id}/`
        );

      setFormData(response.data);
    };

  const fetchCustomers =
    async () => {

      const response =
        await api.get("customers/");

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
        `leads/${id}/`,
        formData
      );

      navigate(
        `/leads/${id}`
      );
    };

  return (

    <MainLayout>

      <BackButton
        path={`/leads/${id}`}
        title="Lead Details"
      />

      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Update Lead
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

        <select
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        >
          {customers.map(customer => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.name}
            </option>
          ))}
        </select>

        <select
          name="assigned_to"
          value={formData.assigned_to}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        >
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.username}
            </option>
          ))}
        </select>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <textarea
          name="notes"
          value={formData.notes}
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
          Update Lead
        </button>

      </form>

    </MainLayout>
  );
}

export default LeadUpdate;