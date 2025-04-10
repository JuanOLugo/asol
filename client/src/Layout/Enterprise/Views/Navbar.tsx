import { Info, LogOut, ShieldUser } from "lucide-react";
import NavbarController from "../../../Components/Enterprise/Navbar/Controllers/Navbar";
import { useEffect, useState } from "react";
import IEnterprise from "../../../Components/Enterprise/Interfaces/Enterprise";
import EnterpriseRepository from "../../../Components/Enterprise/Navbar/Repository/Navbar";
function Navbar() {
  const { getEnterpriseInfo } = NavbarController;
  const { LogoutEnterprise } = EnterpriseRepository;
  const [EnterpriseBasic, setEnterpriseBasic] = useState<IEnterprise>();
  useEffect(() => {
    getEnterpriseInfo().then((res) => setEnterpriseBasic(res));
  }, []);

  if (!EnterpriseBasic) return null;
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center gap-4 font-bold text-2xl">
        <h1>{EnterpriseBasic.name}</h1>
      </div>
      <div className="flex items-center gap-4 ">
        <div className="flex items-center gap-2 cursor-pointer">
          <ShieldUser />
          <button>Inicio como administrador</button>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <Info />
          <button>Informacion de la empresa</button>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <Info />
          <button>Crear administrador</button>
        </div>
        <div className="flex items-center gap-2 cursor-pointer " onClick={LogoutEnterprise}>
          <LogOut />
          <button className="" >Cerrar sesion</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
