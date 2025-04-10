import { Navigate, Outlet } from "react-router-dom";
function PublicRoute() {
  const token = window.localStorage.getItem("enterprise-session");

  if (token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default PublicRoute;
