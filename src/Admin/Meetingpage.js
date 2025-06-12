import React, { useEffect, useState } from "react";
import "./Meetingpage.css";
import { useNavigate } from "react-router-dom";

const Meetingpage = () => {
  const [meetings, setMeetings] = useState([]);
  const [showAttendees, setShowAttendees] = useState(null);
  const [attendanceData, setAttendanceData] = useState({ attending: [], notAttending: [] });
  const [userType, setUserType] = useState("admin"); // Change to 'employee' for employee view
  const [employee, setEmployee] = useState({ _id: "emp123", name: "John Doe", email: "john@example.com" });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5021/allmeeting")
      .then(res => res.json())
      .then(data => setMeetings(data));
  }, []);

  const handleToggle = async (meetingId) => {
    const payload = {
      meetingId,
      employeeId: employee._id,
      name: employee.name,
      email: employee.email,
      attending: true, // You can toggle this if needed
    };

    await fetch("http://localhost:5021/attendmeeting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Refresh meetings after attendance update
    const updated = await fetch("http://localhost:5021/allmeeting").then(res => res.json());
    setMeetings(updated);
  };

  const fetchAttendance = async (id) => {
    const res = await fetch(`http://localhost:5021/attendancemeeting/${id}`);
    const data = await res.json();
    setAttendanceData(data);
    setShowAttendees(id);
  };

  const handleScheduleMeeting = () => {
    navigate('/schedulemeeting');
  };

  return (
    <div className="meeting-container">
      <h2>{userType === "admin" ? "Admin Meeting Management" : "Your Meetings"}</h2>
      <button className="schedulemeeting-btn" onClick={handleScheduleMeeting}>Scheduling Meeting</button>

      <h2>Meeting list 📹</h2>
      {meetings.map(meeting => (
        <div className="meeting-card" key={meeting._id}>
          <h3>{meeting.title}</h3>
          <p><strong>🕒 Time:</strong> {meeting.time}</p>
          <p><strong>📝 Description:</strong> {meeting.description}</p>
          <p><strong>📋 Type:</strong> {meeting.audience === "all" ? "All Employees" : "Selected Employees"}</p>

          {userType === "employee" && (
            <button className="attend-btn" onClick={() => handleToggle(meeting._id)}>
              ✅ Mark as Attending
            </button>
          )}

          {userType === "admin" && (
            <>
              <button className="show-btn" onClick={() => fetchAttendance(meeting._id)}>
                👥 Show Attendees
              </button>

              {showAttendees === meeting._id && (
                <div className="attendee-lists">
                  <div className="attendee-block attending">
                    <h4>✅ Attending</h4>
                    <ul>{attendanceData.attending.map(emp => (
                      <li key={emp.employeeId}>{emp.name} ({emp.email})</li>
                    ))}</ul>
                  </div>
                  <div className="attendee-block not-attending">
                    <h4>❌ Not Attending</h4>
                    <ul>{attendanceData.notAttending.map(emp => (
                      <li key={emp.employeeId}>{emp.name} ({emp.email})</li>
                    ))}</ul>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Meetingpage;