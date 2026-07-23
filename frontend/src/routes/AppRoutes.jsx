import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleProtectedRoute from "../components/common/RoleProtectedRoute";

/* ===========================
   Authentication
=========================== */

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* ===========================
   Dashboard
=========================== */

import Dashboard from "../pages/dashboard/Dashboard";

/* ===========================
   Customers
=========================== */

import CustomerList from "../pages/customers/CustomerList";
import CustomerCreate from "../pages/customers/CustomerCreate";
import CustomerDetail from "../pages/customers/CustomerDetail";
import CustomerUpdate from "../pages/customers/CustomerUpdate";

/* ===========================
   Leads
=========================== */

import LeadList from "../pages/leads/LeadList";
import LeadCreate from "../pages/leads/LeadCreate";
import LeadDetail from "../pages/leads/LeadDetail";
import LeadUpdate from "../pages/leads/LeadUpdate";
import MyLeads from "../pages/leads/MyLeads";

/* ===========================
   Deals
=========================== */

import DealList from "../pages/deals/DealList";
import DealCreate from "../pages/deals/DealCreate";
import DealDetail from "../pages/deals/DealDetail";
import DealUpdate from "../pages/deals/DealUpdate";

/* ===========================
   Tasks
=========================== */

import TaskList from "../pages/tasks/TaskList";
import TaskCreate from "../pages/tasks/TaskCreate";
import TaskDetail from "../pages/tasks/TaskDetail";
import TaskUpdate from "../pages/tasks/TaskUpdate";
import MyTasks from "../pages/tasks/MyTasks";
import TodayTasks from "../pages/tasks/TodayTasks";
import OverdueTasks from "../pages/tasks/OverdueTasks";

/* ===========================
   Activities
=========================== */

import ActivityList from "../pages/activities/ActivityList";

/* ===========================
   Reports
=========================== */

import ReportsDashboard from "../pages/reports/ReportsDashboard";
import SalesReport from "../pages/reports/SalesReport";
import LeadReport from "../pages/reports/LeadReport";
import ActivityReport from "../pages/reports/ActivityReport";
import ReportsAnalytics from "../pages/reports/ReportsAnalytics";

/* ===========================
   Users
=========================== */

import UserList from "../pages/users/UserList";
import UserDetail from "../pages/users/UserDetail";

/* ===========================
   Notifications
=========================== */

import NotificationList from "../pages/notifications/NotificationList";

/* ===========================
   Communications
=========================== */

import CommunicationList from "../pages/communications/CommunicationList";
import CommunicationCreate from "../pages/communications/CommunicationCreate";
import CommunicationDetail from "../pages/communications/CommunicationDetail";
import CommunicationUpdate from "../pages/communications/CommunicationUpdate";

/* ===========================
   Settings
=========================== */

import SettingsDashboard from "../pages/settings/SettingsDashboard";
import ProfileSettings from "../pages/settings/ProfileSettings";
import ChangePassword from "../pages/settings/ChangePassword";
import NotificationSettings from "../pages/settings/NotificationSettings";
import SystemSettings from "../pages/settings/SystemSettings";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>
                {/* ===========================
            Authentication
        =========================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ===========================
            Dashboard
        =========================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ===========================
            Customers
        =========================== */}

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomerList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers/create"
          element={
            <ProtectedRoute>
              <CustomerCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers/:id"
          element={
            <ProtectedRoute>
              <CustomerDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers/:id/edit"
          element={
            <ProtectedRoute>
              <CustomerUpdate />
            </ProtectedRoute>
          }
        />

        {/* ===========================
            Leads
        =========================== */}

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <LeadList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/create"
          element={
            <ProtectedRoute>
              <LeadCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/:id"
          element={
            <ProtectedRoute>
              <LeadDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/:id/edit"
          element={
            <ProtectedRoute>
              <LeadUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-leads"
          element={
            <ProtectedRoute>
              <MyLeads />
            </ProtectedRoute>
          }
        />

        {/* ===========================
            Deals
        =========================== */}

        <Route
          path="/deals"
          element={
            <ProtectedRoute>
              <DealList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/deals/create"
          element={
            <ProtectedRoute>
              <DealCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/deals/:id"
          element={
            <ProtectedRoute>
              <DealDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/deals/:id/edit"
          element={
            <ProtectedRoute>
              <DealUpdate />
            </ProtectedRoute>
          }
        />

                {/* ===========================
            Tasks
        =========================== */}

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/create"
          element={
            <ProtectedRoute>
              <TaskCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <TaskDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/:id/edit"
          element={
            <ProtectedRoute>
              <TaskUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/my-tasks"
          element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/today"
          element={
            <ProtectedRoute>
              <TodayTasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/overdue"
          element={
            <ProtectedRoute>
              <OverdueTasks />
            </ProtectedRoute>
          }
        />

        {/* ===========================
            Activities
        =========================== */}

        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <ActivityList />
            </ProtectedRoute>
          }
        />

        {/* ===========================
            Reports
        =========================== */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                roles={["ADMIN", "MANAGER"]}
              >
                <ReportsDashboard />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports/sales"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                roles={["ADMIN", "MANAGER"]}
              >
                <SalesReport />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports/leads"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                roles={["ADMIN", "MANAGER"]}
              >
                <LeadReport />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports/activities"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                roles={["ADMIN", "MANAGER"]}
              >
                <ActivityReport />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports/analytics"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                roles={["ADMIN", "MANAGER"]}
              >
                <ReportsAnalytics />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* ===========================
            Users
        =========================== */}

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                roles={["ADMIN"]}
              >
                <UserList />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                roles={["ADMIN"]}
              >
                <UserDetail />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* ===========================
            Notifications
        =========================== */}

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationList />
            </ProtectedRoute>
          }
        />

                {/* ===========================
            Communications
        =========================== */}

        <Route
          path="/communications"
          element={
            <ProtectedRoute>
              <CommunicationList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/communications/create"
          element={
            <ProtectedRoute>
              <CommunicationCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/communications/:id"
          element={
            <ProtectedRoute>
              <CommunicationDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/communications/:id/edit"
          element={
            <ProtectedRoute>
              <CommunicationUpdate />
            </ProtectedRoute>
          }
        />

        {/* ===========================
            Settings
        =========================== */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/profile"
          element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/notifications"
          element={
            <ProtectedRoute>
              <NotificationSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/system"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                roles={[
                  "ADMIN",
                  "MANAGER",
                ]}
              >
                <SystemSettings />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* ===========================
            Default Route
        =========================== */}

        <Route
          path="*"
          element={<Login />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;