import IButtonMobileMenu from "../../Interfaces/EnterpriseButtonMobileMenu";
import { Menu, X } from "lucide-react";

function ButtonMobileMenu({ setIsMenuOpen, isMenuOpen }: IButtonMobileMenu) {
  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none "
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
}

export default ButtonMobileMenu;
