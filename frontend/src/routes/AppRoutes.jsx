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

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;