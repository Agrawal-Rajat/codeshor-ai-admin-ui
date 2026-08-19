import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ characterImg, onOpenModal }) => {
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
            <button onClick={onOpenModal} className="lp-btn lp-btn-primary" style={{border: 'none', cursor: 'pointer'}}>Get Started</button>
            <button onClick={onOpenModal} className="lp-btn lp-btn-secondary" style={{border: 'none', cursor: 'pointer'}}>Get Started</button>
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
            <button onClick={onOpenModal} className="lp-btn lp-btn-primary" style={{border: 'none', cursor: 'pointer'}}>Get Started</button>
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
            <button onClick={onOpenModal} className="lp-btn lp-btn-secondary" style={{border: 'none', cursor: 'pointer'}}>Get Started</button>
          </div>
        </div>

      </div>


    </header>
  );
};

export default Hero;
