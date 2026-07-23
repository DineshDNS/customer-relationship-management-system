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

  const navigate =
    useNavigate();

  const role =
    localStorage.getItem(
      "role"
    );

  const [customers,
    setCustomers] =
    useState([]);

  const [users,
    setUsers] =
    useState([]);

  const [formData,
    setFormData] =
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

    if (
      role === "ADMIN" ||
      role === "MANAGER"
    ) {

      fetchUsers();

    }

  }, []);

  const fetchLead =
    async () => {

      try {

        const response =
          await api.get(
            `leads/${id}/`
          );

        setFormData({

          customer:
            response.data.customer,

          assigned_to:
            response.data.assigned_to,

          priority:
            response.data.priority,

          status:
            response.data.status,

          notes:
            response.data.notes || "",
        });

      } catch (error) {

        console.log(error);

        alert(
          "Unable to load lead details"
        );
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

          response.data.results ||
          response.data
        );

      } catch (error) {

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

          response.data.results ||
          response.data
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

        await api.put(

          `leads/${id}/`,

          formData
        );

        alert(
          "Lead Updated Successfully"
        );

        navigate(
          `/leads/${id}`
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update lead"
        );
      }
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
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        >

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

        {
          (
            role === "ADMIN" ||
            role === "MANAGER"
          ) && (

            <select
              name="assigned_to"
              value={
                formData.assigned_to
              }
              onChange={
                handleChange
              }
              className="
              w-full
              border
              p-3
              rounded-xl
            "
            >

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

          )
        }

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

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        >

          <option value="NEW">
            NEW
          </option>

          <option value="CONTACTED">
            CONTACTED
          </option>

          <option value="QUALIFIED">
            QUALIFIED
          </option>

          <option value="CONVERTED">
            CONVERTED
          </option>

          <option value="CLOSED">
            CLOSED
          </option>

        </select>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="5"
          placeholder="Notes"
          className="
          w-full
          border
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
          Update Lead
        </button>

      </form>

    </MainLayout>
  );
}

export default LeadUpdate;