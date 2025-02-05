import React, { useEffect, useRef, useState } from "react";
import "./Expenses.css";
import { useAuth } from "./AuthProvider";
import {
  createExpenses,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../api/expense";
import { toast } from "react-toastify";
import { CURRENCY_SYMBOLS } from "../constants";

export const Expenses = () => {
  const [isPending, setIsPending] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  
  const { user } = useAuth();

 
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const amountRef = useRef(null);
  const tagRef = useRef(null);
  const currencyRef = useRef(null);


  const resetFields = () => {
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    amountRef.current.value = "";
    tagRef.current.value = "food";
    currencyRef.current.value = "ILS";
    setEditingExpense(null);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const amount = amountRef.current.value;
    const tag = tagRef.current.value;
    const currency = currencyRef.current.value;

    
    const payload = {
      userId: user.id,
      title,
      description,
      amount: Number(amount),
      tag,
      currency,
    };

    try {
      setIsPending(true);

      if (editingExpense) {
        
        const data = await updateExpense(editingExpense._id, payload);
        toast.success(data.message || "Expense updated successfully");

      
        if (data.expense) {
          setExpenses((prev) =>
            prev.map((exp) => (exp._id === editingExpense._id ? data.expense : exp))
          );
        } else {
          
          setExpenses((prev) =>
            prev.map((exp) => {
              if (exp._id === editingExpense._id) {
                return { ...exp, ...payload }; 
              }
              return exp;
            })
          );
        }
      } else {
       
        const data = await createExpenses(payload);
        toast.success(data.message || "Expense added successfully");

        if (data.expense) {
          setExpenses((prev) => [...prev, data.expense]);
        }
      }

      resetFields();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  
  useEffect(() => {
    if (!user) return; 
    const fetchData = async () => {
      try {
        const data = await getExpenses(user.id);
        setExpenses(data);
        console.log(data);
        
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [user]);

  
  const handleDelete = async (expenseId) => {
    if (!user) return;
    try {
      const data = await deleteExpense(user.id, expenseId);
      toast.success(data.message || "Expense deleted successfully");
      setExpenses((prev) => prev.filter((exp) => exp._id !== expenseId));
    } catch (error) {
      toast.error(error.message);
    }
  };

  
  const handleEdit = (expense) => {
    titleRef.current.value = expense.title;
    descriptionRef.current.value = expense.description;
    amountRef.current.value = expense.amount;
    tagRef.current.value = expense.tag;
    currencyRef.current.value = expense.currency;
    setEditingExpense(expense);
  };

  return (
    <main className="expense-container">
      <h1>Expenses</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" ref={titleRef} id="title" required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" ref={descriptionRef} id="description" required />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input type="number" ref={amountRef} id="amount" required />
        </div>
        <div>
          <label htmlFor="tag">Tag</label>
          <select id="tag" ref={tagRef} required>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="transport">Transport</option>
            <option value="clothing">Clothing</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="currency">Currency</label>
          <select id="currency" ref={currencyRef}>
            <option value="ILS">ILS</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <button type="submit" className="expense-button" disabled={isPending}>
          {editingExpense ? "Edit Expense" : "Add Expense"}
        </button>
      </form>

      <table className="expenses-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Tag</th>
            <th>Currency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.title}</td>
              <td>{expense.description}</td>
              <td>
                {expense.amount}
                {CURRENCY_SYMBOLS[expense.currency]}
              </td>
              <td>{expense.tag}</td>
              <td>{expense.currency}</td>
              <td>
                <div className="action-buttons">
                  <button onClick={() => handleEdit(expense)} className="edit-button">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
