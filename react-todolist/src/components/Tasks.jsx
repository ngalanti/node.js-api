import { useEffect, useState } from "react";
import "./Tasks.css";
import { v4 as uuidv4 } from "uuid";
import { Trash2, Pencil, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router";

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIdTask, setEditIdTask] = useState(null);

  const navigate = useNavigate();
  
  useEffect(()=>{
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    if(savedTasks){
      setTasks(savedTasks);
    }
  },[]);
  
  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
  },[tasks]);


  function upsertTask() {
    if (!inputValue.trim()) return;

    if (editIdTask) {
      const newTasks = tasks.map((task) =>
        task.id === editIdTask ? { ...task, text: inputValue } : task
      );
      setTasks(newTasks);
      setEditIdTask(null);
    } else {
      const newTask = {
        id: uuidv4(),
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }

    setInputValue("");
    document.getElementById("input-task").focus();
  }

  function deleteTask(id) {
    
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }
  function editTask(task) {
    setInputValue(task.text);
    setEditIdTask(task.id);
  }

  function toggleTaskCompleted(task) {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  }

  return (
    <main>
      <div className="app">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            id="input-task"
            type="text"
            placeholder="הכנס משימה..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && upsertTask()}
          />
          <button onClick={upsertTask}>{editIdTask ? "Save" : "Add"}</button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`${task.completed ? "completed" : ""}`} >
              <span onClick={()=>navigate('/task/${task.id}')}>{task.text}</span>
              <div className="icons-wrapper">
                <Trash2 className="trash" onClick={() => deleteTask(task.id)} />
                <Pencil className="edit" onClick={() => editTask(task)} />
                <CheckCheck
                  className="check"
                  onClick={() => toggleTaskCompleted(task)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};
