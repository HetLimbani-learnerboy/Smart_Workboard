import React, { useState, useEffect } from "react";
import "./Viewtasks.css";

const Viewtasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("User") || "{}");
  const employeeName = user.name;
  const employeeEmail = user.email;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5021/gettask");
        const data = await res.json();

        const employeeTasks = data.filter(task =>
          task.name === employeeName && task.email === employeeEmail
        );

        setTasks(data);
        setFilteredTasks(employeeTasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [employeeName, employeeEmail]);

  return (
    <div className="viewtasks-container">
      <h2>📋 My Assigned Tasks</h2>
      {filteredTasks.length === 0 ? (
        <p className="no-task">No tasks assigned yet.</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task, index) => (
            <li key={index} className="task-card">
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Viewtasks;