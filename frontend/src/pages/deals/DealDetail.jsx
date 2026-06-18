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

function DealDetail() {

  const { id } =
    useParams();

  const [deal, setDeal] =
    useState(null);

  const [stage, setStage] =
    useState("");

  useEffect(() => {

    fetchDeal();

  }, []);

  const fetchDeal =
    async () => {

      try {

        const response =
          await api.get(
            `deals/${id}/`
          );

        setDeal(
          response.data
        );

        setStage(
          response.data.stage
        );

      } catch (error) {

        console.log(error);
      }
    };

  const updateStage =
    async () => {

      try {

        await api.patch(
          `deals/${id}/stage/`,
          {
            stage,
          }
        );

        alert(
          "Stage Updated Successfully"
        );

        fetchDeal();

      } catch (error) {

        console.log(
          error.response?.data
        );
      }
    };

  if (!deal) {

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
        path="/deals"
        title="Deals"
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
            {deal.deal_name}
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
            {deal.stage}
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
              Customer
            </p>

            <p
              className="
              text-lg
              font-medium
            "
            >
              {deal.lead_customer}
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
              Deal Value
            </p>

            <p
              className="
              text-green-600
              font-bold
              text-2xl
            "
            >
              ₹ {deal.deal_value}
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
              Expected Close Date
            </p>

            <p
              className="
              text-lg
              font-medium
            "
            >
              {deal.expected_close_date}
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
              Created By
            </p>

            <p
              className="
              text-lg
              font-medium
            "
            >
              {deal.created_by_name}
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
            Notes
          </p>

          <p>
            {deal.notes ||
              "No Notes Available"}
          </p>

        </div>

        <div
          className="
          border-t
          pt-6
        "
        >

          <h2
            className="
            text-2xl
            font-bold
            mb-4
          "
          >
            Update Deal Stage
          </h2>

          <div
            className="
            flex
            gap-4
            flex-wrap
          "
          >

            <select
              value={stage}
              onChange={(e) =>
                setStage(
                  e.target.value
                )
              }
              className="
              border
              border-red-200

              rounded-xl

              p-3

              min-w-[220px]
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

            <button
              onClick={
                updateStage
              }
              className="
              bg-red-600
              hover:bg-red-700

              text-white

              px-6
              py-3

              rounded-xl

              font-semibold

              transition-all
            "
            >
              Update Stage
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default DealDetail;