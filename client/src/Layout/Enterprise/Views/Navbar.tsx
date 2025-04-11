import { Info, LogOut, ShieldUser, UserPlus} from "lucide-react";
import NavbarController from "../../../Components/Enterprise/Navbar/Controllers/Navbar";
import { useEffect, useState } from "react";
import IEnterprise from "../../../Components/Enterprise/Interfaces/Enterprise";
import EnterpriseRepository from "../../../Components/Enterprise/Navbar/Repository/Navbar";
import ButtonMobileMenu from "../../../Components/Enterprise/Navbar/Components/ButtonMobileMenu";
import MobileNavigation from "../../../Components/Enterprise/Navbar/Components/MobileNavigation";
import HrefNavbar from "../../../Components/Enterprise/Navbar/Components/HrefNavbar";
import AdminNavbarRepository from "../../../Components/Enterprise/Admin/Repository/AdminNavbar";
import { NavLink } from "react-router-dom";
function Navbar() {
  const { getEnterpriseInfo } = NavbarController;
  const { LogoutEnterprise } = EnterpriseRepository;
  const { LogoutAdmin } = AdminNavbarRepository;
  const [EnterpriseBasic, setEnterpriseBasic] = useState<IEnterprise>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    getEnterpriseInfo().then((res) => setEnterpriseBasic(res));
  }, []);

  if (!EnterpriseBasic) return null;
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Company Name */}
          <div className="flex items-center">
            <h1 className="font-bold text-2xl text-gray-800"><NavLink to="/enterprise">{EnterpriseBasic.name}</NavLink></h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center  ">
            <HrefNavbar LogoutAdmin={LogoutAdmin} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} LogoutEnterprise={LogoutEnterprise} />
          </div>

          {/* Mobile menu button */}
          <ButtonMobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation LogoutAdmin={LogoutAdmin} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} LogoutEnterprise={LogoutEnterprise} />
    </nav>
  );
}

export default Navbar;
