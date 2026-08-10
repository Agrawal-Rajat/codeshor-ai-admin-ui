import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="lp-container lp-nav animate-fade-up" style={{ animationDelay: '0s' }}>
        <div className="lp-nav-logo">
          Codeshor <span className="lp-text-gradient">AI</span>
        </div>
        <div className="lp-nav-links">
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div>
          <Link to="/login" className="lp-btn lp-btn-secondary">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="lp-hero lp-container">
        <div className="lp-glow-1"></div>
        <div className="lp-glow-2"></div>
        
        <h1 className="lp-hero-title animate-fade-up" style={{ animationDelay: '0.1s' }}>
          The Intelligent Chatbot for <br />
          <span className="lp-text-gradient">Modern Businesses</span>
        </h1>
        
        <p className="lp-hero-subtitle animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Embed a powerful, AI-driven assistant into your website in minutes. 
          Provide real-time support, capture leads effortlessly, and scale your customer engagement with Codeshor AI.
        </p>

        <div className="lp-hero-cta-group animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/login" className="lp-btn lp-btn-primary">
            Start Your Free Trial
          </Link>
          <a href="#features" className="lp-btn lp-btn-secondary">
            Explore Features
          </a>
        </div>

        <div className="lp-hero-image-wrapper animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <img 
            src="/assets/hero-mockup.png" 
            alt="Codeshor AI Chatbot Interface" 
            className="lp-hero-image animate-float" 
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="lp-section lp-container">
        <div className="lp-section-header animate-fade-up">
          <h2 className="lp-section-title">Everything You Need to Scale</h2>
          <p className="lp-section-desc">
            Powerful features designed to automate support and drive conversions without writing a single line of complex code.
          </p>
        </div>

        <div className="lp-features-grid">
          <div className="lp-feature-card animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="lp-feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
            </div>
            <h3 className="lp-feature-title">Contextual AI</h3>
            <p className="lp-feature-desc">Our RAG-powered engine understands your business context deeply, providing accurate and conversational responses.</p>
          </div>
          
          <div className="lp-feature-card animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="lp-feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <h3 className="lp-feature-title">Seamless Embedding</h3>
            <p className="lp-feature-desc">Deploy the widget to any website simply by dropping in a single script tag. Works universally on any platform.</p>
          </div>

          <div className="lp-feature-card animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="lp-feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 className="lp-feature-title">Lead Generation</h3>
            <p className="lp-feature-desc">Automatically capture names and emails directly from the chat interface, sending them straight to your dashboard.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="lp-section lp-container">
        <div className="lp-section-header">
          <h2 className="lp-section-title">Trusted by Innovators</h2>
          <p className="lp-section-desc">See how modern teams are transforming their customer experience.</p>
        </div>

        <div className="lp-testimonials-grid">
          <div className="lp-testimonial-card">
            <p className="lp-testimonial-text">"Codeshor AI completely revolutionized how we handle support. The embedding was flawless, and the AI handles 80% of our queries automatically."</p>
            <div className="lp-testimonial-author">
              <div className="lp-testimonial-avatar"></div>
              <div>
                <div className="lp-testimonial-name">Sarah Jenkins</div>
                <div className="lp-testimonial-role">CTO at TechFlow</div>
              </div>
            </div>
          </div>

          <div className="lp-testimonial-card">
            <p className="lp-testimonial-text">"The lead generation feature alone paid for the service in our first week. Highly recommend for any agency looking to scale effortlessly."</p>
            <div className="lp-testimonial-author">
              <div className="lp-testimonial-avatar"></div>
              <div>
                <div className="lp-testimonial-name">Marcus Reed</div>
                <div className="lp-testimonial-role">Founder, Nexus Marketing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="lp-section lp-container">
        <div className="lp-section-header">
          <h2 className="lp-section-title">Simple, Transparent Pricing</h2>
          <p className="lp-section-desc">Start for free and scale as your business grows.</p>
        </div>

        <div className="lp-pricing-grid">
          {/* Starter */}
          <div className="lp-pricing-card">
            <h3 className="lp-pricing-name">Starter</h3>
            <div className="lp-pricing-price">$0<span>/mo</span></div>
            <ul className="lp-pricing-features">
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 1 Chatbot Widget</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Standard Knowledge Base</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 100 Messages / mo</li>
            </ul>
            <Link to="/login" className="lp-btn lp-btn-secondary">Get Started</Link>
          </div>

          {/* Pro */}
          <div className="lp-pricing-card popular">
            <div className="lp-pricing-badge">Most Popular</div>
            <h3 className="lp-pricing-name">Pro</h3>
            <div className="lp-pricing-price">$49<span>/mo</span></div>
            <ul className="lp-pricing-features">
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Unlimited Widgets</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom Branding</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 5,000 Messages / mo</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Lead Capture Sync</li>
            </ul>
            <Link to="/login" className="lp-btn lp-btn-primary">Upgrade to Pro</Link>
          </div>

          {/* Enterprise */}
          <div className="lp-pricing-card">
            <h3 className="lp-pricing-name">Enterprise</h3>
            <div className="lp-pricing-price">$199<span>/mo</span></div>
            <ul className="lp-pricing-features">
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Everything in Pro</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Dedicated Support</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Unlimited Messages</li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom RAG Tuning</li>
            </ul>
            <Link to="/login" className="lp-btn lp-btn-secondary">Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lp-cta-section">
        <div className="lp-container">
          <h2 className="lp-section-title">Ready to Upgrade Your Website?</h2>
          <p className="lp-section-desc" style={{ marginBottom: '40px' }}>Join thousands of companies using Codeshor AI today.</p>
          <Link to="/login" className="lp-btn lp-btn-primary">
            Start Free Trial Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer lp-container">
        <p>&copy; {new Date().getFullYear()} Codeshor AI. All rights reserved.</p>
      </footer>
    </>
  );
};

export default LandingPage;
