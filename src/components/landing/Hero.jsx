import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ characterImg }) => {
  return (
    <header 
      id="home"
      className="new-hero-section"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
      }}
    >
      <div className="new-hero-interactive-bg"></div>
      <div className="new-hero-content">
        
        {/* Mobile-Only Combined Hero Content (Hidden on Desktop) */}
        <div className="hero-mobile-content">
          <h2 className="hero-mobile-title">
            CODESHOR <span className="hero-mobile-badge">AI</span>
          </h2>
          <p className="hero-mobile-desc">
            Never leave a customer on read again. Your AI chatbot handles every enquiry instantly, 24/7.
          </p>
          <div className="hero-mobile-actions">
            <Link to="/login" className="lp-btn lp-btn-primary">Get Started</Link>
            <Link to="/features" className="lp-btn lp-btn-secondary">View Demo</Link>
          </div>
        </div>

        {/* Left Block */}
        <div className="hero-side-block hero-left-block">
          <div className="hero-side-inner">
            <div className="hero-large-letter red-letter" data-text="A">
              A<span className="hero-letter-dot red-dot"></span>
              <span className="hero-letter-label">Artificial</span>
            </div>
            <h2 className="hero-side-title">
              <span className="hero-text-dim">Never leave a</span><br/>
              <span className="hero-text-bright">customer</span><br/>
              <span className="hero-text-dim">on read again.</span>
            </h2>
            <p className="hero-side-desc">
              An AI chatbot on your website that knows everything about your business and responds to every visitor instantly, 24/7.
            </p>
            <Link to="/login" className="lp-btn lp-btn-primary">Get Started</Link>
          </div>
        </div>

        {/* Center Block */}
        <div className="hero-center-block">
          <div className="hero-character-wrapper">
            <h1 className="hero-center-text">CODESHOR</h1>
            <img src={characterImg} alt="Codeshor AI Character" className="hero-character-img" />
          </div>
        </div>

        {/* Right Block */}
        <div className="hero-side-block hero-right-block">
          <div className="hero-side-inner">
            <div className="hero-large-letter blue-letter" data-text="I">
              I<span className="hero-letter-dot blue-dot"></span>
              <span className="hero-letter-label">Intelligence</span>
            </div>
            <h2 className="hero-side-title">
              <span className="hero-text-dim">Every missed</span><br/>
              <span className="hero-text-bright">query</span><br/>
              <span className="hero-text-dim">answered.</span>
            </h2>
            <p className="hero-side-desc">
              Our AI handles every enquiry with voice and text, turning missed questions into truly qualified leads seamlessly.
            </p>
            <Link to="/features" className="lp-btn lp-btn-secondary">View Demo</Link>
          </div>
        </div>

      </div>

      <div className="hero-chatbot-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
      </div>
    </header>
  );
};

export default Hero;
