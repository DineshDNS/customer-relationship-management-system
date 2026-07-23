import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import BackButton from "../../components/common/BackButton";
import api from "../../api/api";

function LeadCreate() {

  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({

    customer: "",

    assigned_to: "",

    status: "NEW",

    priority: "MEDIUM",

    notes: "",

  });

  useEffect(() => {

    fetchCurrentUser();

    fetchCustomers();

    fetchUsers();

  }, []);

  const fetchCurrentUser = async () => {

    try {

      const response = await api.get("auth/profile/");

      setCurrentUser(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchCustomers = async () => {

    try {

      const response = await api.get("customers/");

      setCustomers(

        Array.isArray(response.data)

          ? response.data

          : response.data.results || []

      );

    } catch (error) {

      console.log(error);

    }

  };

  const fetchUsers = async () => {

    try {

      const response = await api.get("auth/users/");

      let data =

        Array.isArray(response.data)

          ? response.data

          : response.data.results || [];

      if (currentUser?.role === "MANAGER") {

        data = data.filter(

          (user) => user.role === "SALES_EXECUTIVE"

        );

      }

      setUsers(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      const payload = { ...formData };

      if (currentUser?.role === "SALES_EXECUTIVE") {

        delete payload.assigned_to;

      }

      await api.post(

        "leads/",

        payload

      );

      navigate("/leads");

    } catch (error) {

      console.log(error.response?.data);

      setError(

        JSON.stringify(error.response?.data)

      );

    }

  };

  return (

    <MainLayout>

      <BackButton

        path="/leads"

        title="Leads"

      />

      <h1

        className="
        text-3xl
        font-bold
        mb-6
      "

      >

        Create Lead

      </h1>

      {error && (

        <div

          className="
          bg-red-100
          text-red-700
          p-3
          rounded-xl
          mb-4
        "

        >

          {error}

        </div>

      )}

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
          border-red-200
          p-3
          rounded-xl
        "

        >

          <option value="">

            Select Customer

          </option>

          {customers.map((customer) => (

            <option

              key={customer.id}

              value={customer.id}

            >

              {customer.name}

            </option>

          ))}

        </select>

        {currentUser?.role !== "SALES_EXECUTIVE" && (

          <select

            name="assigned_to"

            value={formData.assigned_to}

            onChange={handleChange}

            required

            className="
            w-full
            border
            border-red-200
            p-3
            rounded-xl
          "

          >

            <option value="">

              Assign User

            </option>

            {users.map((user) => (

              <option

                key={user.id}

                value={user.id}

              >

                {user.username}

              </option>

            ))}

          </select>

        )}

        <select

          name="priority"

          value={formData.priority}

          onChange={handleChange}

          className="
          w-full
          border
          border-red-200
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

          rows={5}

          className="
          w-full
          border
          border-red-200
          p-3
          rounded-xl
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

          Save Lead

        </button>

      </form>

    </MainLayout>

  );

}

export default LeadCreate;