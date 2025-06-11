import React, { useState } from "react";
import './UpdateEmployee.css';
import { useNavigate } from "react-router-dom";

function Addemployee() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    uniqcode: "",
    salary: "",
    department: "",
    joiningDate: "",
    status: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.uniqcode) newErrors.uniqcode = "Unique code required";
    if (!formData.salary) newErrors.salary = "Salary required";
    if (!formData.department) newErrors.department = "Department required";
    if (!formData.joiningDate) newErrors.joiningDate = "Joining date required";
    if (!formData.status) newErrors.status = "Status required";
    if (!formData.password || formData.password.length < 6) newErrors.password = "Min 6 char password";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const response = await fetch("http://localhost:5021/addemployee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ Employee added successfully");
      navigate("/adminusers");
    } else {
      alert("❌ Failed to add employee: " + (result.message || "Unknown error"));
    }
  };

  return (
    <div className="update-employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        {[
          { name: "name", type: "text", placeholder: "Full name" },
          { name: "email", type: "email", placeholder: "Email" },
          { name: "role", type: "text", placeholder: "Role (e.g., employee)" },
          { name: "uniqcode", type: "text", placeholder: "Unique Code" },
          { name: "salary", type: "text", placeholder: "Salary" },
          { name: "department", type: "text", placeholder: "Department" },
          { name: "joiningDate", type: "date", placeholder: "" },
          { name: "status", type: "text", placeholder: "Status (active/inactive)" },
          { name: "password", type: "password", placeholder: "Password" },
        ].map(({ name, type, placeholder }) => (
          <div key={name}>
            <input
              className="input-box"
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
            />
            {errors[name] && <span className="invalid-input">{errors[name]}</span>}
          </div>
        ))}
        <button type="submit" className="submit-button">Add Employee</button>
      </form>
      <button className="back-btn" onClick={() => navigate("/adminusers")}>← Back</button>
    </div>
  );
}

export default Addemployee;