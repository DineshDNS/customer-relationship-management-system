import {
  useEffect,
  useState,
} from "react";

import api from "../../api/api";

import MainLayout
from "../../layouts/MainLayout";

import StatCard
from "../../components/common/StatCard";

import LeadChart
from "../../components/charts/LeadChart";

import DealChart
from "../../components/charts/DealChart";

import TaskChart
from "../../components/charts/TaskChart";

import RevenueChart
from "../../components/charts/RevenueChart";

function Dashboard() {

  const [stats, setStats] =
    useState(null);

  const [leadData, setLeadData] =
    useState([]);

  const [dealData, setDealData] =
    useState([]);

  const [taskData, setTaskData] =
    useState([]);

  const [revenueData,
    setRevenueData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard =
    async () => {

      try {

        const [

          statsRes,

          leadRes,

          dealRes,

          taskRes,

          revenueRes,

        ] = await Promise.all([

          api.get(
            "dashboard/stats/"
          ),

          api.get(
            "dashboard/lead-chart/"
          ),

          api.get(
            "dashboard/deal-chart/"
          ),

          api.get(
            "dashboard/task-chart/"
          ),

          api.get(
            "dashboard/revenue/"
          ),

        ]);

        setStats(
          statsRes.data
        );

        setLeadData(
          leadRes.data
        );

        setDealData(
          dealRes.data
        );

        setTaskData(
          taskRes.data
        );

        setRevenueData(
          revenueRes.data
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

        Loading Dashboard...

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
        mb-8
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
        grid
        lg:grid-cols-2
        gap-6
        mb-8
      "
      >

        <LeadChart
          data={leadData}
        />

        <DealChart
          data={dealData}
        />

        <TaskChart
          data={taskData}
        />

        <RevenueChart
          data={revenueData}
        />

      </div>

      <div
        className="
        grid
        md:grid-cols-2
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