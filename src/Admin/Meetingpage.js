import React, { useEffect, useState } from "react";
import "./Meetingpage.css";
import { useNavigate } from "react-router-dom";

const Meetingpage = () => {
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState([]); // ✅ state added

    useEffect(() => {
        fetch("http://localhost:5021/allmeeting")
            .then(res => res.json())
            .then(data => setMeetings(data));
    }, []);

    return (
        <div className="meeting-container">
            <h2>Meetings</h2>
            <button className="schedulemeeting-btn" onClick={() => navigate('/schedulemeeting')}>
                Schedule Meeting
            </button>
            <h2>Meeting list 📹</h2>

            {meetings.map(meeting => (
                <div className="meeting-card" key={meeting._id}>
                    <p><strong>🕒 Time:</strong> {meeting.time}</p>
                    <p><strong>📝 Description:</strong> {meeting.description}</p>
                    <p><strong>📋 Type:</strong> {meeting.audience === "all" ? "All Employees" : "Selected Employees"}</p>
                </div>
            ))}

            <button className="backbutton" onClick={() => navigate("/adminpage")}>← Back</button>
        </div>
    );
};
export default Meetingpage;
