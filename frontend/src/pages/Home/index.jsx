import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import './index.css';
import { Link } from 'react-router-dom';
import LoginPopup from '../../pages/LoginPopup';
import RegisterPopup from '../../pages/RegisterPopup';
import { v4 as uuidv4 } from 'uuid'; // ✅ FIXED: Import uuid

const Home = () => {
    const [show, setShow] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setShowLogin(false);
    };

    useEffect(() => {
        setTimeout(() => setShow(true), 100);
    }, []);

    return (
        <div className="homepage-wrapper">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <div className="container-fluid">
                    <div className="navbar-brand d-flex flex-column">
                        <span className="fw-bold heading">SlateHub</span>
                        <small className="text-white-50">Whiteboard Sharing App</small>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <Link className="nav-link text-white item" to="/about">About</Link>
                        {user ? (
                            <span className="nav-link text-white item">
                                Welcome, {user.name} 
                                <Link className="btn btn-outline-light" to={`/form/${uuidv4()}`}>Forms</Link> {/* ✅ FIXED */}
                                <button className="btn btn-sm btn-light ms-2" onClick={() => setUser(null)}>Logout</button>
                            </span>
                        ) : (
                            <button className="btn btn-outline-light" onClick={() => setShowLogin(true)}>Login</button>
                        )}
                    </div>

                </div>
            </nav>

            {/* Main Content */}
            <div className={`main-content d-flex align-items-center transition-fade ${show ? 'show' : ''}`}>
                {/* Left-side Image */}
                <div className="image-container">
                    <img src={logo} alt="SlateHub Logo" className="shadowed-image" />
                </div>

                {/* Center Heading */}
                <div className="text-center text-white ms-4">
                    <h6 className="display-6 fw-bold">Collaborate <span className='heading'>Visually</span> in Real Time</h6>
                    <h6 className="display-7 fw-bold">Brainstorm, draw, and connect with your team in real time.</h6>
                </div>
            </div>

            {/* Popups */}
            {showLogin && (
                <LoginPopup
                    onClose={() => setShowLogin(false)}
                    onLoginSuccess={handleLoginSuccess}
                    openRegister={() => {
                        setShowLogin(false);
                        setShowRegister(true);
                    }}
                />
            )}
            {showRegister && (
                <RegisterPopup
                    onClose={() => setShowRegister(false)}
                    openLogin={() => {
                        setShowRegister(false);
                        setShowLogin(true);
                    }}
                />
            )}
        </div>
    );
};

export default Home;
