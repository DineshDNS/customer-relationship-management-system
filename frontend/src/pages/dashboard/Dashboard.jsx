import {
  useEffect,
  useState,
} from "react";

import api from "../../api/api";

import MainLayout
from "../../layouts/MainLayout";

import StatCard
from "../../components/common/StatCard";

function Dashboard() {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats =
    async () => {

      try {

        const response =
          await api.get(
            "dashboard/stats/"
          );

        setStats(
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

        <h1>
          Loading Dashboard...
        </h1>

      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <h1
        className="
        text-4xl
        font-bold
        mb-8
      "
      >
        Dashboard
      </h1>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
      >

        <StatCard
          title="Customers"
          value={
            stats.total_customers
          }
          borderColor="
          border-red-600"
        />

        <StatCard
          title="Leads"
          value={
            stats.total_leads
          }
          borderColor="
          border-orange-500"
        />

        <StatCard
          title="Deals"
          value={
            stats.total_deals
          }
          borderColor="
          border-green-600"
        />

        <StatCard
          title="Revenue"
          value={
            `₹${stats.total_revenue}`
          }
          borderColor="
          border-pink-600"
        />

      </div>

      <div
        className="
        mt-8

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
            Lead Conversion
          </h2>

          <p
            className="
            text-4xl
            text-red-600
            font-bold
          "
          >
            {
              stats.lead_conversion_rate
            }%
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

          <h2
            className="
            text-xl
            font-bold
            mb-4
          "
          >
            Deal Win Rate
          </h2>

          <p
            className="
            text-4xl
            text-green-600
            font-bold
          "
          >
            {
              stats.deal_win_rate
            }%
          </p>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;