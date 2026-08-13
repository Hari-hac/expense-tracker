import React from 'react';

export default function SummaryCards({ total, count, highest }) {
  return (
    <div className="summary-grid">
      <div className="card">
        <div className="card-title">Total Spending</div>
        <div className="card-value primary">₹{total.toLocaleString('en-IN')}</div>
      </div>
      <div className="card">
        <div className="card-title">Total Transactions</div>
        <div className="card-value success">{count}</div>
      </div>
      <div className="card">
        <div className="card-title">Highest Expense</div>
        <div className="card-value warning">
          {highest ? `₹${highest.amount.toLocaleString('en-IN')}` : '₹0'}
        </div>
      </div>
    </div>
  );
}
