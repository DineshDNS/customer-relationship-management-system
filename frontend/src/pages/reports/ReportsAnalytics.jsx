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

  PieChart,
  Pie,
  Cell,

  BarChart,
  Bar,

  XAxis,
  YAxis,

  Tooltip,

  ResponsiveContainer,

} from "recharts";

function ReportsAnalytics() {

  const [sales, setSales] =
    useState({});

  const [leads, setLeads] =
    useState({});

  useEffect(() => {

    fetchReports();

  }, []);

  const fetchReports =
    async () => {

      try {

        const salesResponse =
          await api.get(
            "reports/sales/"
          );

        const leadsResponse =
          await api.get(
            "reports/leads/"
          );

        setSales(
          salesResponse.data
        );

        setLeads(
          leadsResponse.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const dealData = [

    {
      name: "Won",
      value:
        sales.won_deals || 0,
    },

    {
      name: "Lost",
      value:
        (sales.total_deals || 0)
        -
        (sales.won_deals || 0),
    },
  ];

  const leadData = [

    {
      name: "Converted",
      value:
        leads.converted_leads || 0,
    },

    {
      name: "Remaining",
      value:
        (leads.total_leads || 0)
        -
        (leads.converted_leads || 0),
    },
  ];

  const revenueData = [

    {
      name: "Revenue",
      revenue:
        sales.total_revenue || 0,
    },
  ];

  return (

    <MainLayout>

      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Analytics Dashboard
      </h1>

      <ModuleNav
        items={REPORTS_NAV}
      />

      <div
        className="
        grid
        lg:grid-cols-2
        gap-6
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

          <h2
            className="
            text-xl
            font-bold
            mb-4
          "
          >
            Deal Performance
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={dealData}
                dataKey="value"
                outerRadius={100}
              >

                <Cell fill="#16a34a" />

                <Cell fill="#dc2626" />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
        >

          <h2
            className="
            text-xl
            font-bold
            mb-4
          "
          >
            Lead Conversion
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={leadData}
                dataKey="value"
                outerRadius={100}
              >

                <Cell fill="#2563eb" />

                <Cell fill="#f59e0b" />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
          lg:col-span-2
        "
        >

          <h2
            className="
            text-xl
            font-bold
            mb-4
          "
          >
            Revenue
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={revenueData}
            >

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="revenue"
                fill="#dc2626"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </MainLayout>
  );
}

export default ReportsAnalytics;