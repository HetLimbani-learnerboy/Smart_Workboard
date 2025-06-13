import React, { useEffect, useState } from "react";
import "./Applicationmanag.css";
import { Link } from "react-router-dom";

const Applicationmanag = () => {
    const [staffApps, setStaffApps] = useState([]);
    const [fresherApps, setFresherApps] = useState([]);

    const fetchApps = () => {
        fetch("http://localhost:5021/allemployeeapplications")
            .then((res) => res.json())
            .then((data) => setStaffApps(data));

        fetch("http://localhost:5021/allfresherapplications")
            .then((res) => res.json())
            .then((data) => setFresherApps(data));
    };

    useEffect(() => {
        fetchApps();
    }, []);

    const updateStaffStatus = async (id, newStatus) => {
        await fetch(`http://localhost:5021/updatestaffstatus/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });
        fetchApps();
    };

    const updateFresherStatus = async (id, newStatus) => {
        await fetch(`http://localhost:5021/updatefresherstatus/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });
        fetchApps();
    };

    return (
        <div className="applicationmanage-container">
   
         <Link className="backbuttonappli" to={'/adminpage'}>Back</Link>
      
            <div className="staffapplication">
                <h2>📋 Staff Applications</h2>
                <div className="staffapplication-container">
                    <ul>
                        <li><strong>Sr No.</strong></li>
                        <li><strong>Name</strong></li>
                        <li><strong>Email</strong></li>
                        <li><strong>Type</strong></li>
                        <li><strong>Description</strong></li>
                        <li><strong>Status</strong></li>
                        <li><strong>Action</strong></li>
                    </ul>
                    {staffApps.map((app, index) => (
                        <ul key={app._id}>
                            <li>{index + 1}</li>
                            <li>{app.name}</li>
                            <li>{app.email}</li>
                            <li>{app.type}</li>
                            <li>{app.description}</li>
                            <li>{app.status}</li>
                            <li>
                                <button  className='actionbutton' onClick={() => updateStaffStatus(app._id, "approved")}>Approve</button>
                                <button  className='actionbutton' onClick={() => updateStaffStatus(app._id, "rejected")}>Reject</button>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>

            <div className="newapplication">
                <h2>🧾 Fresher's Applications</h2>
                <div className="fresherapplication-container">
                    <ul>
                        <li><strong>Sr No.</strong></li>
                        <li><strong>Full Name</strong></li>
                        <li><strong>Email</strong></li>
                        <li><strong>Position</strong></li>
                        <li><strong>Resume</strong></li>
                        <li><strong>Status</strong></li>
                        <li><strong>Action</strong></li>
                    </ul>
                    {fresherApps.map((app, index) => (
                        <ul key={app._id}>
                            <li>{index + 1}</li>
                            <li>{app.firstname} {app.lastname}</li>
                            <li>{app.email}</li>
                            <li>{app.position}</li>
                            <li>
                                <a
                                    href={`http://localhost:5021/applicationuploads/${app.resumePath}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Resume ({app.firstname} {app.lastname})
                                </a>
                            </li>
                            <li>{app.status}</li>
                            <li>
                                <button  className='actionbutton' onClick={() => updateFresherStatus(app._id, "accepted")}>Accept</button>
                                <button  className='actionbutton' onClick={() => updateFresherStatus(app._id, "rejected")}>Reject</button>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Applicationmanag;
