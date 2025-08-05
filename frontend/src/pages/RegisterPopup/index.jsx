import React, { useState } from 'react';
import './index.css';
import axios from 'axios';

const RegisterPopup = ({ onClose, openLogin }) => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleRegister = async () => {
        const { name, email, password } = form;
        try {
            const res = await axios.post("http://localhost:5000/api/register", { name, email, password });
            if (res.data.success) {
                alert("Registration successful");
                onClose();
            } else {
                alert("Registration failed");
            }
        } catch (err) {
            alert("Registration failed");
        }
    };

    return (
        <div className="popup">
            <div className="popup-inner animate-fade-in">
                <h3>Register</h3>
                <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button onClick={handleRegister}>Register</button>
                <p>Already have an account? <span onClick={openLogin}>Login</span></p>
                <button onClick={onClose} className='close'>Close</button>
            </div>
        </div>
    );
};

export default RegisterPopup;
