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
  LEADS_NAV,
} from "../../theme/leadsNav";

function LeadList() {

  const [leads, setLeads] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchLeads();

  }, []);

  const fetchLeads = async () => {

    try {

      const response =
        await api.get(
          "leads/"
        );

      setLeads(
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
            `leads/?search=${value}`
          );

        setLeads(
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
          Leads
        </h1>

        <ModuleNav
        items={LEADS_NAV}
        />

      </div>

      <input
        type="text"
        value={search}
        placeholder="Search Leads..."
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
                Customer
              </th>

              <th className="p-4">
                Assigned To
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Priority
              </th>

              <th className="p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {leads.map(
              (lead) => (

                <tr
                  key={lead.id}
                  className="
                  border-b
                  hover:bg-red-50
                "
                >

                  <td className="p-4">
                    {
                      lead.customer_name
                    }
                  </td>

                  <td className="p-4">
                    {
                      lead.assigned_to_name
                    }
                  </td>

                  <td className="p-4">
                    {lead.status}
                  </td>

                  <td className="p-4">
                    {lead.priority}
                  </td>

                  <td className="p-4">

                    <Link
                      to={`/leads/${lead.id}`}
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

export default LeadList;