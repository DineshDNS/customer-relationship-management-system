import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import MainLayout from
"../../layouts/MainLayout";

import api from
"../../api/api";

import ModuleNav
from "../../components/common/ModuleNav";

import {
  CUSTOMERS_NAV,
} from "../../theme/customersNav";

function CustomerList() {

  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchCustomers();

  }, []);

  const fetchCustomers =
    async () => {

      try {

        const response =
          await api.get(
            "customers/"
          );

        setCustomers(
          response.data.results || response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
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
          Customers
        </h1>

      </div>

      <ModuleNav
        items={CUSTOMERS_NAV}
      />

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
                Name
              </th>

              <th className="p-4">
                Company
              </th>

              <th className="p-4">
                Email
              </th>

              <th className="p-4">
                Phone
              </th>

              <th className="p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {Array.isArray(customers) && 
            customers.map(
              (customer) => (

                <tr
                  key={customer.id}
                  className="
                  border-b

                  hover:bg-red-50
                "
                >

                  <td className="p-4">
                    {customer.name}
                  </td>

                  <td className="p-4">
                    {customer.company}
                  </td>

                  <td className="p-4">
                    {customer.email}
                  </td>

                  <td className="p-4">
                    {customer.phone}
                  </td>

                  <td className="p-4">

                    <Link
                      to={`/customers/${customer.id}`}
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

export default CustomerList;