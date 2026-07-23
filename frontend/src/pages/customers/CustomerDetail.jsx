import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBullseye,
  FaCalendarAlt,
  FaUserTie,
} from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";

import PageActions from "../../components/common/PageActions";

import api from "../../api/api";

function CustomerDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [customer, setCustomer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const currentUser = {

    role:
      localStorage.getItem(
        "role"
      ),

    username:
      localStorage.getItem(
        "username"
      ),

  };

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

        setCustomer(
          response.data
        );

      }

      catch (error) {

        console.log(error);

        if (
          error.response?.status === 403
        ) {

          alert(
            "You don't have permission to view this customer."
          );

          navigate(
            "/customers"
          );

        }

      }

      finally {

        setLoading(false);

      }

    };

  const canEdit =

    customer && (

      currentUser.role ===
      "ADMIN"

      ||

      customer.created_by_username ===
      currentUser.username

    );

  const handleDelete =
    async () => {

      const confirmDelete =
        window.confirm(

          `Delete customer "${customer.name}"?`

        );

      if (!confirmDelete)
        return;

      try {

        await api.delete(

          `customers/${id}/`

        );

        alert(
          "Customer deleted successfully."
        );

        navigate(
          "/customers"
        );

      }

      catch (error) {

        console.log(error);

        alert(
          error.response?.data?.detail ||

          "Unable to delete customer."
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

          Loading Customer...

        </div>

      </MainLayout>

    );

  }

  if (!customer) {

    return (

      <MainLayout>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-8
          text-center
          text-red-600
        "
        >

          Customer not found.

        </div>

      </MainLayout>

    );

  }
    return (

    <MainLayout>

      <PageActions

        backPath="/customers"

        backTitle="Customers"

        editPath={
          canEdit
            ? `/customers/${id}/edit`
            : null
        }

        onDelete={
          canEdit
            ? handleDelete
            : null
        }

      />

      {/* Customer Header */}

      <div
        className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
        mb-8
      "
      >

        <div
          className="
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-6
        "
        >

          <div
            className="
            flex
            items-center
            gap-6
          "
          >

            {/* Avatar */}

            <div
              className="
              w-24
              h-24
              rounded-full
              bg-red-100
              flex
              items-center
              justify-center
              text-red-600
              text-5xl
              font-bold
            "
            >

              {

                customer.name

                  ? customer.name
                      .charAt(0)
                      .toUpperCase()

                  : <FaUser />

              }

            </div>

            {/* Customer Info */}

            <div>

              <h1
                className="
                text-4xl
                font-bold
                text-gray-900
              "
              >

                {customer.name}

              </h1>

              <p
                className="
                text-gray-500
                mt-2
                text-lg
              "
              >

                {customer.company ||

                  "No Company"}

              </p>

              <span
                className="
                inline-block
                mt-4
                bg-red-600
                text-white
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
              "
              >

                Customer

              </span>

            </div>

          </div>

          {/* Quick Summary */}

          <div
            className="
            grid
            grid-cols-2
            gap-6
          "
          >

            <div
              className="
              text-center
            "
            >

              <p
                className="
                text-gray-500
              "
              >

                Created By

              </p>

              <h3
                className="
                font-bold
                text-lg
                mt-2
              "
              >

                {customer.created_by}

              </h3>

            </div>

            <div
              className="
              text-center
            "
            >

              <p
                className="
                text-gray-500
              "
              >

                Lead Source

              </p>

              <h3
                className="
                font-bold
                text-lg
                mt-2
              "
              >

                {customer.lead_source}

              </h3>

            </div>

          </div>

        </div>

      </div>
            {/* Customer Information */}

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        mb-8
      "
      >

        {/* Email */}

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
          flex
          items-start
          gap-4
        "
        >

          <FaEnvelope
            className="
            text-red-600
            text-2xl
            mt-1
          "
          />

          <div>

            <p
              className="
              text-gray-500
              mb-2
            "
            >
              Email
            </p>

            <h3
              className="
              text-lg
              font-semibold
            "
            >
              {customer.email}
            </h3>

          </div>

        </div>

        {/* Phone */}

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
          flex
          items-start
          gap-4
        "
        >

          <FaPhone
            className="
            text-red-600
            text-2xl
            mt-1
          "
          />

          <div>

            <p
              className="
              text-gray-500
              mb-2
            "
            >
              Phone
            </p>

            <h3
              className="
              text-lg
              font-semibold
            "
            >
              {customer.phone}
            </h3>

          </div>

        </div>

        {/* Company */}

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
          flex
          items-start
          gap-4
        "
        >

          <FaBuilding
            className="
            text-red-600
            text-2xl
            mt-1
          "
          />

          <div>

            <p
              className="
              text-gray-500
              mb-2
            "
            >
              Company
            </p>

            <h3
              className="
              text-lg
              font-semibold
            "
            >
              {customer.company ||
                "Not Available"}
            </h3>

          </div>

        </div>

        {/* Lead Source */}

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
          flex
          items-start
          gap-4
        "
        >

          <FaBullseye
            className="
            text-red-600
            text-2xl
            mt-1
          "
          />

          <div>

            <p
              className="
              text-gray-500
              mb-2
            "
            >
              Lead Source
            </p>

            <h3
              className="
              text-lg
              font-semibold
            "
            >
              {customer.lead_source}
            </h3>

          </div>

        </div>

      </div>

      {/* Address */}

      <div
        className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        mb-8
      "
      >

        <div
          className="
          flex
          items-center
          gap-3
          mb-4
        "
        >

          <FaMapMarkerAlt
            className="
            text-red-600
            text-xl
          "
          />

          <h2
            className="
            text-xl
            font-bold
          "
          >
            Address
          </h2>

        </div>

        <p
          className="
          text-gray-700
        "
        >
          {customer.address ||
            "No address available."}
        </p>

      </div>

      {/* Audit Information */}

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
      "
      >

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
          flex
          items-start
          gap-4
        "
        >

          <FaUserTie
            className="
            text-red-600
            text-2xl
            mt-1
          "
          />

          <div>

            <p
              className="
              text-gray-500
              mb-2
            "
            >
              Created By
            </p>

            <h3
              className="
              font-semibold
              text-lg
            "
            >
              {customer.created_by}
            </h3>

          </div>

        </div>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
          flex
          items-start
          gap-4
        "
        >

          <FaCalendarAlt
            className="
            text-red-600
            text-2xl
            mt-1
          "
          />

          <div>

            <p
              className="
              text-gray-500
              mb-2
            "
            >
              Created At
            </p>

            <h3
              className="
              font-semibold
              text-lg
            "
            >
              {new Date(
                customer.created_at
              ).toLocaleString()}
            </h3>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default CustomerDetail;