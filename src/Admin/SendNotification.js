import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sendmsg.css"; // Use same styling

const SendNotification = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSendNotification = async () => {
    if (!message.trim()) {
      alert("Please enter a message to send.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5021/sendnotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          timestamp: new Date().toISOString(),
        })
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("✅ Notification sent to all employees.");
        setMessage("");
      } else {
        setStatus(`❌ Failed: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      setStatus("❌ Network error while sending notification.");
    }
  };

  return (
    <div className="Sendnotification-container">
      <h2>Send Notification to All Employees</h2>
      <textarea
        placeholder="Type your notification here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="6"
        className="messagebox"
      />
      <br />
      <button className="sendnotification-button" onClick={handleSendNotification}>
        📢 Send Notification to All
      </button>
      <Link className="back-btn" to="/adminusers">← Back</Link>
      {status && <p className="statusmessage">{status}</p>}
    </div>
  );
};

export default SendNotification;
