import React from 'react';
import './Aboutus.css';

const AboutUs = () => {
  return (
    <div className='aboutuscon'>
    <div className="aboutuscontainer">
      <h1>About Us <span role="img" aria-label="handshake">🤝</span></h1>
      <div className="aboutcontentwrapper">
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
    <div className='aboutline'>
        <p>Nice to meet you...😊</p>
      </div>
    </div>
  );
}
export default AboutUs;