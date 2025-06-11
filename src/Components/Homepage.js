import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {    
    return(
        <div className="homepage-item">
             <img
        className="header-animation"
        src="/logo192.png"
        alt="Animated Logo"
      />
        <div className="paragraph">
            <p>"Welcome to Smart Workboard — your all-in-one employee management platform..🚀" <br/><br/><br/>
            It is Designed to streamline workflows⚙️, empower business owners, and simplify tasks like document management 📄
                 with integrated PDF reading and more.</p>
            </div>
        <div className="image-carousel">

  <div className="image-row scroll-left-right">
    <img src="/homepage-image.png" alt="Homepage" />
    <img src="/Employee.png" alt="Employee Management" />
     <img src="/cal.png" alt="Calendar" />
    <img src="/management.png" alt="Management" />
    <img src='working.png' alt="Working" />
    <img src="/applied.png" alt="Apply Now" />
    <img src='/employeeenter.png' alt="Employee Entry" />
  </div>

  <div className="image-row scroll-right-left">
    <img src='working.png' alt="Working" />
     <img src="/management.png" alt="Management" />
    <img src="/cal.png" alt="Calendar" />
    <img src='/employeeenter.png' alt="Employee Entry" />
    <img src="/applied.png" alt="Apply Now" />
    <img src="/homepage-image.png" alt="Homepage" />
    <img src="/Employee.png" alt="Employee Management" />
  </div>

  <div className="image-row scroll-left-right">
    <img src='working.png' alt="Working" />
    <img src="/management.png" alt="Management" />
    <img src="/applied.png" alt="Apply Now" />
    <img src="/Employee.png" alt="Employee Management" />
    <img src="/homepage-image.png" alt="Homepage" />
    <img src='/employeeenter.png' alt="Employee Entry" />
    <img src="/cal.png" alt="Calendar" />
    
  </div>

</div>

        <div className="homepage">
            <p><Link to="/exploremore">Explore more.→</Link></p>
        </div> 
        </div>
    )
}
export default Homepage;    