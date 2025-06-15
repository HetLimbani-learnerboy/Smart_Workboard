import React, { useState, useEffect } from 'react';
import './Employeehomelayout.css';

const EmployeeHomepage = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);

  const user = JSON.parse(localStorage.getItem("User")) || { name: "User", _id: "" };

  useEffect(() => {
    fetch("http://localhost:5021/notifications")
      .then(res => res.json())
      .then(data => setNotifications(data));
  }, []);

  useEffect(() => {
    if (user._id) {
      fetch(`http://localhost:5021/messages/${user._id}`)
        .then(res => res.json())
        .then(data => setMessages(data.messages || []));
    }
  }, [user._id]);

  const handleLogout = () => {
    localStorage.removeItem("User");
    window.location.href = "/";
  };

  const toggleNotifications = () => setShowNotif(!showNotif);
  const toggleMessages = () => setShowMessages(!showMessages);

  return (
    <div className="employeehomepage">
      <div className="employeenavbar">
        <div className="navbarleft">
          <a href="/employeehome" className="brandlogo">
            <img src="/logo192.png" alt="Logo" />
            <span>Smart_Workboard</span>
          </a>
        </div>

        <div className="navbarcenter">
          <input type="text" placeholder="Search." className="navbarsearch" />
        </div>

        <div className="navbarright">
          <div className="navbaricon">
            <span onClick={toggleNotifications} title="Notifications">🔔</span>
            <span className="notifbadge">{notifications.length}</span>
            {showNotif && (
              <div className="notifdropdown">
                <ul>
                  {notifications.length > 0 ? (
                    notifications.map((n, i) => (
                      <li key={i}>{n.message}</li>
                    ))
                  ) : (
                    <li>No notifications</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="navbaricon">
            <span onClick={toggleMessages} title="Messages">💬</span>
            <span className="notifbadge">{messages.length}</span>
            {showMessages && (
              <div className="notifdropdown">
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

          <div className="navbarprofile">
            <span onClick={() => setShowProfile(!showProfile)} className="profileavatar" title="Profile">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
            {showProfile && (
              <div className="profilesidebar">
                <div className="sidebarheader">
                  <span className="closebtn" onClick={() => setShowProfile(false)}>×</span>
                  <h3>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Menu</h3>
                </div>
                <ul className="sidebarmenu">
                  <li> <a href="/viewtask">📝 View Tasks</a></li>
                  <li><a href="/commcoll">📩 Communication & Collaboration</a></li>
                  <li> <a href="/myappli">📋 My Applications</a></li>
                  <li><a href="/profile">👤 Manage Profile</a></li>
                  <li><button onClick={handleLogout}>🚪 Logout</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="employeehomepagecontainer">
        <h2>Welcome to the Employee Dashboard</h2>
        <p>Access your tasks, profile, and company resources here.</p>
        <div className="employeecardsection">
          <a className="employeecard" href="/viewtask">📝 View Tasks</a>
          <a className="employeecard" href="/commcoll">📩 Communication & Collaboration</a>
          <a className="employeecard" href="/myappli">📋 My Applications</a>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHomepage;