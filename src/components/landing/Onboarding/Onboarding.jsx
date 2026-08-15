import React from 'react';
import { Link } from 'react-router-dom';

const Onboarding = ({
  onboardingRef,
  onboardingProgress,
  onboardingStep,
  setOnboardingStep,
  chatbotLogo
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
                  <span className="lp-step-name">Register Domain</span>
                  <span className="lp-step-time">30 Seconds</span>
                </div>
              </button>

              <button 
                className={`lp-stepper-btn ${onboardingStep === 2 ? 'active' : ''}`}
                onClick={() => setOnboardingStep(2)}
              >
                <div className="lp-step-num">02</div>
                <div className="lp-step-meta">
                  <span className="lp-step-name">Feed Business Knowledge</span>
                  <span className="lp-step-time">60 Seconds</span>
                </div>
              </button>

              <button 
                className={`lp-stepper-btn ${onboardingStep === 3 ? 'active' : ''}`}
                onClick={() => setOnboardingStep(3)}
              >
                <div className="lp-step-num">03</div>
                <div className="lp-step-meta">
                  <span className="lp-step-name">One-Click Activation</span>
                  <span className="lp-step-time">Instant Go-Live</span>
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
                  <h3 className="lp-step-heading">Create Account &amp; Register Website Domain</h3>
                  <p className="lp-step-subheading">Enter your company name and domain URL. Our system automatically whitelists your domain securely.</p>
                </div>

                <div className="lp-step-mockup-form">
                  <div className="lp-form-row">
                    <label>Company Name</label>
                    <input type="text" readOnly value="Acme Technologies Inc." className="lp-preview-input" />
                  </div>
                  <div className="lp-form-row">
                    <label>Website Domain</label>
                    <div className="lp-input-with-badge">
                      <input type="text" readOnly value="acmetech.com" className="lp-preview-input" />
                      <span className="lp-verified-badge">✓ Whitelisted</span>
                    </div>
                  </div>
                  <div className="lp-form-action">
                    <button className="lp-btn lp-btn-primary" onClick={() => setOnboardingStep(2)}>
                      Next: Feed Knowledge Base
                    </button>
                  </div>
                </div>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="lp-step-content-box animate-fade-in">
                <div className="lp-step-header-info">
                  <span className="lp-step-badge">STEP 2 OF 3</span>
                  <h3 className="lp-step-heading">Feed Business Services, Pricing &amp; FAQs</h3>
                  <p className="lp-step-subheading">No complex coding. Paste services, prices, and FAQs. Our search engine indexes it instantly.</p>
                </div>

                <div className="lp-knowledge-feed-mockup">
                  <div className="lp-kb-item">
                    <span className="lp-kb-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></span>
                    <div>
                      <div className="lp-kb-title">Services &amp; Offerings</div>
                      <div className="lp-kb-desc">IT Staffing, Software Development, UI/UX Design</div>
                    </div>
                    <span className="lp-kb-status">Indexed</span>
                  </div>

                  <div className="lp-kb-item">
                    <span className="lp-kb-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
                    <div>
                      <div className="lp-kb-title">Pricing Structure</div>
                      <div className="lp-kb-desc">8-12% annual CTC; custom staffing rates</div>
                    </div>
                    <span className="lp-kb-status">Indexed</span>
                  </div>

                  <div className="lp-kb-item">
                    <span className="lp-kb-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
                    <div>
                      <div className="lp-kb-title">Business Hours &amp; Location</div>
                      <div className="lp-kb-desc">Mon-Fri 9:30 AM - 6:30 PM IST • Bengaluru</div>
                    </div>
                    <span className="lp-kb-status">Indexed</span>
                  </div>

                  <div className="lp-form-action">
                    <button className="lp-btn lp-btn-primary" onClick={() => setOnboardingStep(3)}>
                      Next: Activate AI Assistant
                    </button>
                  </div>
                </div>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="lp-step-content-box animate-fade-in">
                <div className="lp-step-header-info">
                  <span className="lp-step-badge">STEP 3 OF 3</span>
                  <h3 className="lp-step-heading">One-Click Activation &amp; Instant Go-Live</h3>
                  <p className="lp-step-subheading">Select your platform and click Activate. Your chatbot begins handling visitor support instantly, 24/7!</p>
                </div>

                <div className="lp-activation-mockup">
                  <div className="lp-platform-cards-grid">
                    <div className="lp-platform-card active">
                      <span className="lp-platform-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span>
                      <div className="lp-platform-name">WordPress / Webflow</div>
                      <span className="lp-platform-status">1-Click Connected</span>
                    </div>

                    <div className="lp-platform-card active">
                      <span className="lp-platform-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></span>
                      <div className="lp-platform-name">Shopify Store</div>
                      <span className="lp-platform-status">App Connected</span>
                    </div>

                    <div className="lp-platform-card active">
                      <span className="lp-platform-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
                      <div className="lp-platform-name">Custom React / Web</div>
                      <span className="lp-platform-status">Auto-Detected</span>
                    </div>
                  </div>

                  <div className="lp-live-status-banner">
                    <div className="lp-status-pulse"></div>
                    <span><svg style={{display:'inline',verticalAlign:'middle',marginRight:'6px'}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><strong>AI Assistant Active &amp; Responding 24/7!</strong> acmetech.com</span>
                  </div>

                  <div className="lp-form-action">
                    <Link to="/login" className="lp-btn lp-btn-primary lp-btn-lg">
                      Launch Your AI Assistant Now
                    </Link>
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
