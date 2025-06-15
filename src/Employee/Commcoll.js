import React, { useEffect, useState } from "react";
import "../Admin/Meetingpage.css";
import { useNavigate } from "react-router-dom";

const Commcoll = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("User") || "{}");
  const [hasMeetings, setHasMeetings] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5021/meetingsforemployee/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setHasMeetings(data.hasMeetings);
        setMeetings(data.meetings);
        setLoading(false);
      });
  }, [user.email]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="meeting-container">
      <h2>Meeting Dashboard</h2>
      <button className="schedulemeeting-btn" onClick={() => navigate('/schedulemeet')}>
        Schedule Meeting
      </button>
      {hasMeetings ? (
        <>
          <h2>Your Assigned Meetings:</h2>
          {meetings.map(meeting => (
            <div className="meeting-card" key={meeting._id}>
              <h4>{meeting.title}</h4>
              <p><strong>Time:</strong> {meeting.time}</p>
              <p><strong>Description:</strong> {meeting.description}</p>
            </div>
          ))}
        </>
      ) : (
        <div className="no-meetings">
          <h3>You currently have no meetings assigned.</h3>
        </div>
      )}
      <button className="backbutton" onClick={() => navigate("/employeehome")}>← Back</button>
    </div>
  );
};

export default Commcoll;