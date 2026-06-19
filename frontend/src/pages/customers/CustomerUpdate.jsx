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

function CustomerUpdate() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      lead_source: "",
    });

  useEffect(() => {

    fetchCustomer();

  }, []);

  const fetchCustomer =
    async () => {

      try {

        const response =
          await api.get(
            `customers/${id}/`
          );

        setFormData(response.data);

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
          `customers/${id}/`,
          formData
        );

        alert(
          "Customer Updated Successfully"
        );

        navigate(
          `/customers/${id}`
        );

      } catch (error) {

        console.log(
          error.response?.data
        );
      }
    };

  return (

    <MainLayout>

      <BackButton
        path={`/customers/${id}`}
        title="Customer Details"
      />

      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Update Customer
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
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        />

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          rounded-xl
        "
        />

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="
          w-full
          border
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
          className="
          bg-red-600
          hover:bg-red-700
          text-white
          px-6
          py-3
          rounded-xl
        "
        >
          Update Customer
        </button>

      </form>

    </MainLayout>
  );
}

export default CustomerUpdate;