"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, CreditCard } from "lucide-react"
import IAdmin from "../Interfaces/Admin"
import AdminRepository from "../Repository/Admin"

export default function AdminRegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { handleChange, handleSubmit, togglePasswordVisibility } = AdminRepository;
  const [formData, setFormData] = useState<Omit<IAdmin,"enterprise">>({
    dni: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    createAt: new Date().toLocaleDateString("es-CO"),
  })


  return (
    <div className="flex items-center justify-center absolute -z-10 top-0 left-0 w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-md px-4">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Crear una cuenta</h2>
            <p className="text-gray-600 mt-1">Ingresa tus datos para registrarte</p>
          </div>

          <form onSubmit={(e) => handleSubmit(e, formData, "register")} className="p-6">
            <div className="space-y-4">
              {/* DNI Field - Linear on all screens */}
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

              {/* Name and Last Name Fields - Side by side on desktop, stacked on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <User size={18} />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Juan"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => handleChange(e, setFormData)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Apellido
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <User size={18} />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Pérez"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => handleChange(e, setFormData)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email Field - Linear on all screens */}
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

              {/* Password Field - Linear on all screens */}
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
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
