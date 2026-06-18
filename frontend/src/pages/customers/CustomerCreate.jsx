import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import api from "../../api/api";

function CustomerCreate() {

  const navigate = useNavigate();

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      phone: "",

      company: "",

      address: "",

      lead_source: "Website",
    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      console.log(
        "Submitting:",
        formData
      );

      await api.post(
        "customers/",
        formData
      );

      navigate(
        "/customers"
      );

    } catch (error) {

      console.log(
        error.response?.data
      );

      setError(
        JSON.stringify(
          error.response?.data
        )
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
        Create Customer
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

        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="
          w-full
          border
          border-red-200
          p-3
          rounded-xl
        "
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="
          w-full
          border
          border-red-200
          p-3
          rounded-xl
        "
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="
          w-full
          border
          border-red-200
          p-3
          rounded-xl
        "
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="
          w-full
          border
          border-red-200
          p-3
          rounded-xl
        "
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="
          w-full
          border
          border-red-200
          p-3
          rounded-xl
        "
        />

        <select
          name="lead_source"
          value={formData.lead_source}
          onChange={handleChange}
          className="
          w-full
          border
          border-red-200
          p-3
          rounded-xl
        "
        >

          <option value="Website">
            Website
          </option>

          <option value="Referral">
            Referral
          </option>

          <option value="Social Media">
            Social Media
          </option>

          <option value="Cold Call">
            Cold Call
          </option>

          <option value="Other">
            Other
          </option>

        </select>

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
          Save Customer
        </button>

      </form>

    </MainLayout>
  );
}

export default CustomerCreate;