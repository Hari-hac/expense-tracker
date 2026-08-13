import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ExpenseChart({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="charts-section">
        <div className="charts-section-title">Analytics & Visualizations</div>
        <div className="empty-state">
          <p>No expense data available to generate charts.</p>
        </div>
      </div>
    );
  }

  // Aggregate totals by category
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const labels = Object.keys(categoryTotals);
  const dataValues = Object.values(categoryTotals);

  const colors = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#06b6d4',
    '#84cc16',
  ];

  // Doughnut Chart Data
  const doughnutData = {
    labels,
    datasets: [
      {
        label: 'Spent (₹)',
        data: dataValues,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: '#1e293b',
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          font: { family: 'Plus Jakarta Sans', size: 12 },
          padding: 12,
        },
      },
    },
  };

  // Bar Chart Data
  const barData = {
    labels,
    datasets: [
      {
        label: 'Amount (₹)',
        data: dataValues,
        backgroundColor: colors.slice(0, labels.length),
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => ` Spent: ₹${context.raw.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#334155' },
        ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11 } },
      },
    },
  };

  return (
    <div className="charts-section">
      <div className="charts-section-title">Analytics & Visualizations</div>

      <div className="charts-grid">
        {/* Chart 1: Doughnut Chart */}
        <div className="chart-card">
          <div className="chart-card-title">Category Distribution</div>
          <div className="chart-wrapper" style={{ height: '240px' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* Chart 2: Bar Chart */}
        <div className="chart-card">
          <div className="chart-card-title">Category Spending Comparison</div>
          <div className="chart-wrapper" style={{ height: '240px' }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
