import React, { useState } from 'react';
import './Employeehomelayout.css'

const EmployeeHomepage = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const user = JSON.parse(localStorage.getItem("User")) || { name: "User" };

  const handleLogout = () => {
    localStorage.removeItem("User");
    window.location.href = "/";
  };

  const notifications = [
    "New job match: Frontend Developer",
    "Interview invite from ABC Corp",
    "Application update: Backend Engineer",
    "hello engineer:work well"
  ];
  const messages = [
    "Recruiter: Please update your resume.",
    "HR: Welcome to the team!"
  ];

  return (
    <div className="employeehomepage">
      {/* Top Navigation Bar */}
      <div className="employeenavbar">
        <div className="navbarleft">
          <a href="/employeehome" className="brandlogo">
            <img src="/logo192.png" alt="Logo" />
            <span>Smart_Workboard</span>
          </a>
        </div>

        <div className="navbarcenter">
          <input
            type="text"
            placeholder="Search."
            className="navbarsearch"
          />
        </div>

        <div className="navbarright">
          <div className="navbaricon">
            <span onClick={() => setShowNotif(!showNotif)} title="Notifications">🔔</span>
            <span className="notifbadge">{notifications.length}</span>
            {showNotif && (
              <div className="notifdropdown">
                <ul>{notifications.map((n, i) => <li key={i}>{n}</li>)}</ul>
              </div>
            )}
          </div>

          <div className="navbaricon">
            <span onClick={() => setShowMessages(!showMessages)} title="Messages">💬</span>
            <span className="notifbadge">{messages.length}</span>
            {showMessages && (
              <div className="notifdropdown">
                <ul>{messages.map((m, i) => <li key={i}>{m}</li>)}</ul>
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
                  <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      Menu</h3>
                </div>
                <ul className="sidebarmenu">
                  <li><a href="/profile">👤 View Profile</a></li>
                  <li><a href="/profile/edit">✏️ Edit Profile</a></li>
                  <li><a href="/settings">⚙️ Account Settings</a></li>
                  <li><button onClick={handleLogout}>🚪 Logout</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="employeehomepagecontainer">
        <h2>Welcome to the Employee Dashboard</h2>
        <p>Access your tasks, profile, and company resources here.</p>
        <div className="employeecardsection">
          <a className="employeecard" href="/tasks">📝 View Tasks</a>
          <a className="employeecard" href="/resources">📩 Communication & Collaboration</a>
          <a className="employeecard" href="/profile">👤 Manage Profile</a>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHomepage;
