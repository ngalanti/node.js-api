import './App.css'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const handleAddTask = () => {
    if (!input.trim()) {
      return;
    }
    setTasks([...tasks, { id: uuidv4(), text: input, completed: false }]);
    setInput("");
  };

  const handleToggleTask = (task) => {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <main>
      <div className="app">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input type="text" placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={handleAddTask}>Add</button>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={⁠ ${task.completed ? "completed" : ""} ⁠}>
              <span onClick={() => handleToggleTask(task)}>{task.text}</span>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default App