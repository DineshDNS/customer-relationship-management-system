import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import BackButton from "../../components/common/BackButton";
import api from "../../api/api";

function CustomerCreate() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

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

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      setLoading(true);

      try {

        await api.post(

          "customers/",

          formData

        );

        alert(
          "Customer created successfully."
        );

        navigate(
          "/customers"
        );

      }

      catch (error) {

        console.log(
          error.response?.data
        );

        setError(

          "Unable to create customer."

        );

      }

      finally {

        setLoading(false);

      }

    };

  return (

    <MainLayout>

      <BackButton

        path="/customers"

        title="Customers"

      />

      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Create Customer
      </h1>

      {

        error && (

          <div
            className="
            bg-red-100
            text-red-700
            p-4
            rounded-xl
            mb-6
          "
          >

            {error}

          </div>

        )

      }

      <form

        onSubmit={handleSubmit}

        className="
        bg-white
        rounded-2xl
        shadow-md
        p-8
        space-y-5
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
          border-gray-300
          rounded-xl
          p-3
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
          border-gray-300
          rounded-xl
          p-3
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
          border-gray-300
          rounded-xl
          p-3
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
          border-gray-300
          rounded-xl
          p-3
        "

        />

        <textarea

          name="address"

          placeholder="Address"

          value={formData.address}

          onChange={handleChange}

          rows="4"

          className="
          w-full
          border
          border-gray-300
          rounded-xl
          p-3
        "

        />

        <select

          name="lead_source"

          value={formData.lead_source}

          onChange={handleChange}

          className="
          w-full
          border
          border-gray-300
          rounded-xl
          p-3
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

        <div
          className="
          flex
          gap-4
          pt-2
        "
        >

          <button

            type="submit"

            disabled={loading}

            className="
            bg-red-600
            hover:bg-red-700
            disabled:bg-red-300
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
          "

          >

            {

              loading

                ? "Saving..."

                : "Save Customer"

            }

          </button>

          <button

            type="button"

            onClick={() => navigate("/customers")}

            className="
            bg-gray-200
            hover:bg-gray-300
            text-gray-800
            px-6
            py-3
            rounded-xl
            font-semibold
          "

          >

            Cancel

          </button>

        </div>

      </form>

    </MainLayout>

  );

}

export default CustomerCreate;