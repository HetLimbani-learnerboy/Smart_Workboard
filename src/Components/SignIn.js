import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Sign.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const auth = localStorage.getItem('User');
        if (auth && JSON.parse(auth) && location.pathname === '/signin') {
            const user = JSON.parse(auth);
            if (user.email === "adminme@12.com" && user.password === "admin1234") {
                navigate('/adminverification');
            } else {
                navigate('/employeehome');
            }
        }
    }, [navigate, location]);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5021/signin", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.auth && result.user) {
            // Store all users (admin and regular) in localStorage
            localStorage.setItem("User", JSON.stringify(result.user));
            if(result.user.email === "adminme@12.com" && result.user.password === "admin1234"){
                navigate('/adminverification');
            } else {
                navigate('/employeehome');
            }
        } else {
            alert(result.message || "Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Login failed:", error);
        alert("Server error. Please try again later.");
    }
};

    return (
        <div className="signin-body">
            <div className="signin-container">
                <h2>Sign In</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group email-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="👤 Enter your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="password">Password:</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="🔐 Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            <span className="eye-icon" onClick={togglePassword}>
                                <img
                                    src={showPassword ? '/eye_open.png' : '/eye-close.svg'}
                                    alt="Toggle password visibility"
                                    className="eye-icon-img"
                                />
                            </span>
                        </div>
                    </div>

                    <div className="forgot-password">
                        <Link to="/forgotpassword">Forgot Password?</Link>
                    </div>
                    <button className="signin-btn" type="submit">Sign In</button>
                </form>

                <p>
                    <Link className="back-btn" to="/">← Back to Home</Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
