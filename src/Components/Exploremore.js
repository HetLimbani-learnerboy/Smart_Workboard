import React from 'react';
import { Link } from 'react-router-dom';
import Emoji from './Emoji';
import AboutUs from './AboutUs';
import './Exploremore.css';

const ExploreMore = () => {
    return (
        <div className="explore-more-header">
            <Link to="/" className="back-link"> Back</Link>
            <div className="explore-more-container">
                <h1><Emoji symbol="🚀" label="rocket" /> About this Project</h1>
                <p>
                    <Emoji symbol="💼" label="briefcase" /> This project is a job application management system designed to streamline the process of applying for jobs and managing applications. It features user authentication, job listings, and an admin dashboard for managing applications.
                </p>
                <p>
                    <Emoji symbol="🛠️" label="tools" /> The system allows users to apply for jobs. Admins can view and manage job applications, providing a comprehensive solution for both job seekers and employers.
                </p>
                <p>
                    <Emoji symbol="🧠" label="brain" /> The project is built using React for the frontend and Node.js with Express for the backend, utilizing MongoDB for data storage. It includes features such as user authentication, job application management, and an admin dashboard.
                </p>
            </div>

            <div className="explore-more-image">
                <img src="/exploremoreimage.png" alt="Explore More" />
                <img src="/exploremoreimage2.png" alt="Explore More 2" />
            </div>

            <div className="aboutus-container">
                <h1>About Us <span role="img" aria-label="handshake">🤝</span></h1>
                <div className="aboutcontent-wrapper">
                    <div className="leftsection">
                        <h2>Contact Information <span role="img" aria-label="telephone">📞</span></h2>
                        <ul>
                            <li><strong>Name:</strong> Het Limbani <span role="img" aria-label="person">🧑‍💼</span></li>
                            <li><strong>Address:</strong> Ahmedabad, Gujarat, India <span role="img" aria-label="location">📍</span></li>
                            <li><strong>College:</strong> Adani University <span role="img" aria-label="university">🎓</span></li>
                        </ul>
                    </div>
                    <div className="rightsection">
                        <h2>Our Mission <span role="img" aria-label="target">🎯</span></h2>
                        <p>We aim to simplify employee management... <span role="img" aria-label="gear">⚙️</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreMore;
