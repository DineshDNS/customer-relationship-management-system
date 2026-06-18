import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import api from "../../api/api";

function LeadCreate() {

  const navigate =
    useNavigate();

  const [customers, setCustomers] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [formData, setFormData] =
    useState({

      customer: "",

      assigned_to: "",

      status: "NEW",

      priority: "MEDIUM",

      notes: "",
    });

  useEffect(() => {

    fetchCustomers();

    fetchUsers();

  }, []);

  const fetchCustomers =
    async () => {

      const response =
        await api.get(
          "customers/"
        );

      setCustomers(
        Array.isArray(response.data)
          ? response.data
          : response.data.results || []
      );
    };

  const fetchUsers =
    async () => {

      const response =
        await api.get(
          "auth/users/"
        );

      setUsers(
        Array.isArray(response.data)
          ? response.data
          : response.data.results || []
      );
    };

  const handleChange = (e) => {

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
          "leads/",
          formData
        );

        navigate(
          "/leads"
        );

      } catch (error) {

        console.log(
          error.response?.data
        );
      }
    };

  return (

    <MainLayout>

      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Create Lead
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
          required
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        >

          <option value="">
            Select Customer
          </option>

          {customers.map(
            (customer) => (

              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            )
          )}

        </select>

        <select
          name="assigned_to"
          value={formData.assigned_to}
          onChange={handleChange}
          required
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        >

          <option value="">
            Assign User
          </option>

          {users.map(
            (user) => (

              <option
                key={user.id}
                value={user.id}
              >
                {user.username}
              </option>
            )
          )}

        </select>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        >

          <option value="LOW">
            LOW
          </option>

          <option value="MEDIUM">
            MEDIUM
          </option>

          <option value="HIGH">
            HIGH
          </option>

        </select>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Lead Notes"
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        />

        <button
          className="
          bg-red-600
          hover:bg-red-700
          text-white
          px-6
          py-3
          rounded-xl
        "
        >
          Save Lead
        </button>

      </form>

    </MainLayout>
  );
}

export default LeadCreate;