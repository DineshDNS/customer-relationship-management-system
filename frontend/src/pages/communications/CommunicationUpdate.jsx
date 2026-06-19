import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import MainLayout from
"../../layouts/MainLayout";

import BackButton from
"../../components/common/BackButton";

import api from
"../../api/api";

function CommunicationUpdate() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [formData,
    setFormData] =
    useState({

      communication_type:
      "CALL",

      subject: "",

      description: "",
    });

  useEffect(() => {

    fetchCommunication();

  }, []);

  const fetchCommunication =
    async () => {

      const response =
        await api.get(
          `communications/${id}/`
        );

      setFormData(
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
        `communications/${id}/`,
        formData
      );

      navigate(
        `/communications/${id}`
      );
    };

  return (

    <MainLayout>

      <BackButton
        path="/communications"
        title="Communications"
      />

      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Update Communication
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
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        />

        <textarea
          name="description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
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
          Update
        </button>

      </form>

    </MainLayout>
  );
}

export default CommunicationUpdate;