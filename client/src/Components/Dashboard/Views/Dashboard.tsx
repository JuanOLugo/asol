"use client"

import { DashboardHeader } from "../Components/DashboardHeader"
import { StatsCards } from "../Components/StatsCards"
import { ExamChart } from "../Components/ExamCharts"

export default function Dashboard() {
  // Mock data for stats
  const stats = {
    capacitadores: 24,
    cursos: 15,
    admins: 8,
  }

  // Mock data for chart
  const chartData = [
    { month: "Enero", count: 12 },
    { month: "Febrero", count: 15 },
    { month: "Marzo", count: 18 },
    { month: "Abril", count: 14 },
    { month: "Mayo", count: 22 },
    { month: "Junio", count: 26 },
    { month: "Julio", count: 20 },
    { month: "Agosto", count: 24 },
    { month: "Septiembre", count: 28 },
    { month: "Octubre", count: 30 },
    { month: "Noviembre", count: 25 },
    { month: "Diciembre", count: 32 },
  ]

  return (
    <div className="min-h-screen w-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader />
        <StatsCards stats={stats} />
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Capacitadores que aprobaron exámenes</h2>
          <ExamChart data={chartData} />
        </div>
      </div>
    </div>
  )
}
