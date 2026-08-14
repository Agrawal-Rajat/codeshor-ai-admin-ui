import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ chatbotLogo }) => {
  return (
    <>
      {/* Footer - Futuristic Redesign */}
      <footer className="lp-footer lp-container">
        <div className="lp-footer-content">
          <div className="lp-footer-brand">
            <div className="lp-nav-logo">
              <img src={chatbotLogo} alt="Codeshor Logo" className="lp-logo-icon" />
              <span className="lp-logo-text">Codeshor</span>
              <span className="lp-logo-badge">AI</span>
            </div>
            <p className="lp-footer-tagline">Crafting Next-Gen Autonomous AI Experiences.</p>
            <div className="lp-footer-house">
              From the House of <span className="lp-house-highlight">C O D E S H O R</span>
            </div>
          </div>

          <div className="lp-footer-links-grid">
            <div className="lp-footer-link-col">
              <h4>Site Links</h4>
              <a href="#home">Home</a>
              <a href="#how-easy">How Easy It Is</a>
              <a href="#features">Features</a>
              <a href="#demo">Live Demo</a>
              <a href="#calculator">Calculator</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="lp-footer-link-col">
              <h4>Required &amp; Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Settings</Link>
              <Link to="/support">Contact Support</Link>
              <Link to="/login">Sign In</Link>
            </div>
          </div>
        </div>

        {/* Giant CODESHOR AI Text Block */}
        <div className="lp-footer-giant-text-container">
          <div className="lp-footer-giant-text" data-text="CODESHOR AI">
            CODESHOR AI
          </div>
        </div>

        <div className="lp-footer-bottom">
          <p>&copy; {new Date().getFullYear()} Codeshor AI. All rights reserved.</p>
        </div>
      </footer>

      {/* Luxury Bottom House Banner (Exactly matches top banner) */}
      <div className="lp-top-banner lp-bottom-banner">
        <div className="lp-house-badge-container">
          <span className="lp-house-prefix">From the house of</span>
          <div className="lp-magnify-brand">
            <span style={{ fontSize: '16px', fontWeight: 400, color: '#a1a1aa' }}>C</span>
            <span style={{ fontSize: '17px', fontWeight: 500, color: '#d4d4d8' }}>O</span>
            <span style={{ fontSize: '18px', fontWeight: 600, color: '#e4e4e7' }}>D</span>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#fafafa' }}>E</span>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#fafafa' }}>S</span>
            <span style={{ fontSize: '18px', fontWeight: 600, color: '#e4e4e7' }}>H</span>
            <span style={{ fontSize: '17px', fontWeight: 500, color: '#d4d4d8' }}>O</span>
            <span style={{ fontSize: '16px', fontWeight: 400, color: '#a1a1aa' }}>R</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
