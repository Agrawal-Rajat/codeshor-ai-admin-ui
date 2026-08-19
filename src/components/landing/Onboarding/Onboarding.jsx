import React from 'react';
import { Link } from 'react-router-dom';

const Onboarding = ({
  onboardingRef,
  onboardingProgress,
  onboardingStep,
  setOnboardingStep,
  chatbotLogo,
  onOpenModal
}) => {
  return (
    <section id="how-easy" ref={onboardingRef} className="lp-onboarding-section">
      <div className="lp-onboarding-sticky">
        <div className="lp-section-header lp-container">
          <div className="lp-section-tag">ZERO TECH FRICTION</div>
          <h2 className="lp-section-title"><span className="hero-text-dim">How Easy It Is For Your</span> <span className="hero-text-bright">Business</span> <span className="hero-text-dim">To</span> <span className="hero-text-bright">Go Live</span></h2>
          <p className="lp-section-desc">From signup to your first AI automated conversation in 3 simple steps.</p>
        </div>

        <div className="lp-onboarding-container lp-container">
          {/* Step Selector Controls */}
          <div className="lp-stepper-wrapper">
            {/* Dynamic Connecting SVG Line */}
            <svg className="lp-connector-svg lp-desktop-svg" viewBox="0 0 100 360" fill="none">
              <defs>
                <linearGradient id="glow-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              {/* Background Line */}
              <path d="M 30 50 C 90 90, 90 140, 30 180 C -30 220, -30 270, 30 310" stroke="var(--lp-card-border)" strokeWidth="3" strokeLinecap="round" />
              {/* Active Dynamic Line */}
              <path 
                d="M 30 50 C 90 90, 90 140, 30 180 C -30 220, -30 270, 30 310" 
                stroke="url(#glow-grad)" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeDasharray="400"
                strokeDashoffset={400 - (onboardingProgress * 400)}
              />
            </svg>

            {/* Dynamic Codeshor AI Moving Logo */}
            <div 
              className="lp-moving-logo-indicator lp-hide-mobile"
              style={{
                position: 'absolute',
                right: '-16px', // Align between left stepper and right card
                transform: 'translateY(-50%)',
                transition: 'top 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                zIndex: 10,
                width: '40px',
                height: '40px',
                background: 'var(--lp-card-bg)',
                borderRadius: '50%',
                border: '2px solid var(--lp-primary)',
                boxShadow: '0 0 15px rgba(225, 29, 72, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                top: onboardingStep === 1 ? '58px' : onboardingStep === 2 ? '170px' : '282px'
              }}
            >
              <img 
                src={chatbotLogo} 
                alt="Codeshor AI Moving Indicator" 
                style={{ width: '24px', height: '24px', objectFit: 'contain' }} 
              />
            </div>

            <svg className="lp-connector-svg lp-mobile-svg" viewBox="0 0 320 60" fill="none">
              <defs>
                <linearGradient id="glow-grad-m" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <path d="M 40 30 C 80 55, 120 55, 160 30 C 200 5, 240 5, 280 30" stroke="var(--lp-card-border)" strokeWidth="3" strokeLinecap="round" />
              <path 
                d="M 40 30 C 80 55, 120 55, 160 30 C 200 5, 240 5, 280 30" 
                stroke="url(#glow-grad-m)" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeDasharray="300"
                strokeDashoffset={300 - (onboardingProgress * 300)}
              />
            </svg>

            <div className="lp-stepper-controls">
              <button 
                className={`lp-stepper-btn ${onboardingStep === 1 ? 'active' : ''}`}
                onClick={() => setOnboardingStep(1)}
              >
                <div className="lp-step-num">01</div>
                <div className="lp-step-meta">
                  <span className="lp-step-name">Contact Us For Your Bot</span>
                  <span className="lp-step-time">Quick Request</span>
                </div>
              </button>

              <button 
                className={`lp-stepper-btn ${onboardingStep === 2 ? 'active' : ''}`}
                onClick={() => setOnboardingStep(2)}
              >
                <div className="lp-step-num">02</div>
                <div className="lp-step-meta">
                  <span className="lp-step-name">Add Link to Codebase</span>
                  <span className="lp-step-time">Simple Integration</span>
                </div>
              </button>

              <button 
                className={`lp-stepper-btn ${onboardingStep === 3 ? 'active' : ''}`}
                onClick={() => setOnboardingStep(3)}
              >
                <div className="lp-step-num">03</div>
                <div className="lp-step-meta">
                  <span className="lp-step-name">Final Setup & Go Live</span>
                  <span className="lp-step-time">Instant Activation</span>
                </div>
              </button>
            </div>
          </div>

          {/* Interactive Visual Display Window */}
          <div className="lp-onboarding-display-card">
            {onboardingStep === 1 && (
              <div className="lp-step-content-box animate-fade-in">
                <div className="lp-step-header-info">
                  <span className="lp-step-badge">STEP 1 OF 3</span>
                  <h3 className="lp-step-heading">Contact Us For Your Bot</h3>
                  <p className="lp-step-subheading">Reach out to us and tell us about your business. We will create a custom AI bot tailored specifically for you.</p>
                </div>

                <div className="lp-step-mockup-form">
                  <div className="lp-form-action" style={{marginTop: '2rem'}}>
                    <button className="lp-btn lp-btn-primary" onClick={onOpenModal}>
                      Request Your Bot Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="lp-step-content-box animate-fade-in">
                <div className="lp-step-header-info">
                  <span className="lp-step-badge">STEP 2 OF 3</span>
                  <h3 className="lp-step-heading">Add Link to Codebase</h3>
                  <p className="lp-step-subheading">Once your bot is ready, we will provide you with a simple link. Just add it to your project's codebase to connect your application instantly.</p>
                </div>

                <div className="lp-knowledge-feed-mockup">
                  <div className="lp-kb-item">
                    <span className="lp-kb-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></span>
                    <div>
                      <div className="lp-kb-title">Integration Link Provided</div>
                      <div className="lp-kb-desc">Ready to be embedded in your HTML/React App</div>
                    </div>
                    <span className="lp-kb-status">Ready</span>
                  </div>

                  <div className="lp-form-action" style={{marginTop: '2rem'}}>
                    <button className="lp-btn lp-btn-primary" onClick={() => setOnboardingStep(3)}>
                      Next: Final Setup
                    </button>
                  </div>
                </div>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="lp-step-content-box animate-fade-in">
                <div className="lp-step-header-info">
                  <span className="lp-step-badge">STEP 3 OF 3</span>
                  <h3 className="lp-step-heading">Final Setup & Go Live</h3>
                  <p className="lp-step-subheading">The final setup is done instantly and your bot will start working properly, serving your customers 24/7!</p>
                </div>

                <div className="lp-activation-mockup">
                  <div className="lp-live-status-banner" style={{marginTop: '2rem'}}>
                    <div className="lp-status-pulse"></div>
                    <span><svg style={{display:'inline',verticalAlign:'middle',marginRight:'6px'}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><strong>AI Assistant Active &amp; Responding 24/7!</strong></span>
                  </div>

                  <div className="lp-form-action" style={{marginTop: '2rem'}}>
                    <button className="lp-btn lp-btn-primary lp-btn-lg" onClick={onOpenModal}>
                      Get Started with your bot
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
