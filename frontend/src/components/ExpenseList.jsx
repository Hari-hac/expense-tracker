import React from 'react';

const CATEGORIES = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

export default function ExpenseList({ expenses, onDelete, selectedCategory, onSelectCategory }) {
  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Expense History</h3>
        <select
          className="form-control"
          style={{ width: 'auto', padding: '0.4rem 0.8rem' }}
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat === 'All' ? '' : cat}>
              {cat === 'All' ? 'Filter: All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <p>No expenses found. Start by adding an expense above.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td style={{ fontWeight: '600' }}>{expense.title}</td>
                <td>
                  <span className="badge">{expense.category}</span>
                </td>
                <td style={{ fontWeight: '700', color: '#60a5fa' }}>
                  ₹{expense.amount.toLocaleString('en-IN')}
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {new Date(expense.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    className="btn-icon delete"
                    title="Delete Expense"
                    onClick={() => onDelete(expense._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
