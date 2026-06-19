import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import MainLayout from
"../../layouts/MainLayout";

import BackButton from
"../../components/common/BackButton";

import api from
"../../api/api";

function CommunicationCreate() {

  const navigate =
    useNavigate();

  const [customers,
    setCustomers] =
    useState([]);

  const [formData,
    setFormData] =
    useState({

      customer: "",

      communication_type:
      "CALL",

      subject: "",

      description: "",
    });

  useEffect(() => {

    fetchCustomers();

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
          "communications/",
          formData
        );

        navigate(
          "/communications"
        );

      } catch (error) {

        console.log(error);
      }
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
        Create Communication
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
          name="communication_type"
          value={
            formData.communication_type
          }
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        >

          <option value="CALL">
            CALL
          </option>

          <option value="EMAIL">
            EMAIL
          </option>

          <option value="MEETING">
            MEETING
          </option>

          <option value="NOTE">
            NOTE
          </option>

        </select>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
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
          placeholder="Description"
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
          Save
        </button>

      </form>

    </MainLayout>
  );
}

export default CommunicationCreate;