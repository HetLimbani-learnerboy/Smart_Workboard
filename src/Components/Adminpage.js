import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Adminpagedesign.css';

const AdminHomepage = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  let user;
  try {
    const storedUser = localStorage.getItem("User");
    user = storedUser ? JSON.parse(storedUser) : { name: "Admin" };
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
    user = { name: "Admin" };
  }

  // Fetch notifications on mount
  useEffect(() => {
    fetch("http://localhost:5021/notifications")
      .then(res => res.json())
      .then(data => setNotifications(data));
  }, []);

  // Fetch messages for admin on mount (optional: adjust endpoint as needed)
  useEffect(() => {
    fetch("http://localhost:5021/messages/admin")
      .then(res => res.json())
      .then(data => setMessages(data.messages || []));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("User");
    navigate("/signin");
  };

  return (
    <div className="employee-homepage">
      {/* Navbar */}
      <div className="employee-navbar">
        <div className="navbar-left">
          <Link to="/adminpage" className="brand-logo">
            <img src="/logo192.png" alt="Logo" />
            <span>Smart_Workboard</span>
          </Link>
        </div>

        <div className="navbar-center">
          <input type="text" placeholder="Search..." className="navbar-search" />
        </div>

        <div className="navbar-right">
          <div className="navbar-icon">
            <span onClick={() => setShowNotif(!showNotif)}>🔔</span>
            <span className="notif-badge">{notifications.length}</span>
            {showNotif && (
              <div className="notif-dropdown">
                <ul>
                  {notifications.length > 0 ? (
                    notifications.map((n, i) => <li key={i}>{n.message}</li>)
                  ) : (
                    <li>No notifications</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="navbar-icon">
            <span onClick={() => setShowMessages(!showMessages)}>💬</span>
            <span className="notif-badge">{messages.length}</span>
            {showMessages && (
              <div className="notif-dropdown">
                <ul>
                  {messages.length > 0 ? (
                    messages.map((m, i) => <li key={i}>{m.message}</li>)
                  ) : (
                    <li>No messages yet</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="navbar-profile">
            <span
              onClick={() => setShowProfile(!showProfile)}
              className="profile-avatar"
              title="Admin"
            >
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </span>
            {showProfile && (
              <div className="profile-sidebar">
                <div className="sidebar-header">
                  <span className="close-btn" onClick={() => setShowProfile(false)}>×</span>
                  <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Menu</h3>
                </div>
                <ul className="sidebar-menu">
                  <li><Link to="/adminusers">👥 User Management</Link></li>
                  <li><Link to="/providetask">📋 Provide Tasks</Link></li>
                  <li><Link to="/meeting">💬 Meeting & Interview Scheduling</Link></li>
                  <li><Link to="/Admin/applicationmanage">🧑‍💻 Application Management</Link></li>
                  <li><Link to="/Admin/settings">⚙️ Settings</Link></li>
                  <li><button onClick={handleLogout}>🚪 Logout</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="employee-homepage-container">
        <h2>Welcome Admin</h2>
        <p>Control and monitor users, tasks, applications, and more.</p>
        <div className="employee-card-section">
          <Link className="employee-card" to="/adminusers">👥 Manage Users</Link>
          <Link className="employee-card" to="/providetask">📋 Provide Tasks</Link>
          <Link className="employee-card" to="/meeting">💬 Meeting & Interview Scheduling</Link>
          <Link className="employee-card" to="/Admin/applicationmanage">🧑‍💻 Application Management</Link>
          <Link className="employee-card" to="/Admin/pdfreport">🧠 Resume Evaluation</Link>
          <Link className="employee-card" to="/Admin/analytics">📊 Analytics</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;