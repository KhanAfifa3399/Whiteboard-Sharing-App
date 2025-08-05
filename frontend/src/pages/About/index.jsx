import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on load
  }, []);

  return (
    <div className="about-wrapper">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <div className="container-fluid">
          <div className="navbar-brand d-flex flex-column">
            <span className="fw-bold heading">SlateHub</span>
            <small className="text-white-50">Whiteboard Sharing App</small>
          </div>
          <div className="d-flex">
            <Link className="nav-link text-white mx-2 item" to="/">Home</Link>
            <Link className="nav-link text-white mx-2 item" to="/about">About</Link>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <div className="container py-5 fade-in">
        <h2 className="text-white text-center mb-4 heading">About SlateHub</h2>
        <p className="text-white-50 fs-5 text-center">
          SlateHub is a modern real-time collaborative whiteboard tool built for seamless teamwork.
          Whether you're sketching ideas, teaching concepts, or working remotely—SlateHub helps you
          share and create visually, effortlessly.
        </p>

        {/* Contact Info */}
        <div className="contact-info text-center mt-5">
          <h4 className="text-white mb-3">Contact Us</h4>
          <p className="text-white-50 mb-1">📞 Phone: +91-8788687882</p>
          <p className="text-white-50 mb-1"> 📧 Email: support@slatehub.io</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer text-center text-white-50 py-3 fade-in">
        © {new Date().getFullYear()} SlateHub | Built with 💡 by Team SlateHub
      </footer>
    </div>
  );
};

export default About;
