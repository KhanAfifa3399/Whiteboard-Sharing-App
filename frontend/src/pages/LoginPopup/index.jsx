import React, { useState } from 'react';
import './index.css';
import axios from 'axios';

const LoginPopup = ({ onClose, onLoginSuccess, openRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      onLoginSuccess(res.data.user);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner animate-fade-in">
        <h3>Login</h3>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <p>Don't have an account? <span onClick={openRegister}>Register</span></p>
        <button onClick={onClose} className='close'>Close</button>
      </div>
    </div>
  );
};

export default LoginPopup;
