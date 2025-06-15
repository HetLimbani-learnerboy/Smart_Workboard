import React, { useState } from 'react';
import './ForgotPassword.css';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [uniqcode, setUniqcode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords must match.");

    try {
      const res = await fetch('http://localhost:5021/users/update-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, uniqcode, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Password changed!");
        navigate('/signin');
      } else {
        alert(data.message || "Reset failed.");
      }
    } catch (err) {
      console.error("Reset error:", err);
      alert("Server error. Try later.");
    }
  };

  return (
    <div className="forgot-password-body">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handlePasswordReset}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Uniqcode:</label>
            <input type="text" required value={uniqcode} onChange={e => setUniqcode(e.target.value)} />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit">Reset Password</button>
        </form>
        <div className='signinbutton'>
          <p >Remembered? <Link to="/signin">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
