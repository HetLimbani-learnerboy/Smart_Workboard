import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Providetask.css';

const Providetask = () => {
  const [tasks, setTasks] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5021/providetask");
    if (res.ok) {
      const data = await res.json();
      setTasks(data);
    }
  };

  const toggleStatus = async (taskId, currentStatus) => {
    const statusCycle = ['assigned', 'working', 'finished'];
    const nextStatus = statusCycle[(statusCycle.indexOf(currentStatus) + 1) % 3];
    await fetch(`http://localhost:5021/updateprovidetask/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus }),
    });
    fetchTasks();
  };

  const handleDelete = async (taskId) => {
    await fetch(`http://localhost:5021/deleteprovidetask/${taskId}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

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
        <button className="add-btn" onClick={() => navigate('/addtask')}>➕ Add Task</button>
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
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>{task.email}</td>
                <td>{task.description}</td>
                <td>
                  <button
                    className={`status-btn ${task.status}`}
                    onClick={() => toggleStatus(task._id, task.status)}
                  >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </button>
                </td>
                {showDelete && (
                  <td>
                    <button className="delete-row-btn" onClick={() => handleDelete(task._id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button className="back-btn" onClick={() => navigate("/adminpage")}>← Back</button>
    </div>
  );
};

export default Providetask;
