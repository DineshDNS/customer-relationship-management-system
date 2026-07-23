import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import PageActions from "../../components/common/PageActions";
import api from "../../api/api";

function DealCreate() {

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [leads, setLeads] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const currentUser = {

    role:
      localStorage.getItem("role"),

    username:
      localStorage.getItem("username"),

  };

  const [formData, setFormData] =
    useState({

      lead: "",

      deal_name: "",

      deal_value: "",

      stage: "PROSPECTING",

      expected_close_date: "",

      assigned_to: "",

      notes: "",

    });

  useEffect(() => {

    fetchLeads();

    if (

      currentUser.role === "ADMIN" ||

      currentUser.role === "MANAGER"

    ) {

      fetchUsers();

    }

  }, []);

  // ==================================
  // Leads
  // ==================================

  const fetchLeads =
    async () => {

      try {

        const response =
          await api.get(
            "leads/"
          );

        setLeads(

          response.data.results ||

          response.data ||

          []

        );

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

  // ==================================
  // Sales Executives
  // ==================================

  const fetchUsers =
    async () => {

      try {

        const response =
          await api.get(
            "auth/assign-users/"
          );

        setUsers(

          response.data.results ||

          response.data ||

          []

        );

      }

      catch (error) {

        console.log(error);

      }

    };

  // ==================================
  // Handle Change
  // ==================================

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  // ==================================
  // Submit
  // ==================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(

          "deals/",

          formData

        );

        alert(
          "Deal created successfully."
        );

        navigate(
          "/deals"
        );

      }

      catch (error) {

        console.log(error);

        alert(

          error.response?.data?.detail ||

          "Unable to create deal."

        );

      }

    };

  if (loading) {

    return (

      <MainLayout>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-8
          text-center
          text-xl
        "
        >

          Loading...

        </div>

      </MainLayout>

    );

  }

  return (

  <MainLayout>

    <PageActions

      backPath="/deals"

      backTitle="Deals"

    />

    <div
      className="
      bg-white
      rounded-3xl
      shadow-md
      p-8
    "
    >

      <h1
        className="
        text-3xl
        font-bold
        text-red-700
        mb-8
      "
      >
        Create Deal
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
        grid
        md:grid-cols-2
        gap-6
      "
      >

        {/* Lead */}

        <div>

          <label
            className="
            block
            font-semibold
            mb-2
          "
          >
            Lead
          </label>

          <select

            name="lead"

            value={formData.lead}

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
              Select Lead
            </option>

            {

              leads.map(
                (lead)=>(

                  <option

                    key={lead.id}

                    value={lead.id}

                  >

                    {lead.customer_name}

                  </option>

                )
              )

            }

          </select>

        </div>

        {/* Deal Name */}

        <div>

          <label
            className="
            block
            font-semibold
            mb-2
          "
          >
            Deal Name
          </label>

          <input

            type="text"

            name="deal_name"

            value={formData.deal_name}

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

        </div>

        {/* Deal Value */}

        <div>

          <label
            className="
            block
            font-semibold
            mb-2
          "
          >
            Deal Value
          </label>

          <input

            type="number"

            name="deal_value"

            value={formData.deal_value}

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

        </div>

        {/* Expected Close Date */}

        <div>

          <label
            className="
            block
            font-semibold
            mb-2
          "
          >
            Expected Close Date
          </label>

          <input

            type="date"

            name="expected_close_date"

            value={formData.expected_close_date}

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

        </div>

        {/* Stage */}

        <div>

          <label
            className="
            block
            font-semibold
            mb-2
          "
          >
            Stage
          </label>

          <select

            name="stage"

            value={formData.stage}

            onChange={handleChange}

            className="
            w-full
            border
            border-red-200
            rounded-xl
            p-3
          "
          >

            <option value="PROSPECTING">
              PROSPECTING
            </option>

            <option value="PROPOSAL">
              PROPOSAL
            </option>

            <option value="NEGOTIATION">
              NEGOTIATION
            </option>

            <option value="WON">
              WON
            </option>

            <option value="LOST">
              LOST
            </option>

          </select>

        </div>

        {/* Assign To */}

        {

          (

            currentUser.role === "ADMIN"

            ||

            currentUser.role === "MANAGER"

          )

          &&

          (

            <div>

              <label
                className="
                block
                font-semibold
                mb-2
              "
              >
                Assign Sales Executive
              </label>

              <select

                name="assigned_to"

                value={formData.assigned_to}

                onChange={handleChange}

                className="
                w-full
                border
                border-red-200
                rounded-xl
                p-3
              "
              >

                <option value="">
                  Select Sales Executive
                </option>

                {

                  users.map(
                    (user)=>(

                      <option

                        key={user.id}

                        value={user.id}

                      >

                        {user.username}

                      </option>

                    )
                  )

                }

              </select>

            </div>

          )

        }

        {/* Notes */}

        <div
          className="
          md:col-span-2
        "
        >

          <label
            className="
            block
            font-semibold
            mb-2
          "
          >
            Notes
          </label>

          <textarea

            name="notes"

            rows="5"

            value={formData.notes}

            onChange={handleChange}

            className="
            w-full
            border
            border-red-200
            rounded-xl
            p-3
          "

          />

        </div>

        {/* Button */}

        <div
          className="
          md:col-span-2
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

            Create Deal

          </button>

        </div>

      </form>

    </div>

  </MainLayout>

);

}

export default DealCreate;