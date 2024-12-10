import './App.css';
import { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');

  const addTask = () => {
    if (name.trim()) {
      const newTask = { id: tasks.length + 1, name: name.trim(), completed: false };
      setTasks([...tasks, newTask]);
      setName('');
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h2 className="title">To-Do List</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Add a new task..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="add-button" onClick={addTask}>
            Add
          </button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <span onClick={() => toggleTaskCompletion(task.id)}>{task.name}</span>
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
