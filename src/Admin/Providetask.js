import React, { useState } from 'react';
import './Providetask.css';

const Providetask = () => {
  const [tasks, setTasks] = useState([
    { name: "John Doe", email: "john@example.com", description: "Fix dashboard bug", status: "assigned" },
    { name: "Jane Smith", email: "jane@example.com", description: "Design new banner", status: "working" }
  ]);

  const [showDelete, setShowDelete] = useState(false);

  const toggleStatus = (index) => {
    const updated = [...tasks];
    const statusCycle = ['assigned', 'working', 'finished'];
    const currentStatus = updated[index].status;
    const nextStatus = statusCycle[(statusCycle.indexOf(currentStatus) + 1) % 3];
    updated[index].status = nextStatus;
    setTasks(updated);
  };

  const handleDelete = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  // Count statuses
  const assignedCount = tasks.filter(t => t.status === 'assigned').length;
  const workingCount = tasks.filter(t => t.status === 'working').length;
  const finishedCount = tasks.filter(t => t.status === 'finished').length;

  return (
    <div className="task-container">
      <h2>Task Management</h2>

      <div className="task-summary">
        <span className="summary assigned">📋 Assigned: {assignedCount}</span>
        <span className="summary working">🔄 Working: {workingCount}</span>
        <span className="summary finished">✅ Finished: {finishedCount}</span>
      </div>

      <div className="button-group">
        <button className="add-btn">➕ Add Task</button>
        <button className="delete-btn" onClick={() => setShowDelete(!showDelete)}>
          {showDelete ? '✅ Done Deleting' : '🗑️ Delete Task'}
        </button>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Description</th>
            <th>Status</th>
            {showDelete && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={showDelete ? 6 : 5}>No tasks available.</td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>{task.email}</td>
                <td>{task.description}</td>
                <td>
                  <button
                    className={`status-btn ${task.status}`}
                    onClick={() => toggleStatus(index)}
                  >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </button>
                </td>
                {showDelete && (
                  <td>
                    <button className="delete-row-btn" onClick={() => handleDelete(index)}>
                      ❌ Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Providetask;
