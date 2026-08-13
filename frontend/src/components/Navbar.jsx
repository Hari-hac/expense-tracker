import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <span>Expense Tracker</span>
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        MERN Stack Application
      </div>
    </nav>
  );
}
