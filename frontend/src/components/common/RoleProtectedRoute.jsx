import { Navigate } from "react-router-dom";

function RoleProtectedRoute({
  children,
  roles,
}) {

  const role =
    localStorage.getItem(
      "role"
    );

  if (
    !roles.includes(role)
  ) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}

export default RoleProtectedRoute;