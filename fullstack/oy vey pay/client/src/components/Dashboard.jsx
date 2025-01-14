import React from 'react'
import { useAuth } from './AuthProvider'

export const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="dashboard"> 
      <header className="dashboard-header">
        <h1>Hello {user.fullname}</h1>
      </header>

      <div className="summary">
        <div className="card income">
          <h2>Total Incomes</h2>
          <p>$1000</p>
        </div>
      </div>

      <div className="summary">
        <div className="card expense">
          <h2>Total Expenses</h2>
          <p>$500</p>
        </div>
      </div>

      <div className="summary">
        <div className="card balance">
          <h2>Total Balance</h2>
          <p>$500</p>
        </div>
      </div>
    </div>
  );
}
