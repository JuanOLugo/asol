import { BookOpen, Info, LogOut, ShieldUser, Users } from "lucide-react";
import { Link } from "react-router-dom";
import IAdminNavbarProps from "../Interfaces/AdminNavbar";
import AdminNavbarRepository from "../Repository/AdminNavbar";
const HrefNavbarItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: <ShieldUser size={20} />,
  },
  {
    name: "Cursos",
    href: "/admin/cursos",
    icon: <BookOpen size={20} />,
  },
  {
    name: "Capacitadores",
    href: "/admin/capacitadores",
    icon: <Users size={20} />,
  },
  {
    name: "Cerrar sesion ",
    icon: <LogOut size={20} />,
  },
];

function NavbarItems({
  isOpen,
  handleMenuClick,
  activeItem,
}: IAdminNavbarProps) {
  const { LogoutAdmin } = AdminNavbarRepository;
  return (
    <nav className="px-2 py-4 ">
      <ul className="space-y-2">
        {/* Cursos */}

        {HrefNavbarItems.map((item, i) => {
          {
            if (item.href) {
              return (
                <li>
                  <Link
                    to={item.href}
                    onClick={() => handleMenuClick(item.name)}
                    className={`flex items-center p-4 rounded-md transition-colors ${
                      activeItem === item.name
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}

                    <span
                      className={`ml-4 font-medium ${!isOpen && "md:hidden"}`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={item.name}>
                  <button
                    onClick={() => LogoutAdmin()}
                    className={`flex items-center p-4 rounded-md transition-colors bg-blue-900 text-white`}
                  >
                    {item.icon}

                    <span
                      className={`ml-4 font-medium ${!isOpen && "md:hidden"}`}
                    >
                      {item.name}
                    </span>
                  </button>
                </li>
              );
            }
          }
        })}
      </ul>
    </nav>
  );
}

export default NavbarItems;
