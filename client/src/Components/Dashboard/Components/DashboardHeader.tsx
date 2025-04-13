import { UserPlus } from "lucide-react"
import { NavLink } from "react-router-dom"
import { formattedDate } from "../../../Config/Utils/Date"

export function DashboardHeader() {
  // Get current date in Spanish format
 

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-lg shadow-md p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">{formattedDate}</p>
      </div>
      <button className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <UserPlus size={18} />
        <NavLink to="/admin/create-admin">Crear Administrador</NavLink>
      </button>
    </div>
  )
}
