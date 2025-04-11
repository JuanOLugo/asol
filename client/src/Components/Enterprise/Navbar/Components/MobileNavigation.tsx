import { Info, LogOut, ShieldUser, UserPlus } from "lucide-react";
import IEnterpriseMobileMenu from "../../Interfaces/EnterpriseMobileMenu";
import HrefNavbar from "./HrefNavbar";
function MobileNavigation({
  isMenuOpen,
  LogoutEnterprise,
  setIsMenuOpen,
  LogoutAdmin
}: IEnterpriseMobileMenu) {
  return (
    <>
      {isMenuOpen && (
        <div className="md:hidden h-screen absolute z-10  left-0 w-full bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
            <HrefNavbar LogoutAdmin={LogoutAdmin} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} LogoutEnterprise={LogoutEnterprise} />
          </div>
        </div>
      )}
    </>
  );
}

export default MobileNavigation;
