import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="lp-cta-section lp-container">
      <div className="lp-cta-box">
        <div className="lp-cta-glow"></div>
        <h2 className="lp-cta-title">Ready to Automate Support &amp; Skyrocket Leads?</h2>
        <p className="lp-cta-desc">Join forward-thinking companies powered by Codeshor AI today.</p>
        <div className="lp-cta-actions">
          <Link to="/login" className="lp-btn lp-btn-primary lp-btn-lg lp-cta-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Start Free Trial Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
