import React from 'react';
import { Link } from 'react-router-dom';

const CTA = ({ onOpenModal }) => {
  return (
    <section className="lp-cta-section lp-container">
      <div className="lp-cta-box">
        <div className="lp-cta-glow"></div>
        <h2 className="lp-cta-title">
          <span className="hero-text-dim">Ready to </span>
          <span className="hero-text-bright">Automate Support</span>
          <br/>
          <span className="hero-text-dim"> &amp; </span>
          <span className="hero-text-bright">Skyrocket Leads?</span>
        </h2>
        <p className="lp-cta-desc">Join forward-thinking companies powered by Codeshor AI today.</p>
        <div className="lp-cta-actions">
          <button onClick={onOpenModal} className="lp-btn lp-btn-primary lp-btn-lg lp-cta-btn" style={{border: 'none', cursor: 'pointer', fontFamily: 'inherit'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Get Started with your bot
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
