import React from 'react'
import './Expenses.css'


export const Expenses = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
    };


  return (
    <main className='expenses-container'>
    <h1>Expenses</h1>
    <form onSubmit={handleSubmit}> 
        <div>
            <label htmlFor="title">Title</label>
            <input 
            type="text"
            id="title" 
            placeholder='Enter title'
            required
            />
        </div>
        <div>
            <label htmlFor="description">Description</label>
            <input 
            type="text"
            id="description" 
            placeholder='Enter the description'
            required
            />
        </div>
        <div>
            <label htmlFor="amount">Amount</label>
            <input
            type="number"
            inputMode='numeric'
            id="amount" 
            placeholder='Enter the amount'
            required
            />
        </div>
        <div>
            <label htmlFor='tag'>Tag</label>
            <select id='tag' required>
                <option value='food'>Food</option>
                <option value='rent'>Rent</option>
                <option value='transport'>Transport</option>
                <option value='clothing'>Clothing</option>
                <option value='entertainment'>Entertainment</option>
                <option value='health'>Health</option>
                <option value='education'>Education</option>
                <option value='other'>Other</option>
            </select>
        </div>
        <div>
            <label htmlFor="currency">Currency</label>
            <select id="currency">
                <option value='ILS'>ILS</option>
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
            </select>
        </div>
        <button type='submid' className='expense-button'>
        Add Expense</button>
    </form>
    <table className='expenses-table'>
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
            <tr>
                <td>Groceries</td>
                <td>Weekley Groceries</td>
                <td>150</td>
                <td>Food</td>
                <td>ILS</td>
                <td>
                    <div className='action-buttons'>
                        <button className='edit-button'>Edit</button>
                        <button className='delete-button'>Delete</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    </main>
  );
};

