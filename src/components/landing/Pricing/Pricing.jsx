import React from 'react';

const Pricing = ({ billingCycle, setBillingCycle, chatbotLogo }) => {
  return (
    <section id="pricing" className="lp-section lp-pricing-section">
      <div className="lp-pricing-ambient"></div>
      <div className="lp-container">
        <div className="lp-section-header">
          <div className="lp-section-tag">TRANSPARENT PRICING</div>
          <h2 className="lp-section-title"><span className="hero-text-dim">Plans Built for Every Stage of</span> <span className="hero-text-bright">Growth</span></h2>
          <p className="lp-section-desc">Straightforward pricing in INR with zero hidden fees. Scale as your traffic expands.</p>
          
          {/* Billing Cycle Toggle */}
          <div className="lp-billing-toggle">
            <button 
              className={`lp-billing-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly Billing
            </button>
            <button 
              className={`lp-billing-btn ${billingCycle === 'annual' ? 'active' : ''}`}
              onClick={() => setBillingCycle('annual')}
            >
              Yearly Billing <span className="lp-discount-badge">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="lp-pricing-grid">
          {/* Starter Plan */}
          <div className="lp-pricing-card">
            <div className="lp-pricing-badge-logo">
              <img src={chatbotLogo} alt="Codeshor AI Badge" />
            </div>
            <div>
              <div className="lp-pricing-tier-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>
              </div>
              <div className="lp-pricing-header">
                <h3 className="lp-pricing-name">Starter Plan</h3>
                <p className="lp-pricing-target">Ideal for local businesses &amp; startups</p>
                <div className="lp-pricing-amount">
                  <span className="lp-currency">₹</span>
                  {billingCycle === 'monthly' ? '1,499' : '1,199'}
                  <span className="lp-period">/month</span>
                </div>
              </div>

              <div className="lp-pricing-divider"></div>

              <ul className="lp-pricing-features">
                <li><span className="lp-pricing-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> <strong>1,000 AI Text Responses</strong> / mo</li>
                <li><span className="lp-pricing-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> <strong>100 Voice Interactions</strong></li>
                <li><span className="lp-pricing-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> Basic Widget Customization</li>
                <li><span className="lp-pricing-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> Standard Knowledge Base</li>
                <li><span className="lp-pricing-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> Email Support</li>
              </ul>
            </div>

            <a href="tel:+919106414283" className="lp-pricing-cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Contact Sales
            </a>
          </div>

          {/* Growth Plan - Popular */}
          <div className="lp-pricing-card popular">
            <div className="lp-pricing-badge-logo popular-logo">
              <img src={chatbotLogo} alt="Codeshor AI Premium Badge" />
            </div>
            <div className="lp-popular-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              MOST POPULAR • 93% ROI
            </div>

            <div>
              <div className="lp-pricing-tier-icon popular-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <div className="lp-pricing-header">
                <h3 className="lp-pricing-name">Growth Plan</h3>
                <p className="lp-pricing-target">Perfect for E-commerce &amp; Clinics</p>
                <div className="lp-pricing-amount">
                  <span className="lp-currency">₹</span>
                  {billingCycle === 'monthly' ? '3,499' : '2,799'}
                  <span className="lp-period">/month</span>
                </div>
              </div>

              <div className="lp-pricing-divider"></div>

              <ul className="lp-pricing-features">
                <li><span className="lp-pricing-check popular-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> <strong>3,000 AI Text Responses</strong> / mo</li>
                <li><span className="lp-pricing-check popular-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> <strong>400 Voice Interactions</strong></li>
                <li><span className="lp-pricing-check popular-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> Advanced Analytics &amp; Lead Sync</li>
                <li><span className="lp-pricing-check popular-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> <strong>Remove Watermark</strong></li>
                <li><span className="lp-pricing-check popular-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> Knowledge Gap Auto-Tracker</li>
                <li><span className="lp-pricing-check popular-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> Priority Chat &amp; Email Support</li>
              </ul>
            </div>

            <a href="tel:+919106414283" className="lp-pricing-cta popular-cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Contact Sales
            </a>
          </div>

          {/* Enterprise Plan */}
          <div className="lp-pricing-card">
            <div className="lp-pricing-badge-logo">
              <img src={chatbotLogo} alt="Codeshor AI Enterprise Badge" />
            </div>
            <div>
              <div className="lp-pricing-tier-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <div className="lp-pricing-header">
                <h3 className="lp-pricing-name">Enterprise Plan</h3>
                <p className="lp-pricing-target">For high-traffic agencies &amp; platforms</p>
                <div className="lp-pricing-amount">
                  <span className="lp-currency">₹</span>
                  {billingCycle === 'monthly' ? '7,999' : '6,399'}
                  <span className="lp-period">/month</span>
                </div>
              </div>

              <div className="lp-pricing-divider"></div>

              <ul className="lp-pricing-features">
                <li><span className="lp-pricing-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> <strong>10,000 AI Text Responses</strong> / mo</li>
                <li><span className="lp-pricing-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> <strong>1,500 Voice Interactions</strong></li>
                <li><span className="lp-pricing-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> Custom API Integrations</li>
                <li><span className="lp-pricing-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> Dedicated Account Manager</li>
                <li><span className="lp-pricing-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span> 99.9% SLA &amp; Priority Support</li>
              </ul>
            </div>

            <a href="tel:+919106414283" className="lp-pricing-cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
