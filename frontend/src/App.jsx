import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import { fetchExpenses, addExpense, deleteExpense } from './api/expenseApi';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadExpenses = async (cat = categoryFilter) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchExpenses(cat);
      setExpenses(data.expenses || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to connect to backend server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses(categoryFilter);
  }, [categoryFilter]);

  const handleAddExpense = async (newExpense) => {
    try {
      await addExpense(newExpense);
      loadExpenses(categoryFilter);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add expense');
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    try {
      await deleteExpense(id);
      loadExpenses(categoryFilter);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete expense');
    }
  };

  const highestExpense = expenses.length > 0
    ? [...expenses].sort((a, b) => b.amount - a.amount)[0]
    : null;

  return (
    <div className="app-container">
      <Navbar />

      {error && (
        <div style={{
          padding: '0.85rem 1.25rem',
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid #ef4444',
          borderRadius: '6px',
          color: '#fca5a5',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>⚠️ {error}</span>
          <button className="btn-submit" style={{ width: 'auto', padding: '0.4rem 1rem' }} onClick={() => loadExpenses()}>
            Retry
          </button>
        </div>
      )}

      {/* Summary KPI Cards */}
      <SummaryCards total={total} count={expenses.length} highest={highestExpense} />

      {/* Dashboard Main Grid */}
      <div className="dashboard-grid">
        <div>
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>

        <div>
          {loading ? (
            <div className="table-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>Loading expenses...</p>
            </div>
          ) : (
            <ExpenseList
              expenses={expenses}
              onDelete={handleDeleteExpense}
              selectedCategory={categoryFilter}
              onSelectCategory={setCategoryFilter}
            />
          )}
        </div>
      </div>

      {/* Analytics & Dual Charts Section */}
      <ExpenseChart expenses={expenses} />
    </div>
  );
}
