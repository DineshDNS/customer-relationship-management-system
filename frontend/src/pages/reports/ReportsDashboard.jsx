import {
  useEffect,
  useState,
} from "react";

import MainLayout from
"../../layouts/MainLayout";

import ModuleNav from
"../../components/common/ModuleNav";

import {
  REPORTS_NAV,
} from "../../theme/reportsNav";

import api from
"../../api/api";

import {
  FaUsers,
  FaBullseye,
  FaHandshake,
  FaTasks,
  FaRupeeSign,
} from "react-icons/fa";

function ReportsDashboard() {

  const [stats, setStats] =
    useState({

      customers: 0,

      leads: 0,

      deals: 0,

      tasks: 0,

      revenue: 0,
    });

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard =
    async () => {

      try {

        const response =
          await api.get(
            "reports/dashboard/"
          );

        setStats(
          response.data
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
          Reports Dashboard
        </h1>

      </div>

      <ModuleNav
        items={REPORTS_NAV}
      />

      <div
        className="
        grid
        md:grid-cols-5
        gap-5
      "
      >

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
        >

          <FaUsers
            className="
            text-red-600
            text-3xl
            mb-3
          "
          />

          <h3
            className="
            text-gray-500
          "
          >
            Customers
          </h3>

          <p
            className="
            text-3xl
            font-bold
          "
          >
            {stats.customers}
          </p>

        </div>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
        >

          <FaBullseye
            className="
            text-blue-600
            text-3xl
            mb-3
          "
          />

          <h3
            className="
            text-gray-500
          "
          >
            Leads
          </h3>

          <p
            className="
            text-3xl
            font-bold
          "
          >
            {stats.leads}
          </p>

        </div>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
        >

          <FaHandshake
            className="
            text-green-600
            text-3xl
            mb-3
          "
          />

          <h3
            className="
            text-gray-500
          "
          >
            Deals
          </h3>

          <p
            className="
            text-3xl
            font-bold
          "
          >
            {stats.deals}
          </p>

        </div>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
        >

          <FaTasks
            className="
            text-orange-600
            text-3xl
            mb-3
          "
          />

          <h3
            className="
            text-gray-500
          "
          >
            Tasks
          </h3>

          <p
            className="
            text-3xl
            font-bold
          "
          >
            {stats.tasks}
          </p>

        </div>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
        >

          <FaRupeeSign
            className="
            text-purple-600
            text-3xl
            mb-3
          "
          />

          <h3
            className="
            text-gray-500
          "
          >
            Revenue
          </h3>

          <p
            className="
            text-3xl
            font-bold
            text-green-600
          "
          >
            ₹ {stats.revenue}
          </p>

        </div>

      </div>

      <div
        className="
        mt-8

        bg-white

        rounded-2xl

        shadow-md

        p-8
      "
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-3
        "
        >
          CRM Performance Summary
        </h2>

        <p
          className="
          text-gray-600
        "
        >
          This dashboard provides
          an overview of customers,
          leads, deals, tasks and
          total revenue generated
          from won deals.
        </p>

      </div>

    </MainLayout>
  );
}

export default ReportsDashboard;