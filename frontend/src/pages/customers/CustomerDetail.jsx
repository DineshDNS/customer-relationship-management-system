import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import BackButton from "../../components/common/BackButton";
import api from "../../api/api";

function CustomerDetail() {

  const { id } =
    useParams();

  const [customer, setCustomer] =
    useState(null);

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

      } catch (error) {

        console.log(error);
      }
    };

  if (!customer) {

    return (

      <MainLayout>

        <div
          className="
          bg-white
          p-8
          rounded-2xl
          shadow-md
        "
        >
          Loading...
        </div>

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <BackButton
        path="/customers"
        title="Customers"
      />

      <div
        className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
      "
      >

        <div
          className="
          flex
          justify-between
          items-center
          mb-8
        "
        >

          <h1
            className="
            text-4xl
            font-bold
            text-red-700
          "
          >
            {customer.name}
          </h1>

          <span
            className="
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

        <div
          className="
          grid
          md:grid-cols-2
          gap-6
          mb-8
        "
        >

          <div
            className="
            bg-red-50
            p-5
            rounded-xl
          "
          >

            <p
              className="
              font-semibold
              text-gray-600
              mb-2
            "
            >
              Email
            </p>

            <p
              className="
              text-lg
              font-medium
            "
            >
              {customer.email}
            </p>

          </div>

          <div
            className="
            bg-red-50
            p-5
            rounded-xl
          "
          >

            <p
              className="
              font-semibold
              text-gray-600
              mb-2
            "
            >
              Phone
            </p>

            <p
              className="
              text-lg
              font-medium
            "
            >
              {customer.phone}
            </p>

          </div>

          <div
            className="
            bg-red-50
            p-5
            rounded-xl
          "
          >

            <p
              className="
              font-semibold
              text-gray-600
              mb-2
            "
            >
              Company
            </p>

            <p
              className="
              text-lg
              font-medium
            "
            >
              {customer.company ||
                "Not Available"}
            </p>

          </div>

          <div
            className="
            bg-red-50
            p-5
            rounded-xl
          "
          >

            <p
              className="
              font-semibold
              text-gray-600
              mb-2
            "
            >
              Lead Source
            </p>

            <p
              className="
              text-lg
              font-medium
            "
            >
              {customer.lead_source}
            </p>

          </div>

        </div>

        <div
          className="
          bg-red-50
          p-5
          rounded-xl
          mb-8
        "
        >

          <p
            className="
            font-semibold
            text-gray-600
            mb-2
          "
          >
            Address
          </p>

          <p>
            {customer.address ||
              "No Address Available"}
          </p>

        </div>

        <div
          className="
          grid
          md:grid-cols-2
          gap-6
        "
        >

          <div
            className="
            bg-gray-50
            p-5
            rounded-xl
          "
          >

            <p
              className="
              font-semibold
              text-gray-600
              mb-2
            "
            >
              Created By
            </p>

            <p>
              {customer.created_by}
            </p>

          </div>

          <div
            className="
            bg-gray-50
            p-5
            rounded-xl
          "
          >

            <p
              className="
              font-semibold
              text-gray-600
              mb-2
            "
            >
              Created At
            </p>

            <p>
              {new Date(
                customer.created_at
              ).toLocaleString()}
            </p>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default CustomerDetail;