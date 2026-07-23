import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import SalesDashboard from "./SalesDashboard";

function Dashboard() {

  const role =
    localStorage.getItem(
      "role"
    );

  if (!role) {

    return (
      <div
        className="
        flex
        items-center
        justify-center
        h-screen
        text-2xl
        font-bold
        "
      >
        Unauthorized Access
      </div>
    );
  }

  switch (role) {

    case "ADMIN":

      return (
        <AdminDashboard />
      );

    case "MANAGER":

      return (
        <ManagerDashboard />
      );

    case "SALES_EXECUTIVE":

      return (
        <SalesDashboard />
      );

    default:

      return (
        <div
          className="
          flex
          items-center
          justify-center
          h-screen
          text-2xl
          font-bold
          "
        >
          Invalid User Role
        </div>
      );
  }
}

export default Dashboard;