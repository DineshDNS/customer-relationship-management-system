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

function DealUpdate() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [leads, setLeads] =
    useState([]);

  const [formData, setFormData] =
    useState({
      lead: "",
      deal_name: "",
      deal_value: "",
      stage: "",
      expected_close_date: "",
      notes: "",
    });

  useEffect(() => {

    fetchDeal();
    fetchLeads();

  }, []);

  const fetchDeal =
    async () => {

      const response =
        await api.get(
          `deals/${id}/`
        );

      setFormData(response.data);
    };

  const fetchLeads =
    async () => {

      const response =
        await api.get("leads/");

      setLeads(
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
        `deals/${id}/`,
        formData
      );

      navigate(
        `/deals/${id}`
      );
    };

  return (

    <MainLayout>

      <BackButton
        path={`/deals/${id}`}
        title="Deal Details"
      />

      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Update Deal
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
          name="deal_name"
          value={formData.deal_name}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="number"
          name="deal_value"
          value={formData.deal_value}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="date"
          name="expected_close_date"
          value={formData.expected_close_date}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

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
          Update Deal
        </button>

      </form>

    </MainLayout>
  );
}

export default DealUpdate;