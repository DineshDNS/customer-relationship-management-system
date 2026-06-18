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

function LeadDetail() {

  const { id } =
    useParams();

  const [lead, setLead] =
    useState(null);

  const [status, setStatus] =
    useState("");

  useEffect(() => {

    fetchLead();

  }, []);

  const fetchLead =
    async () => {

      try {

        const response =
          await api.get(
            `leads/${id}/`
          );

        setLead(
          response.data
        );

        setStatus(
          response.data.status
        );

      } catch (error) {

        console.log(error);
      }
    };

  const updateStatus =
    async () => {

      try {

        await api.patch(
          `leads/${id}/status/`,
          {
            status,
          }
        );

        alert(
          "Status Updated Successfully"
        );

        fetchLead();

      } catch (error) {

        console.log(
          error.response?.data
        );
      }
    };

  if (!lead) {

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
        path="/leads"
        title="Leads"
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
            Lead Details
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
            {lead.status}
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
              {lead.customer_name}
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
              Assigned To
            </p>

            <p
              className="
              text-lg
              font-medium
            "
            >
              {lead.assigned_to_name}
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
              {lead.created_by_name}
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
              Priority
            </p>

            <span
              className="
              bg-red-600
              text-white

              px-3
              py-1

              rounded-full

              text-sm
            "
            >
              {lead.priority}
            </span>

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
            {lead.notes || "No Notes Available"}
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
            Update Status
          </h2>

          <div
            className="
            flex
            gap-4
            flex-wrap
          "
          >

            <select
              value={status}
              onChange={(e) =>
                setStatus(
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

              <option value="NEW">
                NEW
              </option>

              <option value="CONTACTED">
                CONTACTED
              </option>

              <option value="QUALIFIED">
                QUALIFIED
              </option>

              <option value="CONVERTED">
                CONVERTED
              </option>

              <option value="CLOSED">
                CLOSED
              </option>

            </select>

            <button
              onClick={
                updateStatus
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
              Update Status
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default LeadDetail;