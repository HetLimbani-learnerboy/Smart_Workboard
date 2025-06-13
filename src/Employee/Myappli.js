import React, { useEffect, useState } from "react";
import "./Myappli.css"; // You can create your own CSS for styling

const applicationTypes = [
  "Leave Application",
  "Job Application (Internal Transfer)",
  "Work From Home (WFH) Application",
  "Resignation Application",
  "Equipment Request Application",
  "Project Change Request",
  "Salary Advance Application",
];

const Myappli = () => {
  const user = JSON.parse(localStorage.getItem("User") || "{}");
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    description: "",
    type: applicationTypes[0],
    status: "pending",
    toemail: "adminme@12.com",
  });

  const [applications, setApplications] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5021/submitapplication", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Application submitted");
      setForm({
        ...form,
        description: "",
        type: applicationTypes[0],
        status: "pending",
      });
      fetchApplications();
    }
  };

  const fetchApplications = async () => {
    const res = await fetch(`http://localhost:5021/myapplications/${user.email}`);
    const data = await res.json();
    setApplications(data);
  };

  useEffect(() => {
    fetchApplications();
  }, [user.email]);

  const handleStatusChange = async (id, newStatus) => {
    const res = await fetch(`http://localhost:5021/updateapplication/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) fetchApplications();
  };

  return (
    <div className="application-container">
      <h2>📄 Submit Application</h2>
      <form onSubmit={handleSubmit} className="application-form">
        <input type="text" name="name" value={form.name} readOnly />
        <input type="email" name="email" value={form.email} readOnly />
        <select name="type" value={form.type} onChange={handleChange}>
          {applicationTypes.map((type, i) => (
            <option key={i} value={type}>{type}</option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Enter application description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="toemail"
          placeholder="To Email (Admin)"
          value={form.toemail}
          readOnly
        />
        <button type="submit">Submit Application</button>
      </form>

      <h3>📑 Your Applications</h3>
      <div className="application-list">
        {applications.map((app, index) => (
          <div key={app._id} className="application-card">
            <p><strong>{index + 1}.</strong> <strong>Type:</strong> {app.type}</p>
            <p><strong>Description:</strong> {app.description}</p>
            <p><strong>Status:</strong> {app.status}</p>
            {["pending", "rejected"].includes(app.status) && (
              <select
                value={app.status}
                onChange={(e) => handleStatusChange(app._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myappli;
