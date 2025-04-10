import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Layout/Enterprise/Views/Navbar";
function PrivateRoute() {
  const token = window.localStorage.getItem("enterprise-session");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default PrivateRoute;
