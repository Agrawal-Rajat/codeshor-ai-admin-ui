import React from 'react';

const Features = ({ activeFeatureNode, chatbotLogo }) => {
  return (
    <section id="features" className="lp-section lp-features-section">
      <div className="lp-container">
        <div className="lp-section-header">
          <div className="lp-section-tag">ENGINEERED FOR GROWTH</div>
          <h2 className="lp-section-title">
            <span className="hero-text-dim">Everything You Need to</span> <span className="hero-text-bright">Scale Support &amp; Sales</span>
          </h2>
          <p className="lp-section-desc">
            A comprehensive suite of AI tools designed to capture leads, answer questions, and eliminate repetitive support tickets.
          </p>
        </div>
      </div>

      {/* Desktop Circular View */}
      <div className="lp-circular-features-wrapper lp-hide-mobile">
        <div className="lp-circle-track">
          {/* Orbiting Codeshor Logo */}
          <div className="lp-orbiting-logo">
            <img src={chatbotLogo} alt="Orbiting Codeshor Logo" />
          </div>

          {/* Central Glow Core */}
          <div className="lp-circle-center">
            <div className="lp-center-pulse"></div>
            <div className="lp-center-glow"></div>
            <span className="lp-center-text">CODESHOR AI</span>
          </div>

          {/* Circular Feature Nodes placed at equal angles */}
          <div className={`lp-circle-feature-node node-0 ${activeFeatureNode === 0 ? 'orbit-active' : ''}`}>
            <div className="lp-node-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <div className="lp-node-content">
              <h4>Smart RAG AI Engine</h4>
              <p>Zero hallucinations. Answers using verified context via Pinecone vector indexing.</p>
            </div>
          </div>

          <div className={`lp-circle-feature-node node-1 ${activeFeatureNode === 1 ? 'orbit-active' : ''}`}>
            <div className="lp-node-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            </div>
            <div className="lp-node-content">
              <h4>Gaps Learning</h4>
              <p>Logs missed questions instantly. Review and train your custom assistant in 1 click.</p>
            </div>
          </div>

          <div className={`lp-circle-feature-node node-2 ${activeFeatureNode === 2 ? 'orbit-active' : ''}`}>
            <div className="lp-node-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></svg>
            </div>
            <div className="lp-node-content">
              <h4>Voice Notes AI</h4>
              <p>Record voice queries directly inside the chat. Real-time audio transcriptions.</p>
            </div>
          </div>

          <div className={`lp-circle-feature-node node-3 ${activeFeatureNode === 3 ? 'orbit-active' : ''}`}>
            <div className="lp-node-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            </div>
            <div className="lp-node-content">
              <h4>Lead Capture</h4>
              <p>Feed qualified visitor details (name, email, phone) directly straight to your CRM.</p>
            </div>
          </div>

          <div className={`lp-circle-feature-node node-4 ${activeFeatureNode === 4 ? 'orbit-active' : ''}`}>
            <div className="lp-node-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </div>
            <div className="lp-node-content">
              <h4>Brand Theme Sync</h4>
              <p>Fully customize colors, fonts, launcher designs, and greeting widgets easily.</p>
            </div>
          </div>

          <div className={`lp-circle-feature-node node-5 ${activeFeatureNode === 5 ? 'orbit-active' : ''}`}>
            <div className="lp-node-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            </div>
            <div className="lp-node-content">
              <h4>Fast-Rules Engine</h4>
              <p>Answers standard intents instantly under 50ms bypassing complex LLM checks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Fallback Grid View */}
      <div className="lp-features-grid lp-show-mobile lp-container">
        <div className="lp-feature-card">
          <div className="lp-feature-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <h3 className="lp-feature-title">Smart RAG AI Engine</h3>
          <p className="lp-feature-desc">Zero hallucinations. Answers using verified context via Pinecone vector indexing.</p>
        </div>

        <div className="lp-feature-card">
          <div className="lp-feature-icon-wrapper highlight">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          </div>
          <h3 className="lp-feature-title">Gaps Learning</h3>
          <p className="lp-feature-desc">Logs missed questions instantly. Review and train your custom assistant in 1 click.</p>
        </div>

        <div className="lp-feature-card">
          <div className="lp-feature-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></svg>
          </div>
          <h3 className="lp-feature-title">Voice Notes AI</h3>
          <p className="lp-feature-desc">Record voice queries directly inside the chat. Real-time audio transcriptions.</p>
        </div>

        <div className="lp-feature-card">
          <div className="lp-feature-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
          <h3 className="lp-feature-title">Lead Capture</h3>
          <p className="lp-feature-desc">Feed qualified visitor details (name, email, phone) directly straight to your CRM.</p>
        </div>

        <div className="lp-feature-card">
          <div className="lp-feature-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
          </div>
          <h3 className="lp-feature-title">Brand Theme Sync</h3>
          <p className="lp-feature-desc">Fully customize colors, fonts, launcher designs, and greeting widgets easily.</p>
        </div>

        <div className="lp-feature-card">
          <div className="lp-feature-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          </div>
          <h3 className="lp-feature-title">Fast-Rules Engine</h3>
          <p className="lp-feature-desc">Answers standard intents instantly under 50ms bypassing complex LLM checks.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
