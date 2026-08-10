import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroTab, setHeroTab] = useState('chat');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [monthlyQueries, setMonthlyQueries] = useState(2500);
  const [copiedCode, setCopiedCode] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCopyCode = () => {
    const codeSnippet = `<script src="https://cdn.codeshor.ai/widget.js" data-client-id="YOUR_CLIENT_ID" async></script>`;
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // ROI Calculator Math
  const hoursSavedPerMonth = Math.round((monthlyQueries * 3) / 60);
  const estimatedMoneySaved = Math.round(hoursSavedPerMonth * 350);

  const faqs = [
    {
      q: "How does Codeshor AI prevent hallucinations?",
      a: "Codeshor AI uses RAG (Retrieval-Augmented Generation) powered by GPT-4o-mini and Pinecone Vector Search. It strictly answers using ONLY your verified business context. If the answer isn't in your knowledge base, it politely directs the client to contact you."
    },
    {
      q: "How do Voice Interactions work in the chatbot?",
      a: "Visitors tap the microphone icon in the chat widget to record a voice note. Codeshor AI transcribes the audio in real-time, extracts the intent, and replies with accurate text and voice responses."
    },
    {
      q: "What happens when the AI doesn't know the answer?",
      a: "The question is automatically logged in your Admin Dashboard under 'Knowledge Gaps'. You can review the query, add the answer, and click 'Train AI'—making your bot permanently smarter for future visitors."
    },
    {
      q: "Can I embed Codeshor AI on any website platform?",
      a: "Yes! Works universally on WordPress, Shopify, Webflow, Wix, React, Next.js, or plain HTML. Simply copy and paste a single `<script>` tag into your site."
    },
    {
      q: "How fast can I get started?",
      a: "You can set up your business profile, customize your widget colors, and embed the AI chatbot on your website in under 2 minutes."
    }
  ];

  return (
    <div className="lp-root">
      {/* Grid Pattern Backdrop */}
      <div className="lp-grid-pattern"></div>

      {/* Ambient Glows */}
      <div className="lp-ambient-glow lp-ambient-1"></div>
      <div className="lp-ambient-glow lp-ambient-2"></div>

      {/* Luxury Top House Banner */}
      <div className="lp-top-banner">
        <div className="lp-house-badge-container">
          <div className="lp-house-badge">
            <span className="lp-house-icon">🏛️</span>
            <span className="lp-house-prefix">From the House of</span>
            <span className="lp-house-brand">C O D E S H O R</span>
            <span className="lp-house-sparkle">✨</span>
          </div>
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
          <a href="#demo" onClick={() => setMobileMenuOpen(false)}>Live Demo</a>
          <a href="#calculator" onClick={() => setMobileMenuOpen(false)}>ROI Calculator</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
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
        <div className="lp-hero-pill">
          <span className="lp-pill-sparkle">🚀</span>
          <span>Next-Gen Autonomous AI &amp; Voice Platform for B2B</span>
        </div>

        <h1 className="lp-hero-title">
          Turn Website Visitors Into <br className="lp-br-desktop" />
          <span className="lp-text-gradient">Paying Customers 24/7</span>
        </h1>

        <p className="lp-hero-subtitle">
          Deploy an intelligent, voice-enabled AI assistant in under 2 minutes. 
          Zero hallucinations, instant lead capture, and automated customer support that gets smarter every day.
        </p>

        <div className="lp-hero-cta-group">
          <Link to="/login" className="lp-btn lp-btn-primary lp-btn-lg">
            Start 14-Day Free Trial
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a href="#calculator" className="lp-btn lp-btn-secondary lp-btn-lg">
            Calculate Your ROI
          </a>
        </div>

        {/* Interactive Feature Switcher / Live Preview */}
        <div id="demo" className="lp-interactive-demo-container">
          <div className="lp-demo-tabs">
            <button 
              className={`lp-demo-tab ${heroTab === 'chat' ? 'active' : ''}`}
              onClick={() => setHeroTab('chat')}
            >
              💬 Smart RAG Chat
            </button>
            <button 
              className={`lp-demo-tab ${heroTab === 'voice' ? 'active' : ''}`}
              onClick={() => setHeroTab('voice')}
            >
              🎙️ Voice Notes AI
            </button>
            <button 
              className={`lp-demo-tab ${heroTab === 'leads' ? 'active' : ''}`}
              onClick={() => setHeroTab('leads')}
            >
              🧲 Lead Capture
            </button>
            <button 
              className={`lp-demo-tab ${heroTab === 'knowledge' ? 'active' : ''}`}
              onClick={() => setHeroTab('knowledge')}
            >
              🧠 Knowledge Gaps
            </button>
          </div>

          <div className="lp-mockup-card">
            <div className="lp-mockup-header">
              <div className="lp-mockup-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="lp-mockup-title">
                {heroTab === 'chat' && 'codeshor-ai • RAG Context Engine'}
                {heroTab === 'voice' && 'codeshor-ai • Real-time Voice Transcription'}
                {heroTab === 'leads' && 'codeshor-ai • Automated Lead Qualification'}
                {heroTab === 'knowledge' && 'codeshor-ai • One-Click Knowledge Gap Trainer'}
              </div>
              <div className="lp-mockup-badge">LIVE DEMO</div>
            </div>

            <div className="lp-mockup-body">
              {heroTab === 'chat' && (
                <>
                  <div className="lp-chat-msg bot">
                    <div className="lp-avatar">🤖</div>
                    <div className="lp-msg-bubble">
                      Welcome to Codeshor AI! Ask me anything about our services or pricing.
                    </div>
                  </div>
                  <div className="lp-chat-msg user">
                    <div className="lp-msg-bubble">
                      What are your permanent hiring pricing rates?
                    </div>
                  </div>
                  <div className="lp-chat-msg bot">
                    <div className="lp-avatar">🤖</div>
                    <div className="lp-msg-bubble">
                      For permanent hiring, our fee is <strong>8% to 12% of the candidate's annual CTC</strong>. We close 90% of roles within 2 to 4 weeks!
                    </div>
                  </div>
                </>
              )}

              {heroTab === 'voice' && (
                <>
                  <div className="lp-chat-msg user voice">
                    <div className="lp-msg-bubble">
                      <span className="lp-voice-wave">🎙️ Voice Note (0:12) • "Hi, do you offer bulk hiring for startups?"</span>
                    </div>
                  </div>
                  <div className="lp-chat-msg bot">
                    <div className="lp-avatar">🤖</div>
                    <div className="lp-msg-bubble">
                      Yes! We offer bulk hiring packages with custom volume discounts tailored for fast-growing startups. Would you like a price quote?
                    </div>
                  </div>
                </>
              )}

              {heroTab === 'leads' && (
                <div className="lp-lead-preview-form">
                  <div className="lp-lead-title">👋 Welcome! Enter your details to start chatting</div>
                  <div className="lp-lead-inputs">
                    <input type="text" placeholder="Your Name" readOnly value="Alex Johnson" className="lp-preview-input" />
                    <input type="email" placeholder="Email Address" readOnly value="alex@company.com" className="lp-preview-input" />
                    <button className="lp-btn lp-btn-primary lp-btn-full">Start Instant Chat</button>
                  </div>
                  <div className="lp-lead-footer">🔒 Lead automatically synced to Admin CRM</div>
                </div>
              )}

              {heroTab === 'knowledge' && (
                <div className="lp-knowledge-preview">
                  <div className="lp-gap-header">
                    <span className="lp-gap-badge">NEW KNOWLEDGE GAP DETECTED</span>
                    <span className="lp-gap-time">Just now</span>
                  </div>
                  <div className="lp-gap-question">User asked: "Do you provide onsite developers in Bengaluru?"</div>
                  <div className="lp-gap-answer-box">
                    <label>Add Verified Answer:</label>
                    <input type="text" readOnly value="Yes, we provide onsite developers across Bengaluru, Mumbai, and Delhi NCR." className="lp-preview-input" />
                  </div>
                  <button className="lp-btn lp-btn-primary" style={{ alignSelf: 'flex-end' }}>
                    ✨ Train AI (1-Click)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tech Stack Logo Cloud */}
        <div className="lp-logo-cloud">
          <div className="lp-logo-cloud-title">POWERED BY ENTERPRISE INFRASTRUCTURE</div>
          <div className="lp-logos-wrapper">
            <span className="lp-tech-badge">OpenAI GPT-4o</span>
            <span className="lp-tech-badge">Pinecone Vector DB</span>
            <span className="lp-tech-badge">Vercel Edge</span>
            <span className="lp-tech-badge">Upstash Redis</span>
            <span className="lp-tech-badge">MongoDB Atlas</span>
            <span className="lp-tech-badge">Render Cloud</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="lp-stats-grid">
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
            <div className="lp-stat-label">Fast-Rule Match</div>
          </div>
          <div className="lp-stat-card">
            <div className="lp-stat-value">93%</div>
            <div className="lp-stat-label">Automation Rate</div>
          </div>
        </div>
      </header>

      {/* Code Embed Snippet Component */}
      <section className="lp-section lp-container">
        <div className="lp-code-snippet-box">
          <div className="lp-snippet-header">
            <div className="lp-snippet-info">
              <span className="lp-snippet-icon">⚡</span>
              <div>
                <h3 className="lp-snippet-title">Embed in 60 Seconds</h3>
                <p className="lp-snippet-desc">Copy and paste this single script tag before the closing &lt;/head&gt; tag on any website.</p>
              </div>
            </div>
            <button className="lp-btn lp-btn-secondary" onClick={handleCopyCode}>
              {copiedCode ? '✓ Copied!' : '📋 Copy Script Tag'}
            </button>
          </div>
          <div className="lp-code-block">
            <code>
              &lt;<span className="tag">script</span> <span className="attr">src</span>=<span className="val">"https://cdn.codeshor.ai/widget.js"</span> <span className="attr">data-client-id</span>=<span className="val">"YOUR_CLIENT_ID"</span> <span className="attr">async</span>&gt;&lt;/<span className="tag">script</span>&gt;
            </code>
          </div>
        </div>
      </section>

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
          <div className="lp-feature-card">
            <div className="lp-feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" /><path d="M12 6v6l4 2" /></svg>
            </div>
            <h3 className="lp-feature-title">Smart RAG AI Engine</h3>
            <p className="lp-feature-desc">
              Powered by GPT-4o-mini and Pinecone Vector Search. Answers strictly using your verified business context with zero hallucinations.
            </p>
          </div>

          <div className="lp-feature-card">
            <div className="lp-feature-icon-wrapper highlight">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            </div>
            <h3 className="lp-feature-title">Knowledge Gaps Learning</h3>
            <p className="lp-feature-desc">
              Unanswered questions are automatically logged into your dashboard. Review the gap, add the answer, and click 'Train AI' to get smarter every day.
            </p>
          </div>

          <div className="lp-feature-card">
            <div className="lp-feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></svg>
            </div>
            <h3 className="lp-feature-title">Native Voice Notes AI</h3>
            <p className="lp-feature-desc">
              Allows customers to record audio messages directly in the widget. Transcribes speech to text in real-time for effortless communication.
            </p>
          </div>

          <div className="lp-feature-card">
            <div className="lp-feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            </div>
            <h3 className="lp-feature-title">Automated Lead Capture</h3>
            <p className="lp-feature-desc">
              Collect visitor names, emails, and WhatsApp numbers before starting conversations, feeding qualified leads straight to your CRM dashboard.
            </p>
          </div>

          <div className="lp-feature-card">
            <div className="lp-feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </div>
            <h3 className="lp-feature-title">100% Brand Customization</h3>
            <p className="lp-feature-desc">
              Match your site aesthetic with custom brand colors, logos, launcher icons, background patterns, and personalized welcome messages.
            </p>
          </div>

          <div className="lp-feature-card">
            <div className="lp-feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            </div>
            <h3 className="lp-feature-title">Instant Fast-Rules Engine</h3>
            <p className="lp-feature-desc">
              Answers common intents like address, contact details, and business hours in under 50ms without waiting for LLM completion.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator Component */}
      <section id="calculator" className="lp-section lp-container">
        <div className="lp-section-header">
          <div className="lp-section-tag">ESTIMATE SAVINGS</div>
          <h2 className="lp-section-title">See How Much Time &amp; Money You Save</h2>
          <p className="lp-section-desc">Adjust your monthly query volume to estimate your team's savings.</p>
        </div>

        <div className="lp-calculator-box">
          <div className="lp-calc-inputs">
            <div className="lp-slider-header">
              <label>Monthly Visitor Queries / Chats:</label>
              <span className="lp-slider-value">{monthlyQueries.toLocaleString()} / mo</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="15000" 
              step="500"
              value={monthlyQueries}
              onChange={(e) => setMonthlyQueries(Number(e.target.value))}
              className="lp-range-slider"
            />
          </div>

          <div className="lp-calc-results">
            <div className="lp-calc-card">
              <div className="lp-calc-number">{hoursSavedPerMonth} hrs</div>
              <div className="lp-calc-label">Support Hours Saved / mo</div>
            </div>
            <div className="lp-calc-card highlight">
              <div className="lp-calc-number">₹{estimatedMoneySaved.toLocaleString()}</div>
              <div className="lp-calc-label">Estimated Monthly Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix Component */}
      <section className="lp-section lp-container">
        <div className="lp-section-header">
          <div className="lp-section-tag">WHY CHOOSE US</div>
          <h2 className="lp-section-title">Codeshor AI vs Legacy Chatbots</h2>
          <p className="lp-section-desc">See why modern B2B companies are switching to our autonomous AI engine.</p>
        </div>

        <div className="lp-comparison-table-wrapper">
          <table className="lp-comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Legacy Chatbots</th>
                <th className="lp-highlight-col">Codeshor AI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hallucination Protection</td>
                <td>❌ Frequent wrong answers</td>
                <td className="lp-highlight-col">✓ 100% Context Strict (RAG)</td>
              </tr>
              <tr>
                <td>Voice Note Support</td>
                <td>❌ Text Only</td>
                <td className="lp-highlight-col">✓ Speech-to-Text &amp; Audio AI</td>
              </tr>
              <tr>
                <td>Auto-Learning Loop</td>
                <td>❌ Manual FAQ setup</td>
                <td className="lp-highlight-col">✓ Knowledge Gap Auto-Tracker</td>
              </tr>
              <tr>
                <td>Response Latency</td>
                <td>⚠️ 3-5 seconds</td>
                <td className="lp-highlight-col">⚡ &lt; 50ms Fast-Rules</td>
              </tr>
              <tr>
                <td>Lead Generation</td>
                <td>❌ Complex integrations required</td>
                <td className="lp-highlight-col">✓ Native Pre-Chat Qualification</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="lp-section lp-container">
        <div className="lp-section-header">
          <div className="lp-section-tag">TRANSPARENT PRICING</div>
          <h2 className="lp-section-title">Plans Built for Every Stage of Growth</h2>
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
            <div className="lp-pricing-header">
              <h3 className="lp-pricing-name">Starter Plan</h3>
              <p className="lp-pricing-target">Ideal for local businesses &amp; startups</p>
              <div className="lp-pricing-amount">
                <span className="lp-currency">₹</span>
                {billingCycle === 'monthly' ? '1,499' : '1,199'}
                <span className="lp-period">/month</span>
              </div>
            </div>

            <ul className="lp-pricing-features">
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> <strong>1,000 AI Text Responses</strong> / mo</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> <strong>100 Voice Interactions</strong></li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Basic Widget Customization</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Standard Knowledge Base</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Email Support</li>
            </ul>

            <Link to="/login" className="lp-btn lp-btn-secondary lp-btn-full">
              Get Started with Starter
            </Link>
          </div>

          {/* Growth Plan */}
          <div className="lp-pricing-card popular">
            <div className="lp-popular-badge">🔥 MOST POPULAR • 93% ROI</div>

            <div className="lp-pricing-header">
              <h3 className="lp-pricing-name">Growth Plan</h3>
              <p className="lp-pricing-target">Perfect for E-commerce &amp; Clinics</p>
              <div className="lp-pricing-amount">
                <span className="lp-currency">₹</span>
                {billingCycle === 'monthly' ? '3,499' : '2,799'}
                <span className="lp-period">/month</span>
              </div>
            </div>

            <ul className="lp-pricing-features">
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> <strong>3,000 AI Text Responses</strong> / mo</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> <strong>400 Voice Interactions</strong></li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Advanced Analytics &amp; Lead Sync</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> <strong>Remove Watermark</strong></li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Knowledge Gap Auto-Tracker</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Priority Chat &amp; Email Support</li>
            </ul>

            <Link to="/login" className="lp-btn lp-btn-primary lp-btn-full">
              Upgrade to Growth Plan
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="lp-pricing-card">
            <div className="lp-pricing-header">
              <h3 className="lp-pricing-name">Enterprise Plan</h3>
              <p className="lp-pricing-target">For high-traffic agencies &amp; platforms</p>
              <div className="lp-pricing-amount">
                <span className="lp-currency">₹</span>
                {billingCycle === 'monthly' ? '7,999' : '6,399'}
                <span className="lp-period">/month</span>
              </div>
            </div>

            <ul className="lp-pricing-features">
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> <strong>10,000 AI Text Responses</strong> / mo</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> <strong>1,500 Voice Interactions</strong></li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Custom API Integrations</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Dedicated Account Manager</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> 99.9% SLA &amp; Priority Support</li>
            </ul>

            <Link to="/login" className="lp-btn lp-btn-secondary lp-btn-full">
              Contact Sales
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
              From the House of <span className="lp-house-highlight">C O D E S H O R</span>
            </div>
          </div>

          <div className="lp-footer-links">
            <a href="#features">Features</a>
            <a href="#demo">Live Demo</a>
            <a href="#calculator">Calculator</a>
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
