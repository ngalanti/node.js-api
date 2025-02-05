import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import "./Dashboard.css";
import { getTotalExpenses } from "../api/expense";

export const Dashboard = () => {
  const { user } = useAuth();
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchTotalExpenses = async () => {
      try {        
        const data = await getTotalExpenses(user.id);
        setTotalExpense(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTotalExpenses();
  }, []);

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
          <p>{totalExpense}</p>
        </div>

        <div className="card balance">
          <h2>Balance</h2>
          <p>$200</p>
        </div>
      </div>
    </div>
  );
};