import React from 'react';

const Compare = ({ activeCompareIndex, compareGridRef, chatbotLogo }) => {
  return (
    <section className="lp-section lp-compare-section">
      <div className="lp-compare-ambient"></div>
      <div className="lp-container">
        <div className="lp-section-header">
          <div className="lp-section-tag">WHY CHOOSE US</div>
          <h2 className="lp-section-title"><span className="hero-text-dim">Why Companies Pick</span> <span className="hero-text-bright">Codeshor AI</span></h2>
          <p className="lp-section-desc">See why modern B2B companies are switching to our autonomous AI engine over legacy chatbots.</p>
        </div>

        {/* Comparison Header Labels */}
        <div className="lp-compare-header-row">
          <div className="lp-compare-header-feature">Feature</div>
          <div className="lp-compare-header-legacy">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            Legacy Chatbots
          </div>
          <div className="lp-compare-header-ai">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Codeshor AI
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="lp-compare-grid" ref={compareGridRef}>
          {/* Dynamic Codeshor AI Moving Logo Indicator */}
          <div 
            className="lp-compare-moving-logo lp-hide-mobile"
            style={{
              position: 'absolute',
              right: '-20px',
              transform: 'translateY(-50%)',
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
              top: 'calc(10% + var(--compare-logo-pos, 0) * 80%)',
              transition: 'top 0.1s linear'
            }}
          >
            <img 
              src={chatbotLogo} 
              alt="Codeshor AI Moving Indicator" 
              style={{ width: '24px', height: '24px', objectFit: 'contain' }} 
            />
          </div>

          {/* Row 1 */}
          <div className={`lp-compare-card ${activeCompareIndex === 0 ? 'active' : ''}`}>
            <div className="lp-compare-feature-col">
              <div className="lp-compare-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span className="lp-compare-feature-name">Hallucination Protection</span>
            </div>
            <div className="lp-compare-legacy-col">
              <span className="lp-compare-x-icon">✕</span>
              <span>Frequent wrong answers</span>
            </div>
            <div className="lp-compare-ai-col">
              <span className="lp-compare-check-icon">✓</span>
              <span>100% Context Strict (RAG)</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className={`lp-compare-card ${activeCompareIndex === 1 ? 'active' : ''}`}>
            <div className="lp-compare-feature-col">
              <div className="lp-compare-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
              </div>
              <span className="lp-compare-feature-name">Voice Note Support</span>
            </div>
            <div className="lp-compare-legacy-col">
              <span className="lp-compare-x-icon">✕</span>
              <span>Text Only</span>
            </div>
            <div className="lp-compare-ai-col">
              <span className="lp-compare-check-icon">✓</span>
              <span>Speech-to-Text &amp; Audio AI</span>
            </div>
          </div>

          {/* Row 3 */}
          <div className={`lp-compare-card ${activeCompareIndex === 2 ? 'active' : ''}`}>
            <div className="lp-compare-feature-col">
              <div className="lp-compare-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <span className="lp-compare-feature-name">Auto-Learning Loop</span>
            </div>
            <div className="lp-compare-legacy-col">
              <span className="lp-compare-x-icon">✕</span>
              <span>Manual FAQ setup</span>
            </div>
            <div className="lp-compare-ai-col">
              <span className="lp-compare-check-icon">✓</span>
              <span>Knowledge Gap Auto-Tracker</span>
            </div>
          </div>

          {/* Row 4 */}
          <div className={`lp-compare-card ${activeCompareIndex === 3 ? 'active' : ''}`}>
            <div className="lp-compare-feature-col">
              <div className="lp-compare-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <span className="lp-compare-feature-name">Response Latency</span>
            </div>
            <div className="lp-compare-legacy-col">
              <span className="lp-compare-warn-icon">⚠</span>
              <span>3-5 seconds</span>
            </div>
            <div className="lp-compare-ai-col">
              <span className="lp-compare-bolt-icon">⚡</span>
              <span>&lt; 50ms Fast-Rules</span>
            </div>
          </div>

          {/* Row 5 */}
          <div className={`lp-compare-card ${activeCompareIndex === 4 ? 'active' : ''}`}>
            <div className="lp-compare-feature-col">
              <div className="lp-compare-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <span className="lp-compare-feature-name">Lead Generation</span>
            </div>
            <div className="lp-compare-legacy-col">
              <span className="lp-compare-x-icon">✕</span>
              <span>Complex integrations required</span>
            </div>
            <div className="lp-compare-ai-col">
              <span className="lp-compare-check-icon">✓</span>
              <span>Native Pre-Chat Qualification</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compare;
