import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import ModuleNav from "../../components/common/ModuleNav";
import api from "../../api/api";

import {
  DEALS_NAV,
} from "../../theme/dealsNav";

function DealList() {

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [deals, setDeals] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchDeals();

  }, []);

  // ===================================
  // Fetch Deals
  // ===================================

  const fetchDeals =
    async () => {

      setLoading(true);

      try {

        const response =
          await api.get(
            "deals/"
          );

        const data =

          Array.isArray(
            response.data
          )

            ? response.data

            : response.data.results || [];

        setDeals(data);

      }

      catch (error) {

        console.log(error);

        setDeals([]);

      }

      finally {

        setLoading(false);

      }

    };

  // ===================================
  // Search Deals
  // ===================================

  const handleSearch =
    async (value) => {

      setSearch(value);

      try {

        const response =
          await api.get(
            `deals/?search=${value}`
          );

        const data =

          Array.isArray(
            response.data
          )

            ? response.data

            : response.data.results || [];

        setDeals(data);

      }

      catch (error) {

        console.log(error);

      }

    };

  // ===================================
  // Stage Badge Color
  // ===================================

  const getStageColor =
    (stage) => {

      switch (stage) {

        case "PROSPECTING":
          return "bg-blue-600";

        case "PROPOSAL":
          return "bg-purple-600";

        case "NEGOTIATION":
          return "bg-orange-500";

        case "WON":
          return "bg-green-600";

        case "LOST":
          return "bg-red-600";

        default:
          return "bg-gray-600";

      }

    };

  return (

    <MainLayout>

            {/* ===================================
          Header
      =================================== */}

      <div
        className="
        flex
        flex-col
        lg:flex-row
        justify-between
        lg:items-center
        gap-6
        mb-6
      "
      >

        <div>

          <h1
            className="
            text-4xl
            font-bold
            text-gray-900
          "
          >
            Deals
          </h1>

          <p
            className="
            text-gray-500
            mt-2
          "
          >
            Manage all business deals
          </p>

          <p
            className="
            text-sm
            text-gray-400
            mt-1
          "
          >
            Showing {deals.length} Deal
            {deals.length !== 1 && "s"}
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/deals/create")
          }
          className="
          bg-red-600
          hover:bg-red-700
          text-white
          px-6
          py-3
          rounded-xl
          font-semibold
          shadow
          transition-all
        "
        >
          + Create Deal
        </button>

      </div>

      {/* ===================================
          Navigation
      =================================== */}

      <ModuleNav
        items={DEALS_NAV}
      />

      {/* ===================================
          Search
      =================================== */}

      <div
        className="
        bg-white
        rounded-2xl
        shadow-sm
        p-5
        mb-6
      "
      >

        <input
          type="text"
          value={search}
          placeholder="Search Deals..."
          onChange={(e) =>
            handleSearch(
              e.target.value
            )
          }
          className="
          w-full
          border
          border-red-200
          rounded-xl
          p-3
          outline-none
          focus:ring-2
          focus:ring-red-300
        "
        />

      </div>

      {/* ===================================
          Loading State
      =================================== */}

      {

        loading && (

          <div
            className="
            bg-white
            rounded-2xl
            shadow-md
            p-10
            text-center
            text-lg
            font-semibold
          "
          >

            Loading Deals...

          </div>

        )

      }

      {/* ===================================
          Empty State
      =================================== */}

      {

        !loading &&
        deals.length === 0 && (

          <div
            className="
            bg-white
            rounded-2xl
            shadow-md
            p-12
            text-center
          "
          >

            <h2
              className="
              text-2xl
              font-bold
              mb-3
            "
            >
              No Deals Found
            </h2>

            <p
              className="
              text-gray-500
            "
            >
              There are no deals available.
            </p>

          </div>

        )

      }

            {/* ===================================
          Deals Table
      =================================== */}

      {

        !loading &&

        deals.length > 0 && (

          <div
            className="
            bg-white
            rounded-2xl
            shadow-md
            overflow-hidden
          "
          >

            <table className="w-full">

              <thead>

                <tr
                  className="
                  bg-red-600
                  text-white
                "
                >

                  <th className="p-4 text-left">
                    Deal
                  </th>

                  <th className="p-4 text-left">
                    Customer
                  </th>

                  <th className="p-4 text-left">
                    Assigned To
                  </th>

                  <th className="p-4 text-right">
                    Deal Value
                  </th>

                  <th className="p-4 text-center">
                    Stage
                  </th>

                  <th className="p-4 text-center">
                    Expected Close
                  </th>

                  <th className="p-4 text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  deals.map((deal) => (

                    <tr
                      key={deal.id}
                      className="
                      border-b
                      hover:bg-red-50
                      transition-all
                    "
                    >

                      {/* Deal */}

                      <td className="p-4">

                        <div
                          className="
                          flex
                          items-center
                          gap-3
                        "
                        >

                          <div
                            className="
                            w-10
                            h-10

                            rounded-full

                            bg-red-100

                            flex

                            items-center

                            justify-center

                            font-bold

                            text-red-700
                          "
                          >

                            {

                              deal.deal_name

                                ? deal.deal_name
                                    .charAt(0)
                                    .toUpperCase()

                                : "D"

                            }

                          </div>

                          <div>

                            <p
                              className="
                              font-semibold
                            "
                            >
                              {deal.deal_name}
                            </p>

                            <p
                              className="
                              text-xs
                              text-gray-500
                            "
                            >
                              Deal ID :
                              {" "}
                              {deal.id}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Customer */}

                      <td className="p-4">

                        {deal.lead_customer || "-"}

                      </td>

                      {/* Assigned */}

                      <td className="p-4">

                        <span
                          className="
                          bg-gray-100

                          px-3
                          py-1

                          rounded-full

                          text-sm
                        "
                        >

                          {

                            deal.assigned_to_name ||

                            "Unassigned"

                          }

                        </span>

                      </td>

                      {/* Deal Value */}

                      <td
                        className="
                        p-4

                        text-right

                        font-semibold

                        text-green-600
                      "
                      >

                        ₹{" "}

                        {

                          Number(
                            deal.deal_value || 0
                          ).toLocaleString()

                        }

                      </td>

                      {/* Stage */}

                      <td
                        className="
                        p-4
                        text-center
                      "
                      >

                        <span
                          className={`
                            px-4
                            py-1

                            rounded-full

                            text-white

                            text-sm

                            font-semibold

                            ${getStageColor(
                              deal.stage
                            )}
                          `}
                        >

                          {deal.stage}

                        </span>

                      </td>

                      {/* Expected Close */}

                      <td
                        className="
                        p-4
                        text-center
                      "
                      >

                        {

                          deal.expected_close_date ||

                          "-"

                        }

                      </td>

                      {/* Action */}

                      <td
                        className="
                        p-4
                        text-center
                      "
                      >

                        <div
                          className="
                          flex
                          justify-center
                          gap-2
                        "
                        >

                          <Link
                            to={`/deals/${deal.id}`}
                            className="
                            bg-blue-600
                            hover:bg-blue-700

                            text-white

                            px-4
                            py-2

                            rounded-lg

                            text-sm

                            transition-all
                          "
                          >
                            View
                          </Link>

                          

                        </div>

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

          </div>

        )

      }

            {/* ===================================
          Footer
      =================================== */}

      {

        !loading &&

        deals.length > 0 && (

          <div
            className="
            flex

            justify-between

            items-center

            mt-6

            text-sm

            text-gray-500
          "
          >

            <div>

              Total Deals :

              <span
                className="
                font-semibold
                ml-2
              "
              >

                {deals.length}

              </span>

            </div>

            <div>

              CRM Deals Management

            </div>

          </div>

        )

      }

    </MainLayout>

  );

}

export default DealList;