import React from "react";
import { useAuth } from "../components/AuthProvider";
import "./Dashboard.css";

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome {user?.fullName}</h1>
      </header>

      <div className="summary">
        <div className="card income">
          <h2>Total Incomes</h2>
          <p>$1000</p>
        </div>

        <div className="card expenses">
          <h2>Total Expenses</h2>
          <p>$500</p>
        </div>

        <div className="card balance">
          <h2>Balance</h2>
          <p>$200</p>
        </div>
      </div>
    </div>
  );
};