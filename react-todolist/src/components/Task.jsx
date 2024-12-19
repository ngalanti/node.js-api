import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import'./Task.css'
import {Undo2} from 'lucide-react'
import { useNavigate } from "react-router";



export const Task = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const task = JSON.parse(storedTasks).find((task) => task.id === id);
      setTask(task);
    }
  }, []);

  function undoTask(){
``

  }

  return(
    <div className="task-wrapper">
      <h1>Task Details</h1>
      <div className="task">
        <p>{task.text}</p>
      </div>
    {/*icons*/}
    <Undo2 className="undo-icon" onClick={()=>navigate('/')}/>
    </div>
  );
};