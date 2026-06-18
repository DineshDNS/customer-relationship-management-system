import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import api from "../../api/api";

import ModuleNav
from "../../components/common/ModuleNav";

import {
  DEALS_NAV,
} from "../../theme/dealsNav";

function DealList() {

  const [deals, setDeals] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchDeals();

  }, []);

  const fetchDeals =
    async () => {

      try {

        const response =
          await api.get(
            "deals/"
          );

        setDeals(
          Array.isArray(response.data)
            ? response.data
            : response.data.results || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  const handleSearch =
    async (value) => {

      setSearch(value);

      try {

        const response =
          await api.get(
            `deals/?search=${value}`
          );

        setDeals(
          Array.isArray(response.data)
            ? response.data
            : response.data.results || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <MainLayout>

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
      "
      >

        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Deals
        </h1>

        <ModuleNav
            items={DEALS_NAV}
        />

      </div>

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
        mb-5
      "
      />

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

              <th className="p-4">
                Deal
              </th>

              <th className="p-4">
                Customer
              </th>

              <th className="p-4">
                Value
              </th>

              <th className="p-4">
                Stage
              </th>

              <th className="p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {deals.map(
              (deal) => (

                <tr
                  key={deal.id}
                  className="
                  border-b
                  hover:bg-red-50
                "
                >

                  <td className="p-4">
                    {deal.deal_name}
                  </td>

                  <td className="p-4">
                    {deal.lead_customer}
                  </td>

                  <td className="p-4">
                    ₹ {deal.deal_value}
                  </td>

                  <td className="p-4">
                    {deal.stage}
                  </td>

                  <td className="p-4">

                    <Link
                      to={`/deals/${deal.id}`}
                      className="
                      text-red-600
                      font-semibold
                    "
                    >
                      View
                    </Link>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}

export default DealList;