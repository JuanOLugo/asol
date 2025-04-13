"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ChartData, ExamChartProps } from "../Interfaces/Charts";

export function ExamChart({ data }: ExamChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;
    if (!data) return;

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item: ChartData) => item.month),
        datasets: [
          {
            label: "Capacitadores Aprobados",
            data: data.map((item: ChartData) => item.count),
            backgroundColor: "#3b82f6", // Blue color to match the theme
            borderColor: "#2563eb",
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 30,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
              color: "#64748b",
            },
          },
          tooltip: {
            backgroundColor: "#1e293b",
            titleFont: {
              family: "'Inter', sans-serif",
              size: 14,
            },
            bodyFont: {
              family: "'Inter', sans-serif",
              size: 13,
            },
            padding: 12,
            cornerRadius: 4,
          },
          title: {
            display: true,
            text: "Capacitadores que aprobaron exámenes por mes",
            font: {
              family: "'Inter', sans-serif",
              size: 16,
              weight: "bold",
            },
            color: "#1e293b",
            padding: {
              top: 10,
              bottom: 20,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "#e2e8f0",
            },
            ticks: {
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
              color: "#64748b",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
              color: "#64748b",
            },
          },
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="w-full h-96">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
}
