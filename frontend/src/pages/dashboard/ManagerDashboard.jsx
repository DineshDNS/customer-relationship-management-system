import {
  useEffect,
  useState,
} from "react";

import {
  FaUsers,
  FaBullseye,
  FaHandshake,
  FaIndianRupeeSign,
} from "react-icons/fa6";

import api from "../../api/api";

import MainLayout from "../../layouts/MainLayout";

import DashboardCard from "../../components/dashboard/DashboardCard";

import RecentCustomers from "../../components/dashboard/RecentCustomers";
import RecentLeads from "../../components/dashboard/RecentLeads";
import RecentTasks from "../../components/dashboard/RecentTasks";
import RecentDeals from "../../components/dashboard/RecentDeals";

import LeadChart from "../../components/charts/LeadChart";
import DealChart from "../../components/charts/DealChart";

function ManagerDashboard() {

  const [stats, setStats] = useState({});

  const [leadChart, setLeadChart] = useState([]);

  const [dealChart, setDealChart] = useState([]);

  const [customers, setCustomers] = useState([]);

  const [leads, setLeads] = useState([]);

  const [tasks, setTasks] = useState([]);

  const [deals, setDeals] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const [

        statsRes,

        leadChartRes,

        dealChartRes,

        customersRes,

        leadsRes,

        tasksRes,

        dealsRes,

      ] = await Promise.all([

        api.get("dashboard/stats/"),

        api.get("dashboard/lead-chart/"),

        api.get("dashboard/deal-chart/"),

        api.get("dashboard/recent-customers/"),

        api.get("dashboard/recent-leads/"),

        api.get("dashboard/recent-tasks/"),

        api.get("dashboard/recent-deals/"),

      ]);

      setStats(statsRes.data);

      setLeadChart(leadChartRes.data);

      setDealChart(dealChartRes.data);

      setCustomers(customersRes.data);

      setLeads(leadsRes.data);

      setTasks(tasksRes.data);

      setDeals(dealsRes.data);

    }

    catch (error) {

      console.log(error);

    }

    finally {

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
          Loading Dashboard...
        </h2>

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
        Team Dashboard
      </h1>

      {/* Dashboard Cards */}

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

        <DashboardCard
            title="Customers"
            value={stats.total_customers}
            color="#ef4444"
            icon={<FaUsers />}
            />

            <DashboardCard
            title="Leads"
            value={stats.total_leads}
            color="#f97316"
            icon={<FaBullseye />}
            />

            <DashboardCard
            title="Deals"
            value={stats.total_deals}
            color="#22c55e"
            icon={<FaHandshake />}
            />

            <DashboardCard
            title="Revenue"
            value={`₹${Number(
                stats.total_revenue || 0
            ).toLocaleString("en-IN")}`}
            color="#2563eb"
            icon={<FaIndianRupeeSign />}
            />

      </div>

      {/* Charts */}

      <div
        className="
        grid
        lg:grid-cols-2
        gap-6
        mb-8
      "
      >

        <LeadChart
          data={leadChart}
        />

        <DealChart
          data={dealChart}
        />

      </div>

      {/* Recent Data */}

      <div
        className="
        grid
        lg:grid-cols-2
        gap-6
        mb-8
      "
      >

        <RecentCustomers
          customers={customers}
        />

        <RecentLeads
          leads={leads}
        />

      </div>

      <div
        className="
        grid
        lg:grid-cols-2
        gap-6
      "
      >

        <RecentTasks
          tasks={tasks}
        />

        <RecentDeals
          deals={deals}
        />

      </div>

    </MainLayout>

  );

}

export default ManagerDashboard;