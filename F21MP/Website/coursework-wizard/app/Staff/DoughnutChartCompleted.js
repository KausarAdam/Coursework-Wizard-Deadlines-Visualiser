"use client";

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, registerables } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ...registerables);

const DoughnutChartCompleted = () => {
  // Example values
  const completedTasks = 6; // Hardcoded completed tasks
  const totalTasks = 34; // Example total tasks
  const completedPercentage = ((completedTasks / totalTasks) * 100).toFixed(2); // Calculate percentage

  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        label: '# of Students',
        data: [completedTasks, totalTasks - completedTasks], // Data for completed and remaining tasks
        backgroundColor: [
          'rgba(75, 192, 192, 1)',  // Completed (dark)
          'rgba(75, 192, 192, 0.2)', // Remaining (light)
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',  // Border color for completed
          'rgba(75, 192, 192, 0.2)', // Border color for remaining
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
        display: false, // Do not display legend
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: '80%', // Control the thickness of the doughnut
  };

  const drawCenterText = (chart) => {
    const ctx = chart.ctx;
    ctx.save();
    const fontSize = (chart.height / 100).toFixed(2); 
    ctx.font = `${fontSize * 15}px Arial`; // Font size
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(75, 192, 192, 1)';
    ctx.fillText(`${completedPercentage}%`, chart.width / 3.5, chart.height / 2); // Center text
    ctx.restore();
  };

  const plugins = [{
    beforeDraw: drawCenterText,
  }];

  return (
    <div style={{ width: '150px', height: '150px' }}>
      <Doughnut data={data} options={options} plugins={plugins} />
    </div>
  );
};

export default DoughnutChartCompleted;
