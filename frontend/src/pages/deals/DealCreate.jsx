import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import api from "../../api/api";

function DealCreate() {

  const navigate =
    useNavigate();

  const [leads, setLeads] =
    useState([]);

  const [formData, setFormData] =
    useState({

      lead: "",

      deal_name: "",

      deal_value: "",

      stage: "PROSPECTING",

      expected_close_date: "",

      notes: "",
    });

  useEffect(() => {

    fetchLeads();

  }, []);

  const fetchLeads =
    async () => {

      try {

        const response =
          await api.get(
            "leads/"
          );

        setLeads(
          Array.isArray(response.data)
            ? response.data
            : response.data.results || []
        );

      } catch (error) {

        console.log(error);
      }
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
          "deals/",
          formData
        );

        navigate(
          "/deals"
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
        Create Deal
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
          name="lead"
          value={formData.lead}
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
            Select Lead
          </option>

          {leads.map(
            (lead) => (

              <option
                key={lead.id}
                value={lead.id}
              >
                {lead.customer_name}
              </option>
            )
          )}

        </select>

        <input
          type="text"
          name="deal_name"
          placeholder="Deal Name"
          value={formData.deal_name}
          onChange={handleChange}
          required
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        />

        <input
          type="number"
          name="deal_value"
          placeholder="Deal Value"
          value={formData.deal_value}
          onChange={handleChange}
          required
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        />

        <input
          type="date"
          name="expected_close_date"
          value={formData.expected_close_date}
          onChange={handleChange}
          required
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        />

        <select
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded-xl
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

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes"
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
          Save Deal
        </button>

      </form>

    </MainLayout>
  );
}

export default DealCreate;