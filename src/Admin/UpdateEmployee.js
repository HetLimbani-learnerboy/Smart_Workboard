import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import './UpdateEmployee.css';

const UpdateEmployee = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [salary, setSalary] = useState("");
    const [department, setDepartment] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [status, setStatus] = useState("");
    const [uniqcode, setUniqcode] = useState(""); // readonly
    const [error, setError] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    // Fetch employee details on mount
    useEffect(() => {
        const getEmployeeDetails = async () => {
            const res = await fetch(`http://localhost:5021/updateuser/${params.id}`);
            if (res.ok) {
                const result = await res.json();
                setName(result.name || "");
                setEmail(result.email || "");
                setRole(result.role || "");
                setSalary(result.salary || "");
                setDepartment(result.department || "");
                setJoiningDate(result.joiningDate || "");
                setStatus(result.status || "");
                setUniqcode(result.uniqcode || "");
            } else {
                alert("Failed to fetch employee details.");
                navigate("/adminusers");
            }
        };
        getEmployeeDetails();
    }, [params.id, navigate]);

    // Handle update
    const updateEmployeeHandle = async (e) => {
        e.preventDefault();
        if (!name || !email || !role) {
            setError(true);
            return;
        }

        const payload = {
            name,
            email,
            role,
            salary,
            department,
            joiningDate,
            status,
            uniqcode,
        };

        const res = await fetch(`http://localhost:5021/updateuser/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            alert("Employee updated successfully");
            navigate("/adminusers");
        } else {
            alert("Failed to update employee.");
        }
    };

    return (
        <div className="update-employee-container">
            <h2>Update Employee Details</h2>
            <form onSubmit={updateEmployeeHandle}>
                <input
                    className="input-box"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter Name"
                />
                {error && !name && <span className="invalid-input">Please enter valid name</span>}

                <input
                    className="input-box"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter Email"
                />
                {error && !email && <span className="invalid-input">Please enter valid email</span>}

                <input
                    className="input-box"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    type="text"
                    placeholder="Enter Role"
                />
                {error && !role && <span className="invalid-input">Please enter valid role</span>}

                <input
                    className="input-box"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    type="text"
                    placeholder="Enter Salary"
                />

                <input
                    className="input-box"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    type="text"
                    placeholder="Enter Department"
                />

                <input
                    className="input-box"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                    type="date"
                    placeholder="Enter Joining Date"
                />

                <input
                    className="input-box"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    type="text"
                    placeholder="Enter Status"
                />

                <input
                    className="input-box"
                    value={uniqcode}
                    readOnly
                    placeholder="Uniqcode (readonly)"
                />

                <button className="submit-button" type="submit">
                    Update Employee
                </button>
                <p>
                    <Link className="back-btn" to="/adminusers">← Back</Link>
                </p>
            </form>
        </div>
    );
};

export default UpdateEmployee;