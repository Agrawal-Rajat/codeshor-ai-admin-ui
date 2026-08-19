import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({
  scrolled,
  isNavHidden,
  chatbotLogo,
  mobileMenuOpen,
  setMobileMenuOpen,
  activeSection,
  toggleTheme,
  theme,
  onOpenModal
}) => {
  return (
    <nav className={`lp-nav ${scrolled ? 'lp-nav-scrolled' : ''} ${isNavHidden ? 'lp-nav-hidden' : ''}`}>
      <div className="lp-nav-logo">
        <img src={chatbotLogo} alt="Codeshor Logo" className="lp-logo-icon" />
        <span className="lp-logo-text">Codeshor</span>
        <span className="lp-logo-badge">AI</span>
      </div>

      <div className={`lp-nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Home</a>
        <a href="#demo" className={activeSection === 'demo' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Live Demo</a>
        <a href="#how-easy" className={activeSection === 'how-easy' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>How Easy It Is</a>
        <a href="#features" className={activeSection === 'features' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Features</a>
        <a href="#calculator" className={activeSection === 'calculator' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>ROI Calculator</a>
        <a href="#pricing" className={activeSection === 'pricing' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Pricing</a>
        <a href="#faq" className={activeSection === 'faq' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>FAQ</a>
        <button className="lp-mobile-cta lp-btn lp-btn-primary" style={{border: 'none', cursor: 'pointer', fontFamily: 'inherit'}} onClick={(e) => { setMobileMenuOpen(false); onOpenModal(e); }}>Start Your Bot</button>
      </div>

      {/* Mobile Overlay */}
      <div className={`lp-mobile-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>

      <div className="lp-nav-actions">
        <button className="lp-theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
        <Link to="/login" className="lp-btn lp-btn-secondary lp-hide-mobile">
          Sign In
        </Link>
        <button onClick={onOpenModal} className="lp-btn lp-btn-primary lp-hide-mobile" style={{border: 'none', cursor: 'pointer', fontFamily: 'inherit'}}>
          Start Your Bot
        </button>

        <button 
          className={`lp-mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`} 
          aria-label="Toggle Navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="lp-hamburger-bar top-bar"></span>
          <span className="lp-hamburger-bar middle-bar"></span>
          <span className="lp-hamburger-bar bottom-bar"></span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
