import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RatingChart = ({ ratingsCount }) => {
  console.log("🔥 RatingChart props:", ratingsCount);

  if (!ratingsCount || Object.keys(ratingsCount).length === 0) {
    return <p className="text-center text-gray-500">No chart data available.</p>;
  }

  const labels = Object.keys(ratingsCount).map((key) => ` ${key}`);
  const counts = Object.values(ratingsCount);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Feedback Count',
        data: counts,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RatingChart;
