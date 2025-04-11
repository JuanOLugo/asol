import { ShieldUser, Info, UserPlus, LogOut } from "lucide-react";
import IEnterpriseMobileMenu from "../../Interfaces/EnterpriseMobileMenu";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
const HrefNavbarItems = [
  {
    name: "Inicio como administrador",
    href: "/enterprise/adminlogin",
    icon: <ShieldUser size={20} />,
    validate: Cookies.get("admin-token") ? false : true,
  },
  {
    name: "Informacion de la empresa",
    href: "/enterprise/information",
    icon: <Info size={20} />,
    validate: true,
  },
  {
    name: "Administrador",
    href: "/admin",
    icon: <Info size={20} />,
    validate: Cookies.get("admin-token") ? true : false,
  },
  {
    name: "Cerrar sesion empresa",
    icon: <LogOut size={20} />,
    validate: Cookies.get("admin-token") ? false : true,
  },
  {
    name: "Cerrar sesion administrador",
    icon: <LogOut size={20} />,
    validate: Cookies.get("admin-token") ? true : false,
  },
  
];

function HrefNavbar({
  LogoutEnterprise,
  setIsMenuOpen,
  LogoutAdmin,
}: IEnterpriseMobileMenu) {
  return (
    <>
      {HrefNavbarItems.map((item, index) => {
        if (item.href && item.validate) {
          return (
            <button
              className="flex items-center  text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm  font-medium w-[320px]"
              key={index}
            >
              {item.icon}
              <NavLink className="ml-2" to={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </NavLink>
            </button>
          );
        } else if (item.href || !item.validate) {
          return null;
        } else {
          return (
            <button
              onClick={LogoutAdmin}
              className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium w-[320px]"
              key={index}
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </button>
          );
        }
      })}
    </>
  );
}

export default HrefNavbar;
