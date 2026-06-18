import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import api from "../../api/api";

function MyLeads() {

  const [leads, setLeads] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchMyLeads();

  }, []);

  const fetchMyLeads =
    async () => {

      try {

        const response =
          await api.get(
            "leads/my-leads/"
          );

        setLeads(
          Array.isArray(response.data)
            ? response.data
            : response.data.results || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  if (loading) {

    return (

      <MainLayout>

        <h1>
          Loading...
        </h1>

      </MainLayout>
    );
  }

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
          My Leads
        </h1>

      </div>

      <div
        className="
        bg-white
        rounded-2xl
        shadow-md
        overflow-hidden
      "
      >

        <table
          className="
          w-full
        "
        >

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
                      lead.status
                    }
                  </td>

                  <td className="p-4">
                    {
                      lead.priority
                    }
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

export default MyLeads;