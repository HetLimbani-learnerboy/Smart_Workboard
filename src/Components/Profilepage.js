import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    const user = JSON.parse(localStorage.getItem("User") || "{}");

    useEffect(() => {
        if (user.email) {
            fetch(`http://localhost:5021/userprofile/${user.email}`)
                .then((res) => res.json())
                .then((data) => setProfile(data))
                .catch((err) => console.error("Error fetching profile:", err));
        }
    }, [user.email]);

    const handleBack = () => {
        if (user.email === "adminme@12.com") {
            navigate("/adminpage");
        } else {
            navigate("/employeehome");
        }
    };

    return (
        <div className="profilepage-container">
            <h2>👤 Profile Details</h2>
            {profile ? (
                <div className="profile-card">
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Password:</strong> {profile.password}</p>
                    <p><strong>Unique Code:</strong> {profile.uniqcode}</p>
                    <p><strong>Role:</strong> {profile.role}</p>
                    <p><strong>Department:</strong> {profile.department}</p>
                    <p><strong>Joining Date:</strong> {profile.joiningDate}</p>
                    <p><strong>Status:</strong> {profile.status}</p>
                    <p><strong>Salary:</strong> ₹ {profile.salary}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
            <button className="profilebackbutton" onClick={handleBack}>← Back</button>
        </div>
    );
};

export default ProfilePage;
