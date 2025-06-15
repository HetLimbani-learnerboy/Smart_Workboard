import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './AdminVerification.css';

const Adminverification = () => {
  const [inputSentence, setInputSentence] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [showCipher, setShowCipher] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("User");
    if (auth) {
      try {
        const user = JSON.parse(auth);
        if (user.email === "adminme@12.com") {
          localStorage.removeItem("User");
        }
      } catch (err) {
        localStorage.removeItem("User");
      }
    }
  }, []);

  const caesarCipher = (text) => {
    if (text.trim().length < 5) return "";
    return text
      .split('')
      .map(char => {
        if (/[a-z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 97 + 2) % 26) + 97);
        } else if (/[A-Z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 65 + 2) % 26) + 65);
        } else {
          return char;
        }
      })
      .join('');
  };

  const handleVerification = (e) => {
    e.preventDefault();
    setError("");

    if (inputSentence.trim().length < 5) {
      setError("Encryption sentence must be at least 5 characters long.");
      return;
    }

    const encrypted = caesarCipher(inputSentence.trim());

    if (encrypted === cipherText.trim()) {
      localStorage.setItem("User", JSON.stringify({ email: "adminme@12.com" }));
      alert("✅ Verification successful!");
      navigate("/adminpage");
    } else {
      setError("❌ Cipher text does not match the encrypted sentence.");
    }
  };

  return (
    <div className="verification-body">
      <div className="verification-container">
        <h2>Admin Verification</h2>
        <form onSubmit={handleVerification}>
          <div className="form-group">
            <label>Enter any sentence (for encryption):</label><br />
            <input
              type="text"
              className="input-field"
              placeholder="Enter your sentence"
              value={inputSentence}
              onChange={(e) => setInputSentence(e.target.value)}
              required
            />
          </div>

          <div className="form-group cipher-group">
            <label>Enter Cipher text of your sentence:</label><br />
            <div className="cipher-wrapper">
              <input
                type={showCipher ? "text" : "password"}
                className="input-field"
                placeholder="Enter ciphertext"
                value={cipherText}
                onChange={(e) => setCipherText(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowCipher(!showCipher)}>
                <img
                  src={showCipher ? '/eye_open.png' : '/eye-close.svg'}
                  alt="Toggle cipher visibility"
                  className="eye-icon-img"
                />
              </span>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="verify-btn">Verify</button>
        </form>

        <Link to="/signin">
          <button className="back-btn">← Back to Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Adminverification;
