interface IEnterpriseMobileMenu {
  isMenuOpen: boolean;
  LogoutEnterprise: () => void;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  LogoutAdmin: () => void;
}

export default IEnterpriseMobileMenu;
