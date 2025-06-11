import React, { useState, useEffect } from "react";
import "./Sendmsg.css";

const Sendmsg = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [message, setMessage] = useState("");
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
    if (selectedEmployees.length === 0 || !message.trim()) {
      alert("Select at least one employee and write a message.");
      return;
    }

    const targets = employees.filter(emp => selectedEmployees.includes(emp._id));

    try {
      for (const emp of targets) {
        const payload = {
          employeeId: emp._id,
          name: emp.name,
          email: emp.email,
          message,
        };

        await fetch("http://localhost:5021/Sendmsg", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      alert("✅ Message sent to selected employees!");
      setMessage("");
      setSelectedEmployees([]);
    } catch (err) {
      console.error("Error sending message:", err);
      alert("❌ Failed to send messages.");
    }
  };

  return (
    <div className="sendmsg-container">
      <h2>📬 Send Message to Employees</h2>

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
        className="message-input"
        rows="5"
        placeholder="Enter your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button className="send-btn" onClick={handleSubmit}>Send Message</button>
    </div>
  );
};

export default Sendmsg;
