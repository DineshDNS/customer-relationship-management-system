import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import api from "../../api/api";

import ModuleNav from "../../components/common/ModuleNav";

import {
  CUSTOMERS_NAV,
} from "../../theme/customersNav";

function CustomerList() {

  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const role =
    localStorage.getItem("role");

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
          response.data.results ||
          response.data
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

        <h2
          className="
          text-2xl
          font-semibold
        "
        >
          Loading Customers...
        </h2>

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

          {

            role === "ADMIN"

              ? "All Customers"

              : "My Customers"

          }

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

            {

              customers.length === 0

                ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="
                      text-center
                      p-8
                      text-gray-500
                    "
                    >

                      No customers found.

                    </td>

                  </tr>

                )

                : (

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
                            hover:underline
                          "

                          >

                            View

                          </Link>

                        </td>

                      </tr>

                    )

                  )

                )

            }

          </tbody>

        </table>

      </div>

    </MainLayout>

  );

}

export default CustomerList;