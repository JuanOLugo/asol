import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../Layout/Admin/Views/Navbar";
function AdminRoutes() {
  const token = Cookies.get("admin-token");
  const enterpriseToken = window.localStorage.getItem("enterprise-session");
  if (!token && !enterpriseToken) {
    return <Navigate to="/enterprise/adminlogin" />;
  }
  return (
    <div className="flex">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AdminRoutes;
