"use client";

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip);

const DoughnutChart = () => {
  const data = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        label: '# of Students',
        data: [2, 1, 1], // Hardcoded
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)', // Green (Completed)
          'rgba(255, 206, 86, 0.2)',  // Yellow (In Progress)
          'rgba(255, 99, 132, 0.2)',  // Red (Pending)
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Do not display legend because it is there on dashboard
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: '60%', // Adjust this value to control the thickness of the doughnut
  };

  return (
    <div style={{ width: '215px', height: '215px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
