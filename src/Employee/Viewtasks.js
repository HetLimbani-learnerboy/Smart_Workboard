import React, { useState, useEffect } from "react";
import { useNavigate,navigate } from "react-router-dom";
import "./Viewtasks.css";

const Viewtasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const navigate=useNavigate();

  const user = JSON.parse(localStorage.getItem("User") || "{}");
  const employeeName = user.name;
  const employeeEmail = user.email;

  useEffect(() => {
    fetch("http://localhost:5021/gettask")
      .then(res => res.json())
      .then(data => {
        const employeeTasks = data.filter(
          task => task.name === employeeName && task.email === employeeEmail
        );
        setTasks(data);
        setFilteredTasks(employeeTasks);
      });
  }, [employeeName, employeeEmail]);

  const toggleStatus = async (taskId, currentStatus) => {
    // Toggle between 'working' and 'finished'
    const newStatus = currentStatus === "working" ? "finished" : "working";

    await fetch(`http://localhost:5021/updatetask/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setFilteredTasks(prev =>
      prev.map(task =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="viewtasks-container">
      <h2>📋 My Assigned Tasks</h2>
      {filteredTasks.length === 0 ? (
        <p className="no-task">No tasks assigned yet.</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task, index) => (
            <li key={task._id} className="task-card">
              <p><strong>S.No:</strong> {index + 1}</p>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <button
                className={`status-toggle-btn ${task.status === "finished" ? "done" : "working"}`}
                onClick={() => toggleStatus(task._id, task.status)}
              >
                Mark as {task.status === "working" ? "Finished" : "Working"}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button className="back-button" onClick={() => navigate("/employeehome")}>← Back</button>
    </div>
  );
};

export default Viewtasks;