import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does Codeshor AI prevent hallucinations and wrong answers?",
      a: "Codeshor AI uses RAG (Retrieval-Augmented Generation) powered by GPT-4o-mini and Pinecone Vector Database. It is strictly constrained to answer questions using ONLY your verified business context. If the answer isn't in your knowledge base, it politely directs the client to contact you."
    },
    {
      q: "How do Voice Interactions work in the chatbot?",
      a: "Visitors can simply tap the microphone icon in the chat widget to record a voice note. Codeshor AI transcribes the audio in real-time, extracts the intent, and replies with accurate text and voice responses."
    },
    {
      q: "What happens when the AI doesn't know the answer to a question?",
      a: "The question is automatically flagged in your Admin Dashboard under 'Knowledge Gaps'. You can review the exact query, type the correct answer, and click 'Train AI'—making your bot permanently smarter for future visitors."
    },
    {
      q: "Can I embed Codeshor AI on any website platform?",
      a: "Yes! Codeshor AI works universally on WordPress, Shopify, Webflow, Wix, React, Next.js, or plain HTML. Simply copy and paste a single `<script>` tag into your site."
    },
    {
      q: "How fast can I get started?",
      a: "You can set up your business profile, customize your widget colors, and embed the AI chatbot on your website in under 2 minutes."
    }
  ];

  return (
    <div className="lp-root">
      {/* Background Lighting Elements */}
      <div className="lp-ambient-glow lp-ambient-1"></div>
      <div className="lp-ambient-glow lp-ambient-2"></div>
      <div className="lp-ambient-glow lp-ambient-3"></div>

      {/* Top Banner Announcement */}
      <div className="lp-top-banner">
        <div className="lp-house-badge animate-pulse-glow">
          <span className="lp-house-prefix">from the House of</span>
          <span className="lp-house-brand">C O D E S H O R</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="lp-nav lp-container">
        <div className="lp-nav-logo">
          <span className="lp-logo-text">Codeshor</span>
          <span className="lp-logo-badge">AI</span>
        </div>

        <div className={`lp-nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <Link to="/login" className="lp-nav-mobile-btn lp-btn lp-btn-secondary" onClick={() => setMobileMenuOpen(false)}>
            Sign In
          </Link>
        </div>

        <div className="lp-nav-actions">
          <Link to="/login" className="lp-btn lp-btn-secondary lp-hide-mobile">
            Sign In
          </Link>
          <Link to="/login" className="lp-btn lp-btn-primary">
            Start Free Trial
          </Link>

          <button 
            className="lp-mobile-menu-toggle" 
            aria-label="Toggle Navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="lp-hero lp-container">
        <div className="lp-hero-pill animate-fade-up">
          <span className="lp-pill-sparkle">✨</span>
          <span>Next-Gen Autonomous AI Assistant for B2B SaaS</span>
        </div>

        <h1 className="lp-hero-title animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Turn Website Visitors Into <br className="lp-br-desktop" />
          <span className="lp-text-gradient">Paying Customers 24/7</span>
        </h1>

        <p className="lp-hero-subtitle animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Deploy an intelligent, voice-enabled AI assistant in under 2 minutes. 
          Zero hallucinations, instant lead capture, and automated customer support that gets smarter every day.
        </p>

        <div className="lp-hero-cta-group animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/login" className="lp-btn lp-btn-primary lp-btn-lg">
            Start 14-Day Free Trial
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a href="#how-it-works" className="lp-btn lp-btn-secondary lp-btn-lg">
            See How It Works
          </a>
        </div>

        {/* Live Mockup Demo Card */}
        <div className="lp-hero-mockup-wrapper animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="lp-mockup-card">
            <div className="lp-mockup-header">
              <div className="lp-mockup-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="lp-mockup-title">codeshor-ai-widget.js • Live Context Preview</div>
              <div className="lp-mockup-badge">ONLINE</div>
            </div>

            <div className="lp-mockup-body">
              <div className="lp-chat-msg bot">
                <div className="lp-avatar">🤖</div>
                <div className="lp-msg-bubble">
                  Hi! Welcome to Codeshor AI. How can I help you scale your business today?
                </div>
              </div>

              <div className="lp-chat-msg user">
                <div className="lp-msg-bubble">
                  What are your pricing plans for permanent IT hiring?
                </div>
              </div>

              <div className="lp-chat-msg bot">
                <div className="lp-avatar">🤖</div>
                <div className="lp-msg-bubble">
                  For permanent IT hiring, our charges range from <strong>8% to 12% of the candidate's annual CTC</strong>. Would you like me to connect you with our talent acquisition lead?
                </div>
              </div>

              <div className="lp-chat-msg user voice">
                <div className="lp-msg-bubble">
                  <span className="lp-voice-wave">🎙️ Audio Note (0:14) • "Can I book a quick demo call?"</span>
                </div>
              </div>

              <div className="lp-chat-msg bot">
                <div className="lp-avatar">🤖</div>
                <div className="lp-msg-bubble">
                  Absolutely! Please leave your email or WhatsApp number below, and our team will schedule a live call right away.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="lp-stats-grid animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <div className="lp-stat-card">
            <div className="lp-stat-value">99.9%</div>
            <div className="lp-stat-label">Uptime SLA</div>
          </div>
          <div className="lp-stat-card">
            <div className="lp-stat-value">10x</div>
            <div className="lp-stat-label">Lead Conversion</div>
          </div>
          <div className="lp-stat-card">
            <div className="lp-stat-value">&lt; 50ms</div>
            <div className="lp-stat-label">Fast-Rule Intent Match</div>
          </div>
          <div className="lp-stat-card">
            <div className="lp-stat-value">93%</div>
            <div className="lp-stat-label">Support Automation</div>
          </div>
        </div>
      </header>

      {/* Features Grid Section */}
      <section id="features" className="lp-section lp-container">
        <div className="lp-section-header">
          <div className="lp-section-tag">ENGINEERED FOR GROWTH</div>
          <h2 className="lp-section-title">Everything You Need to Scale Support &amp; Sales</h2>
          <p className="lp-section-desc">
            A comprehensive suite of AI tools designed to capture leads, answer questions, and eliminate repetitive support tickets.
          </p>
        </div>

        <div className="lp-features-grid">
          {/* Feature 1 */}
          <div className="lp-feature-card">
            <div className="lp-feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <h3 className="lp-feature-title">Smart RAG AI Engine</h3>
            <p className="lp-feature-desc">
              Powered by GPT-4o-mini and Pinecone Vector Search. Answers strictly using your verified business context with zero hallucinations.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="lp-feature-card">
            <div className="lp-feature-icon-wrapper highlight">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 className="lp-feature-title">Knowledge Gaps Learning</h3>
            <p className="lp-feature-desc">
              Unanswered questions are automatically logged into your dashboard. Review the gap, add the answer, and click 'Train AI' to get smarter every day.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="lp-feature-card">
            <div className="lp-feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
            </div>
            <h3 className="lp-feature-title">Native Voice Notes AI</h3>
            <p className="lp-feature-desc">
              Allows customers to record audio messages directly in the widget. Transcribes speech to text in real-time for effortless communication.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="lp-feature-card">
            <div className="lp-feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="lp-feature-title">Automated Lead Capture</h3>
            <p className="lp-feature-desc">
              Collect visitor names, emails, and WhatsApp numbers before starting conversations, feeding qualified leads straight to your CRM dashboard.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="lp-feature-card">
            <div className="lp-feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
            <h3 className="lp-feature-title">100% Brand Customization</h3>
            <p className="lp-feature-desc">
              Match your site aesthetic with custom brand colors, logos, launcher icons, background patterns, and personalized welcome messages.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="lp-feature-card">
            <div className="lp-feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h3 className="lp-feature-title">Instant Fast-Rules Engine</h3>
            <p className="lp-feature-desc">
              Answers common intents like address, contact details, and business hours in under 50ms without waiting for LLM completion.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="lp-section lp-container">
        <div className="lp-section-header">
          <div className="lp-section-tag">SIMPLE SETUP</div>
          <h2 className="lp-section-title">Get Up &amp; Running in 3 Easy Steps</h2>
          <p className="lp-section-desc">No coding experience required. Transform your site engagement today.</p>
        </div>

        <div className="lp-steps-grid">
          <div className="lp-step-card">
            <div className="lp-step-number">01</div>
            <h3 className="lp-step-title">Embed Script Tag</h3>
            <p className="lp-step-desc">Copy and paste a single line of lightweight JavaScript into your website header or footer.</p>
          </div>

          <div className="lp-step-card">
            <div className="lp-step-number">02</div>
            <h3 className="lp-step-title">Add Business Knowledge</h3>
            <p className="lp-step-desc">Input your services, pricing tiers, FAQs, and contact details into the Admin Dashboard.</p>
          </div>

          <div className="lp-step-card">
            <div className="lp-step-number">03</div>
            <h3 className="lp-step-title">Autopilot Sales &amp; Support</h3>
            <p className="lp-step-desc">Your AI chatbot immediately begins serving visitors, capturing leads, and learning automatically.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="lp-section lp-container">
        <div className="lp-section-header">
          <div className="lp-section-tag">TRANSPARENT PRICING</div>
          <h2 className="lp-section-title">Plans Built for Every Stage of Growth</h2>
          <p className="lp-section-desc">Straightforward pricing in INR with zero hidden fees. Scale as your traffic expands.</p>
        </div>

        <div className="lp-pricing-grid">
          {/* Starter Plan */}
          <div className="lp-pricing-card">
            <div className="lp-pricing-header">
              <h3 className="lp-pricing-name">Starter Plan</h3>
              <p className="lp-pricing-target">Ideal for local businesses &amp; startups</p>
              <div className="lp-pricing-amount">
                <span className="lp-currency">₹</span>1,499<span className="lp-period">/month</span>
              </div>
            </div>

            <ul className="lp-pricing-features">
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> <strong>1,000 AI Text Responses</strong> / mo</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> <strong>100 Voice Interactions</strong> (1 min cap)</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Basic Widget Customization</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Standard Knowledge Base</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Email Support</li>
            </ul>

            <Link to="/login" className="lp-btn lp-btn-secondary lp-btn-full">
              Get Started with Starter
            </Link>
          </div>

          {/* Growth Plan */}
          <div className="lp-pricing-card popular">
            <div className="lp-popular-badge">🔥 MOST POPULAR • 93% PROFIT ROI</div>

            <div className="lp-pricing-header">
              <h3 className="lp-pricing-name">Growth Plan</h3>
              <p className="lp-pricing-target">Perfect for E-commerce, Real Estate &amp; Clinics</p>
              <div className="lp-pricing-amount">
                <span className="lp-currency">₹</span>3,499<span className="lp-period">/month</span>
              </div>
            </div>

            <ul className="lp-pricing-features">
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> <strong>3,000 AI Text Responses</strong> / mo</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> <strong>400 Voice Interactions</strong></li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Advanced Analytics &amp; Lead Sync</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> <strong>Remove Codeshor Watermark</strong></li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Knowledge Gap Auto-Tracker</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Priority Chat &amp; Email Support</li>
            </ul>

            <Link to="/login" className="lp-btn lp-btn-primary lp-btn-full">
              Upgrade to Growth Plan
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="lp-pricing-card">
            <div className="lp-pricing-header">
              <h3 className="lp-pricing-name">Enterprise Plan</h3>
              <p className="lp-pricing-target">For high-traffic agencies &amp; enterprise platforms</p>
              <div className="lp-pricing-amount">
                <span className="lp-currency">₹</span>7,999<span className="lp-period">/month</span>
              </div>
            </div>

            <ul className="lp-pricing-features">
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> <strong>10,000 AI Text Responses</strong> / mo</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> <strong>1,500 Voice Interactions</strong></li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Custom API &amp; CRM Integrations</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Dedicated Account Manager</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> 99.9% SLA &amp; Priority 24/7 Support</li>
            </ul>

            <Link to="/login" className="lp-btn lp-btn-secondary lp-btn-full">
              Contact Enterprise Sales
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="lp-section lp-container">
        <div className="lp-section-header">
          <div className="lp-section-tag">GOT QUESTIONS?</div>
          <h2 className="lp-section-title">Frequently Asked Questions</h2>
          <p className="lp-section-desc">Everything you need to know about setting up and scaling your AI chatbot.</p>
        </div>

        <div className="lp-faq-accordion">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`lp-faq-item ${openFaq === index ? 'open' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="lp-faq-question">
                <span>{faq.q}</span>
                <span className="lp-faq-icon">{openFaq === index ? '−' : '+'}</span>
              </div>
              {openFaq === index && (
                <div className="lp-faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="lp-cta-section lp-container">
        <div className="lp-cta-box">
          <h2 className="lp-cta-title">Ready to Automate Support &amp; Skyrocket Leads?</h2>
          <p className="lp-cta-desc">Join forward-thinking companies powered by Codeshor AI today.</p>
          <div className="lp-cta-actions">
            <Link to="/login" className="lp-btn lp-btn-primary lp-btn-lg">
              Start Free Trial Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer lp-container">
        <div className="lp-footer-content">
          <div className="lp-footer-brand">
            <div className="lp-nav-logo">
              <span className="lp-logo-text">Codeshor</span>
              <span className="lp-logo-badge">AI</span>
            </div>
            <p className="lp-footer-tagline">Crafting Next-Gen Autonomous AI Experiences.</p>
            <div className="lp-footer-house">
              from the House of <span className="lp-house-highlight">C O D E S H O R</span>
            </div>
          </div>

          <div className="lp-footer-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <Link to="/login">Sign In</Link>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <p>&copy; {new Date().getFullYear()} Codeshor AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
