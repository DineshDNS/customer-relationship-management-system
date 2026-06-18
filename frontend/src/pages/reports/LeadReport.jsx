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
  FaBullseye,
  FaCheckCircle,
  FaPercentage,
} from "react-icons/fa";

function LeadReport() {

  const [report, setReport] =
    useState({

      total_leads: 0,

      converted_leads: 0,

      conversion_rate: 0,
    });

  useEffect(() => {

    fetchReport();

  }, []);

  const fetchReport =
    async () => {

      try {

        const response =
          await api.get(
            "reports/leads/"
          );

        setReport(
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
          Lead Report
        </h1>

      </div>

      <ModuleNav
        items={REPORTS_NAV}
      />

      <div
        className="
        grid
        md:grid-cols-3
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

          <FaBullseye
            className="
            text-blue-600
            text-3xl
            mb-3
          "
          />

          <h3>
            Total Leads
          </h3>

          <p
            className="
            text-3xl
            font-bold
          "
          >
            {report.total_leads}
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

          <FaCheckCircle
            className="
            text-green-600
            text-3xl
            mb-3
          "
          />

          <h3>
            Converted Leads
          </h3>

          <p
            className="
            text-3xl
            font-bold
          "
          >
            {report.converted_leads}
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
            Conversion Rate
          </h3>

          <p
            className="
            text-3xl
            font-bold
          "
          >
            {report.conversion_rate}%
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
          Lead Conversion Summary
        </h2>

        <div
          className="
          space-y-3
          text-gray-700
        "
        >

          <p>
            Total Leads:
            {" "}
            {report.total_leads}
          </p>

          <p>
            Converted Leads:
            {" "}
            {report.converted_leads}
          </p>

          <p>
            Conversion Rate:
            {" "}
            {report.conversion_rate}%
          </p>

        </div>

      </div>

    </MainLayout>
  );
}

export default LeadReport;