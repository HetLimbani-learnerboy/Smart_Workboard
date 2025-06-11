import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Adminusers.css";

const Adminusers = () => {
  const [employees, setEmployees] = useState([]);
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();

  // Fetch all employees
  const getEmployees = async () => {
    const res = await fetch("http://localhost:5021/users");
    if (res.ok) {
      const data = await res.json();
      setEmployees(data);
    } else {
      setEmployees([]);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // Search employees
  const handleSearch = async (e) => {
    const key = e.target.value.trim();
    if (key.length > 0) {
      const res = await fetch(`http://localhost:5021/search/${key}`);
      if (res.ok) {
        const data = await res.json();
        setEmployees(data);
      } else {
        setEmployees([]);
      }
    } else {
      getEmployees();
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateuser/${id}`);
  };

  const handleQuit = async (id) => {
    const confirmQuit = window.confirm("Are you sure you want to remove this employee?");
    if (confirmQuit) {
      const res = await fetch(`http://localhost:5021/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        getEmployees();
      } else {
        alert("Failed to remove employee. Please try again.");
      }
    }
  };

  return (
    <div className="Usermanage-container">
      <div className="Usermanagelist">
        <h2 className="header-design">Employee List</h2>
        <input
          type="text"
          className="searchbox"
          placeholder="Search Employee"
          onChange={handleSearch}
          aria-label="Search Employee"
        />

        <ul className="list-header">
          <li>S.No</li>
          <li>Name</li>
          <li>Email</li>
          <li>Role</li>
          <li>Uniqcode</li>
          <li>Salary</li>
          <li>Department</li>
          <li>Joining Date</li>
          <li>Status</li>
          <li>Update</li>
          <li>Quit</li>
        </ul>

        {employees.length > 0 ? (
          employees.map((emp, idx) => (
            <ul key={emp._id || idx} className="list-body">
              <li>{idx + 1}</li>
              <li>{emp.name}</li>
              <li>{emp.email}</li>
              <li>{emp.role}</li>
              <li>{emp.uniqcode}</li>
              <li>{emp.salary ?? "N/A"}</li>
              <li>{emp.department ?? "N/A"}</li>
              <li>{emp.joiningDate ?? "N/A"}</li>
              <li>{emp.status ?? "N/A"}</li>
              <li>
                <button
                  type="button"
                  className="update-btn"
                  onClick={() => handleUpdate(emp._id)}
                >
                  Update
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="quit-btn"
                  onClick={() => handleQuit(emp._id)}
                >
                  Quit
                </button>
              </li>
            </ul>
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </div>

      <div className="bottom-buttons">
        <button
          type="button"
          className="Backtohomebutton"
          onClick={() => navigate("/adminpage")}
        >
          Back to home
        </button>
      </div>
        <div className="action-buttons">
          <button
            type="button"
            className="action-btn"
            onClick={() => navigate("/addemployee")}
          >
            ➕ Add Employee
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={() => navigate("/sendmessage")}
          >
            📨 Send Message
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={() => navigate("/send-notification")}
          >
            🔔 Send Notification
          </button>
        </div>
      
    </div>
  );
};

export default Adminusers;