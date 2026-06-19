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
  },

  {
    name: "Customers",
    path: "/customers",
    icon: FaUsers,
  },

  {
    name: "Leads",
    path: "/leads",
    icon: FaUserTie,
  },

  {
    name: "Deals",
    path: "/deals",
    icon: FaHandshake,
  },

  {
    name: "Tasks",
    path: "/tasks",
    icon: FaTasks,
  },

  {
    name: "Activities",
    path: "/activities",
    icon: FaHistory,
  },

  {
    name: "Reports",
    path: "/reports",
    icon: FaChartBar,
  },

  {
    name: "Communications",
    path: "/communications",
    icon: FaComments,
  },

  {
    name: "Users",
    path: "/users",
    icon: FaUserCog,
  },

  {
    name: "Settings",
    path: "/settings",
    icon: FaCog,
  },

];