import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";

import ProtectedRoute from
"../components/common/ProtectedRoute";

import CustomerList from
"../pages/customers/CustomerList";

import CustomerCreate from
"../pages/customers/CustomerCreate";

import CustomerDetail from
"../pages/customers/CustomerDetail";

import LeadList from
"../pages/leads/LeadList";

import LeadCreate from
"../pages/leads/LeadCreate";

import LeadDetail from
"../pages/leads/LeadDetail";

import MyLeads from
"../pages/leads/MyLeads";

import DealList from "../pages/deals/DealList";
import DealCreate from "../pages/deals/DealCreate";
import DealDetail from "../pages/deals/DealDetail";

import TaskList from "../pages/tasks/TaskList";
import TaskCreate from "../pages/tasks/TaskCreate";
import TaskDetail from "../pages/tasks/TaskDetail";
import MyTasks from "../pages/tasks/MyTasks";
import TodayTasks from "../pages/tasks/TodayTasks";
import OverdueTasks from "../pages/tasks/OverdueTasks";
import ActivityList

from "../pages/activities/ActivityList";
import ReportsDashboard

from "../pages/reports/ReportsDashboard";
import SalesReport
from "../pages/reports/SalesReport";
import LeadReport
from "../pages/reports/LeadReport";
import ActivityReport
from "../pages/reports/ActivityReport";
import ReportsAnalytics
from "../pages/reports/ReportsAnalytics";

import UserList
from "../pages/users/UserList";

import UserDetail
from "../pages/users/UserDetail";

import NotificationList
from "../pages/notifications/NotificationList";

import CustomerUpdate from "../pages/customers/CustomerUpdate";
import LeadUpdate from "../pages/leads/LeadUpdate";
import DealUpdate from "../pages/deals/DealUpdate";
import TaskUpdate from "../pages/tasks/TaskUpdate";

import CommunicationList from "../pages/communications/CommunicationList";

import CommunicationCreate from
"../pages/communications/CommunicationCreate";

import CommunicationDetail from
"../pages/communications/CommunicationDetail";

import CommunicationUpdate from
"../pages/communications/CommunicationUpdate";

import SettingsDashboard from
"../pages/settings/SettingsDashboard";

import ProfileSettings from
"../pages/settings/ProfileSettings";

import ChangePassword from
"../pages/settings/ChangePassword";

import NotificationSettings from "../pages/settings/NotificationSettings";
import SystemSettings from "../pages/settings/SystemSettings";


function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

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
          path="/my-leads"
          element={
            <ProtectedRoute>
              <MyLeads />
            </ProtectedRoute>
          }
        />

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

        <Route
          path="/activities"
          element={<ActivityList />}
        />

        <Route
          path="/reports"
          element={<ReportsDashboard />}
        />

        <Route
          path="/reports/sales"
          element={<SalesReport />}
        />

        <Route
          path="/reports/leads"
          element={<LeadReport />}
      />

      <Route
        path="/reports/activities"
        element={<ActivityReport />}
      />

      <Route
        path="/reports/analytics"
        element={<ReportsAnalytics />}
      />

      <Route
        path="/users"
        element={<UserList />}
      />

      <Route
        path="/users/:id"
        element={<UserDetail />}
      />

      <Route
        path="/notifications"
        element={
          <NotificationList />
        }
      />

      <Route
        path="/customers/:id/edit"
        element={<CustomerUpdate />}
      />

      <Route
        path="/leads/:id/edit"
        element={<LeadUpdate />}
      />

      <Route
        path="/deals/:id/edit"
        element={<DealUpdate />}
      />

      <Route
        path="/tasks/:id/edit"
        element={<TaskUpdate />}
      />

      <Route
        path="/communications"
        element={
          <CommunicationList />
        }
      />

      <Route
        path="/communications/create"
        element={
          <CommunicationCreate />
        }
      />

      <Route
        path="/communications/:id"
        element={
          <CommunicationDetail />
        }
      />

      <Route
        path="/communications/:id/edit"
        element={
          <CommunicationUpdate />
        }
      />

      <Route
        path="/settings"
        element={<SettingsDashboard />}
      />

      <Route
        path="/settings/profile"
        element={<ProfileSettings />}
      />

      <Route
        path="/settings/password"
        element={<ChangePassword />}
      />

      <Route
        path="/settings/notifications"
        element={
          <NotificationSettings />
        }
      />

      <Route
        path="/settings/system"
        element={
          <SystemSettings />
        }
      />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;