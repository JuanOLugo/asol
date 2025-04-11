import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, CreditCard } from "lucide-react"
import IAdmin from "../Interfaces/Admin"
import AdminRepository from "../Repository/Admin"
import Cookies from "js-cookie"
export default function AdminLoginForm() {
  const { handleChange, handleSubmit, togglePasswordVisibility } = AdminRepository;
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<Omit<IAdmin,"enterprise" >>({
    dni: "",
    email: "",
    password: "",
    createAt: "",
    lastName: "",
    name: "",
  })

  if(Cookies.get("admin-token")){
    return window.location.href = "/enterprise"
  }

  return (
    <div className="flex items-center justify-center absolute -z-10 top-0 left-0 w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-md px-4">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Iniciar sesión</h2>
            <p className="text-gray-600 mt-1">Ingresa tus credenciales para acceder a tu cuenta</p>
          </div>

          <form onSubmit={(e) => handleSubmit(e, formData, "login")} className="p-6">
            <div className="space-y-4">
              {/* DNI Field */}
              <div className="space-y-2">
                <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                  DNI
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <CreditCard size={18} />
                  </div>
                  <input
                    id="dni"
                    name="dni"
                    type="text"
                    placeholder="12345678"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => handleChange(e, setFormData)}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => handleChange(e, setFormData)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => handleChange(e, setFormData)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                    onClick={() => togglePasswordVisibility(setShowPassword, showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember me and Forgot password 
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Recordarme
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>*/}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
