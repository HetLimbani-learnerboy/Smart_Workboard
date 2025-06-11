import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header-container">
     
      <ul className="name-ul">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/applynow">Apply Now</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>
    </div>
  );
};

export default Header;