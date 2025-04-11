import Cookies from "js-cookie";

class AdminNavbarRepository {
  public LogoutAdmin = () => {
        Cookies.remove("admin-token");
        window.location.href = "/enterprise";
  };
}

export default new AdminNavbarRepository();
