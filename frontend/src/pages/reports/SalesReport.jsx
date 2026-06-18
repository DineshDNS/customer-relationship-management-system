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
  FaHandshake,
  FaTrophy,
  FaRupeeSign,
  FaPercentage,
} from "react-icons/fa";

function SalesReport() {

  const [report, setReport] =
    useState({

      total_deals: 0,

      won_deals: 0,

      total_revenue: 0,
    });

  useEffect(() => {

    fetchReport();

  }, []);

  const fetchReport =
    async () => {

      try {

        const response =
          await api.get(
            "reports/sales/"
          );

        setReport(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const successRate =

    report.total_deals > 0

      ? (

          report.won_deals /
          report.total_deals

        ) * 100

      : 0;

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
          Sales Report
        </h1>

      </div>

      <ModuleNav
        items={REPORTS_NAV}
      />

      <div
        className="
        grid
        md:grid-cols-4
        gap-5
      "
      >

        <div
          className="
          bg-white
          p-6
          rounded-2xl
          shadow-md
        "
        >

          <FaHandshake
            className="
            text-blue-600
            text-3xl
            mb-3
          "
          />

          <h3>
            Total Deals
          </h3>

          <p
            className="
            text-3xl
            font-bold
          "
          >
            {report.total_deals}
          </p>

        </div>

        <div
          className="
          bg-white
          p-6
          rounded-2xl
          shadow-md
        "
        >

          <FaTrophy
            className="
            text-green-600
            text-3xl
            mb-3
          "
          />

          <h3>
            Won Deals
          </h3>

          <p
            className="
            text-3xl
            font-bold
          "
          >
            {report.won_deals}
          </p>

        </div>

        <div
          className="
          bg-white
          p-6
          rounded-2xl
          shadow-md
        "
        >

          <FaRupeeSign
            className="
            text-purple-600
            text-3xl
            mb-3
          "
          />

          <h3>
            Revenue
          </h3>

          <p
            className="
            text-3xl
            font-bold
            text-green-600
          "
          >
            ₹ {report.total_revenue}
          </p>

        </div>

        <div
          className="
          bg-white
          p-6
          rounded-2xl
          shadow-md
        "
        >

          <FaPercentage
            className="
            text-orange-600
            text-3xl
            mb-3
          "
          />

          <h3>
            Success Rate
          </h3>

          <p
            className="
            text-3xl
            font-bold
          "
          >
            {successRate.toFixed(2)}%
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
          mb-4
        "
        >
          Sales Performance Summary
        </h2>

        <div
          className="
          space-y-3
          text-gray-700
        "
        >

          <p>
            Total Deals:
            {" "}
            {report.total_deals}
          </p>

          <p>
            Won Deals:
            {" "}
            {report.won_deals}
          </p>

          <p>
            Total Revenue:
            {" "}
            ₹ {report.total_revenue}
          </p>

          <p>
            Success Rate:
            {" "}
            {successRate.toFixed(2)}%
          </p>

        </div>

      </div>

    </MainLayout>
  );
}

export default SalesReport;