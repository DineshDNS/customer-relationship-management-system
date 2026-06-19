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
  FaChartLine,
  FaPercentage,
  FaFileAlt,

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

        <div>

          <h1
            className="
            text-4xl
            font-bold
            text-gray-800
          "
          >
            Reports Dashboard
          </h1>

          <p
            className="
            text-gray-500
            mt-2
          "
          >
            Overview of CRM performance,
            business growth and sales metrics.
          </p>

        </div>

      </div>

      <ModuleNav
        items={REPORTS_NAV}
      />

      {/* Statistics Cards */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-5
        gap-6
      "
      >

        <div
          className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
          border-l-4
          border-red-600
        "
        >

          <FaUsers
            className="
            text-red-600
            text-4xl
            mb-4
          "
          />

          <h3
            className="
            text-gray-500
            mb-2
          "
          >
            Customers
          </h3>

          <p
            className="
            text-4xl
            font-bold
          "
          >
            {stats.customers}
          </p>

        </div>

        <div
          className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
          border-l-4
          border-blue-600
        "
        >

          <FaBullseye
            className="
            text-blue-600
            text-4xl
            mb-4
          "
          />

          <h3
            className="
            text-gray-500
            mb-2
          "
          >
            Leads
          </h3>

          <p
            className="
            text-4xl
            font-bold
          "
          >
            {stats.leads}
          </p>

        </div>

        <div
          className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
          border-l-4
          border-green-600
        "
        >

          <FaHandshake
            className="
            text-green-600
            text-4xl
            mb-4
          "
          />

          <h3
            className="
            text-gray-500
            mb-2
          "
          >
            Deals
          </h3>

          <p
            className="
            text-4xl
            font-bold
          "
          >
            {stats.deals}
          </p>

        </div>

        <div
          className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
          border-l-4
          border-orange-500
        "
        >

          <FaTasks
            className="
            text-orange-500
            text-4xl
            mb-4
          "
          />

          <h3
            className="
            text-gray-500
            mb-2
          "
          >
            Tasks
          </h3>

          <p
            className="
            text-4xl
            font-bold
          "
          >
            {stats.tasks}
          </p>

        </div>

        <div
          className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
          border-l-4
          border-purple-600
        "
        >

          <FaRupeeSign
            className="
            text-purple-600
            text-4xl
            mb-4
          "
          />

          <h3
            className="
            text-gray-500
            mb-2
          "
          >
            Revenue
          </h3>

          <p
            className="
            text-4xl
            font-bold
            text-green-600
          "
          >
            ₹ {stats.revenue}
          </p>

        </div>

      </div>

      {/* Summary Section */}

      <div
        className="
        mt-8

        grid
        lg:grid-cols-3
        gap-6
      "
      >

        <div
          className="
          bg-white
          rounded-3xl
          shadow-md
          p-8
        "
        >

          <FaChartLine
            className="
            text-red-600
            text-5xl
            mb-4
          "
          />

          <h2
            className="
            text-xl
            font-bold
            mb-3
          "
          >
            Sales Growth
          </h2>

          <p
            className="
            text-gray-600
          "
          >
            Monitor sales performance,
            won deals and revenue
            generated by the CRM system.
          </p>

        </div>

        <div
          className="
          bg-white
          rounded-3xl
          shadow-md
          p-8
        "
        >

          <FaPercentage
            className="
            text-blue-600
            text-5xl
            mb-4
          "
          />

          <h2
            className="
            text-xl
            font-bold
            mb-3
          "
          >
            Lead Conversion
          </h2>

          <p
            className="
            text-gray-600
          "
          >
            Analyze lead conversion
            rates and measure the
            effectiveness of sales teams.
          </p>

        </div>

        <div
          className="
          bg-white
          rounded-3xl
          shadow-md
          p-8
        "
        >

          <FaFileAlt
            className="
            text-green-600
            text-5xl
            mb-4
          "
          />

          <h2
            className="
            text-xl
            font-bold
            mb-3
          "
          >
            Business Reports
          </h2>

          <p
            className="
            text-gray-600
          "
          >
            Generate detailed sales,
            lead and activity reports
            in PDF and Excel formats.
          </p>

        </div>

      </div>

    </MainLayout>
  );
}

export default ReportsDashboard;