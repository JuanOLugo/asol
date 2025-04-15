"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Save,
  User,
  Mail,
  Lock,
  CreditCard,
  Briefcase,
  Tag,
  BookOpen,
  Calendar,
} from "lucide-react";
import { TrainerFormProps } from "../Interface/Trainer";
import { Trainer } from "../Views/Capacitation";
import TrainerRepository from "../Repository/Trainer";

export function TrainerForm({
  trainer,
  isEditing,
  onAdd,
  onUpdate,
  onCancel,
}: TrainerFormProps) {

  const { handleChange, handleSubmit } = new TrainerRepository();
  const [formData, setFormData] = useState<Omit<Trainer, "id" | "createAt">>({
    dni: "",
    name: "",
    lastName: "",
    password: "",
    email: "",
    cargo: "",
    categoria: "",
    capacitacion: "",
  });

  // Update form data when trainer changes
  useEffect(() => {
    if (trainer && isEditing) {
      setFormData({
        dni: trainer.dni,
        name: trainer.name,
        lastName: trainer.lastName,
        password: trainer.password,
        email: trainer.email,
        cargo: trainer.cargo,
        categoria: trainer.categoria,
        capacitacion: trainer.capacitacion,
      });
    } else {
      // Reset form when not editing
      setFormData({
        dni: "",
        name: "",
        lastName: "",
        password: "",
        email: "",
        cargo: "",
        categoria: "",
        capacitacion: "",
      });
    }
  }, [trainer, isEditing]);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Mock data for select options
  const cargoOptions = ["Auxiliar Operativo", "Montacarguista", "Supervisor", "Analista SST"];
  const categoriaOptions = [
    "Area T1",
    "Area Lineas",
    "Materia Primas",
    "Area de estibas"
  ];
  const capacitacionOptions = [
    "Reparacion y clasificacion de estibas cerveceras",
    "Redes Sociales",
    "Gestión de Proyectos",
    "Liderazgo",
    "UX/UI",
    "Estrategia de Ventas",
  ];

  

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          {isEditing ? "Editar Capacitador" : "Registrar Nuevo Capacitador"}
        </h2>
      </div>

      <form onSubmit={(e) => handleSubmit(e, isEditing, trainer, formData, onUpdate, onAdd)} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DNI */}
          <div className="space-y-2">
            <label
              htmlFor="dni"
              className="block text-sm font-medium text-gray-700"
            >
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
                value={formData.dni}
                onChange={(e) => handleChange(e, setFormData)}
                placeholder="12345678"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
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
                value={formData.name}
                onChange={(e) => handleChange(e, setFormData)}
                placeholder="Juan"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
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
                value={formData.lastName}
                onChange={(e) => handleChange(e, setFormData)}
                placeholder="Pérez"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <Mail size={18} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange(e, setFormData)}
                placeholder="ejemplo@correo.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <Lock size={18} />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange(e, setFormData)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Cargo (Select) */}
          <div className="space-y-2">
            <label
              htmlFor="cargo"
              className="block text-sm font-medium text-gray-700"
            >
              Cargo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <Briefcase size={18} />
              </div>
              <select
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={(e) => handleChange(e, setFormData)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                required
              >
                <option value="" disabled>
                  Seleccionar cargo
                </option>
                {cargoOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Categoria (Select) */}
          <div className="space-y-2">
            <label
              htmlFor="categoria"
              className="block text-sm font-medium text-gray-700"
            >
              Categoría
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <Tag size={18} />
              </div>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={(e) => handleChange(e, setFormData)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                required
              >
                <option value="" disabled>
                  Seleccionar categoría
                </option>
                {categoriaOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Capacitacion (Select) */}
          <div className="space-y-2">
            <label
              htmlFor="capacitacion"
              className="block text-sm font-medium text-gray-700"
            >
              Capacitación
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <BookOpen size={18} />
              </div>
              <select
                id="capacitacion"
                name="capacitacion"
                value={formData.capacitacion}
                onChange={(e) => handleChange(e, setFormData)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                required
              >
                <option value="" disabled>
                  Seleccionar capacitación
                </option>
                {capacitacionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Creation Date (Display only when editing) */}
        {isEditing && trainer && (
          <div className="mt-6 flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2" />
            <span>Creado el: {formatDate(trainer.createAt)}</span>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Save size={18} />
            <span>{isEditing ? "Actualizar" : "Guardar"}</span>
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
