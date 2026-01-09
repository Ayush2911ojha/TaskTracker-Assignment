import React, { useEffect, useState } from "react";
import "./TaskTracker.css";

const TaskTracker = () => {
  const [taskInput, setTaskInput] = useState("");
    const [taskList, setTaskList] = useState(() => { 
    const savedTasks = localStorage.getItem("taskList");
    return savedTasks ? JSON.parse(savedTasks) : [];
    });
    
    useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
     }, [taskList]);

  const handleAddTask = () => {
    if (!taskInput.trim()) {
      alert("Oops! Please type a task before adding.");
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskInput,
      isDone: false,
    };

    setTaskList([...taskList, newTask]);
    setTaskInput("");
  };

  const handleToggleTask = (id) => {
    const updatedTasks = taskList.map((t) =>
      t.id === id ? { ...t, isDone: !t.isDone } : t
    );
    setTaskList(updatedTasks);
  };

  return (
    <div className="container">
      <h1>My Task Tracker</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="Type your task here..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button className="btn" onClick={handleAddTask}>Add</button>
      </div>

      <ul className="task-list">
        {taskList.length === 0 && <p>No tasks added yet!</p>}
        {taskList.map((t) => (
          <li key={t.id} className={t.isDone ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={() => handleToggleTask(t.id)}
              />
              <span className="task-name">{t.name}</span>
            </label>
            <span className="task-status">{t.isDone ? " Completed" : " Pending"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskTracker;
