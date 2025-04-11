import { useState } from "react";
import { BookOpen, Users, ChevronRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarItems from "../../../Components/Enterprise/Admin/Components/NavbarItems";

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Set active menu item
  const handleMenuClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <>
      {/* Mobile Toggle Button - Only visible on small screens */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white md:hidden"
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={` h-screen border-r  bg-white shadow-lg transition-all duration-300 z-40  ${
          isOpen ? "w-64" : "w-0 md:w-20"
        } overflow-hidden`}
      >
        {/* Logo/Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1
            className={`font-bold text-xl text-gray-800 ${
              !isOpen && "md:hidden"
            }`}
          >
            Dashboard
          </h1>
          <button
            onClick={toggleSidebar}
            className="hidden md:block text-gray-500 hover:text-gray-700"
            aria-label="Toggle sidebar"
          >
            <ChevronRight
              size={20}
              className={`transition-transform duration-300 ${
                !isOpen ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>

        {/* Navigation Links */}
        <NavbarItems isOpen={isOpen}  handleMenuClick={handleMenuClick} activeItem={activeItem} />
      </div>

      {/* Overlay for mobile - closes sidebar when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Navbar;
