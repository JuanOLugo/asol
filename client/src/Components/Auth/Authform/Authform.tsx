"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, FileText } from "lucide-react";
import IEnterprise from "./Interfaces/IEnterprise";
import { AuthFormRepository } from "./Repositories/Authform";
export default function AuthForm() {
  
  const {handleSubmit, handleChange, togglePasswordVisibility} = new AuthFormRepository();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<IEnterprise>({
    name: "",
    description: "",
    email: "",
    password: "",
    createAt: new Date().toLocaleDateString("es-co"),
  });


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md px-4">
        {/* Custom Tabs */}
        <div className="flex mb-6 border rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "login"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "register"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Registrar
          </button>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Login Form */}
          {activeTab === "login" && (
            <div>
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800">
                  Bienvenido de nuevo
                </h2>
                <p className="text-gray-600 mt-1">
                  Ingresa tus credenciales para acceder a tu cuenta
                </p>
              </div>
              <form
                onSubmit={(e) => handleSubmit(e, activeTab, formData)}
                className="p-6"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="login-email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <Mail size={18} />
                      </div>
                      <input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="nombre@dominio.com"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => handleChange(e, setFormData)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="login-password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <Lock size={18} />
                      </div>
                      <input
                        id="login-password"
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
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
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
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <div>
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800">
                  Crea una cuenta
                </h2>
                <p className="text-gray-600 mt-1">
                  Ingresa tus datos para registrar una cuenta
                </p>
              </div>
              <form onSubmit={(e) => handleSubmit(e, activeTab, formData)} className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="register-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <User size={18} />
                      </div>
                      <input
                        id="register-name"
                        name="name"
                        placeholder="Empresa o nombre"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => handleChange(e, setFormData)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="register-description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Descripción
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <FileText size={18} />
                      </div>
                      <input
                        id="register-description"
                        name="description"
                        placeholder="Descripcion de la empresa"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => handleChange(e, setFormData)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="register-email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <Mail size={18} />
                      </div>
                      <input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="nombre@dominio.com"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => handleChange(e, setFormData)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="register-password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <Lock size={18} />
                      </div>
                      <input
                        id="register-password"
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
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Crear cuenta
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
