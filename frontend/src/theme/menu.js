import {
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaHandshake,
  FaTasks,
  FaHistory,
  FaChartBar,
  FaUserCog,
  FaCog,
  FaComments,
} from "react-icons/fa";

export const MENU_ITEMS = [

  {
    name: "Dashboard",
    path: "/dashboard",
    icon: FaTachometerAlt,
    roles: [
      "ADMIN",
      "MANAGER",
      "SALES_EXECUTIVE",
    ],
  },

  {
    name: "Customers",
    path: "/customers",
    icon: FaUsers,
    roles: [
      "ADMIN",
      "MANAGER",
      "SALES_EXECUTIVE",
    ],
  },

  {
    name: "Leads",
    path: "/leads",
    icon: FaUserTie,
    roles: [
      "ADMIN",
      "MANAGER",
      "SALES_EXECUTIVE",
    ],
  },

  {
    name: "Deals",
    path: "/deals",
    icon: FaHandshake,
    roles: [
      "ADMIN",
      "MANAGER",
      "SALES_EXECUTIVE",
    ],
  },

  {
    name: "Tasks",
    path: "/tasks",
    icon: FaTasks,
    roles: [
      "ADMIN",
      "MANAGER",
      "SALES_EXECUTIVE",
    ],
  },

  {
    name: "Activities",
    path: "/activities",
    icon: FaHistory,
    roles: [
      "ADMIN",
      "MANAGER",
      "SALES_EXECUTIVE",
    ],
  },

  {
    name: "Reports",
    path: "/reports",
    icon: FaChartBar,
    roles: [
      "ADMIN",
      "MANAGER",
    ],
  },

  {
    name: "Communications",
    path: "/communications",
    icon: FaComments,
    roles: [
      "ADMIN",
      "MANAGER",
      "SALES_EXECUTIVE",
    ],
  },

  {
    name: "Users",
    path: "/users",
    icon: FaUserCog,
    roles: [
      "ADMIN",
    ],
  },

  {
    name: "Settings",
    path: "/settings",
    icon: FaCog,
    roles: [
      "ADMIN",
      "MANAGER",
      "SALES_EXECUTIVE",
    ],
  },

];