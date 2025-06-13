import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Schedulemeeting.css";

const Schedulemeeting = () => {
    const [type, setType] = useState("all");
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [meeting, setMeeting] = useState({
        title: "",
        description: "",
        time: "",
    });
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:5021/users")
            .then((res) => res.json())
            .then((data) => setEmployees(data));
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedEmployees((prev) =>
            prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
        );
        setSearch("");
    };

    const handleRemoveSelected = (id) => {
        setSelectedEmployees((prev) => prev.filter((empId) => empId !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...meeting,
            type,
            selectedEmployees: type === "selected" ? selectedEmployees : [],
        };

        const res = await fetch("http://localhost:5021/createmeeting", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            alert("Meeting scheduled successfully!");
            setMeeting({ title: "", description: "", time: "" });
            setSelectedEmployees([]);
        }
    };

    const filteredEmployees = employees.filter(
        (emp) =>
            emp.name.toLowerCase().includes(search.toLowerCase()) ||
            emp.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="schedule-container">
            <h2>📅 Schedule a Meeting</h2>
            <form onSubmit={handleSubmit} className="meeting-form">
                <label htmlFor="title">Meeting Title:</label>
                <input
                    id="title"
                    type="text"
                    value={meeting.title}
                    onChange={(e) => setMeeting({ ...meeting, title: e.target.value })}
                    required
                />

                <label htmlFor="time">Meeting Time:</label>
                <input
                    id="time"
                    type="datetime-local"
                    value={meeting.time}
                    onChange={(e) => setMeeting({ ...meeting, time: e.target.value })}
                    required
                />

                <label htmlFor="desc">Description:</label>
                <textarea
                    id="desc"
                    rows="4"
                    value={meeting.description}
                    onChange={(e) => setMeeting({ ...meeting, description: e.target.value })}
                    required
                />

                <label htmlFor="meeting-type">Meeting For:</label>
                <select
                    id="meeting-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="all">All Employees</option>
                    <option value="selected">Selected Employees</option>
                </select>

                {type === "selected" && (
                    <div className="employee-selection">
                        <h4>Select Employees</h4>
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                        {filteredEmployees.length === 0 ? (
                            <p>No employees found.</p>
                        ) : (
                            <div className="employee-list">
                                {filteredEmployees.map((emp) => (
                                    <div key={emp._id} className="employee-item">
                                        <input
                                            type="checkbox"
                                            checked={selectedEmployees.includes(emp._id)}
                                            onChange={() => handleCheckboxChange(emp._id)}
                                        />
                                        <span>{emp.name} ({emp.email})</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedEmployees.length > 0 && (
                            <div className="selected-employees">
                                <h5>Selected ({selectedEmployees.length}):</h5>
                                <ul>
                                    {selectedEmployees.map((empId) => {
                                        const emp = employees.find((e) => e._id === empId);
                                        if (!emp) return null;
                                        return (
                                            <li key={empId}>
                                                {emp.name} ({emp.email})
                                                <button
                                                    type="button"
                                                    className="remove-btn"
                                                    onClick={() => handleRemoveSelected(empId)}
                                                >
                                                    ❌
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    className="submitbutton"
                    disabled={
                        !meeting.title || !meeting.time || !meeting.description ||
                        (type === "selected" && selectedEmployees.length === 0)
                    }
                >
                    Schedule
                </button>
            </form>
            <Link className="back-btn" to="/meeting">← Back</Link>
        </div>
    );
};

export default Schedulemeeting;
