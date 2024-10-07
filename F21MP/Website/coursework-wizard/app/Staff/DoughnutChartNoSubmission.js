"use client";

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, registerables } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ...registerables);

const DoughnutChartCompleted = () => {
  // Example values
  const noSubmissionTasks = 16; // Hardcoded no submission tasks
  const totalTasks = 34; // Example total tasks
  const noSubmissionPercentage = ((noSubmissionTasks / totalTasks) * 100).toFixed(2); // Calculate percentage

  const data = {
    labels: ['No Submission', 'Remaining'],
    datasets: [
      {
        label: '# of Students',
        data: [noSubmissionTasks, totalTasks - noSubmissionTasks], // Data for no submission and remaining tasks
        backgroundColor: [
          'rgba(255, 99, 132, 1)',  // No submission (dark)
          'rgba(255, 99, 132, 0.2)', // Remaining (light)
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',  // No submission (dark)
          'rgba(255, 99, 132, 0.2)', // Remaining (light)
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
    ctx.fillStyle = 'rgba(255, 206, 86, 1)';
    ctx.fillText(`${noSubmissionPercentage}%`, chart.width / 3.5, chart.height / 2); // Center text
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
