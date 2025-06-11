import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Addtask.css";

const Addtask = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("assigned");
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:5021/users");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (id) => {
    setSelectedEmployees(prev =>
      prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (selectedEmployees.length === 0 || !description.trim()) {
      alert("Select at least one employee and enter a task description.");
      return;
    }

    const targets = employees.filter(emp => selectedEmployees.includes(emp._id));

    try {
      for (const emp of targets) {
        const payload = {
          name: emp.name,
          email: emp.email,
          description,
          status,
        };

        await fetch("http://localhost:5021/providetask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      alert("✅ Task(s) assigned successfully!");
      setDescription("");
      setSelectedEmployees([]);
      setStatus("assigned");
    } catch (err) {
      console.error("Error assigning task:", err);
      alert("❌ Failed to assign tasks.");
    }
  };

  return (
    <div className="addtask-container">
      <h2>📝 Assign Task to Employees</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowList(true)}
      />

      {showList && (
        <div className="employee-list">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(emp => (
              <label key={emp._id} className="employee-item">
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(emp._id)}
                  onChange={() => handleCheckboxChange(emp._id)}
                />
                <span>{emp.name} ({emp.email})</span>
              </label>
            ))
          ) : (
            <p className="no-result">No employees found.</p>
          )}
        </div>
      )}

      <textarea
        className="task-input"
        rows="5"
        placeholder="Enter task description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="status-dropdown"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="assigned">Assigned</option>
        <option value="working">Working</option>
        <option value="completed">Completed</option>
      </select>

      <button className="sendbtn" onClick={handleSubmit}>Assign Task</button>
      <Link className="backbtn" to="/providetask">← Back</Link>
    </div>
  );
};

export default Addtask;
