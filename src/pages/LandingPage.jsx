import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import characterImg from '../assets/codeshor-ai.png';
import chatbotLogo from '../assets/chatbot_logo.png';
import '../styles/landing.css';

const LandingPage = () => {
  const [theme, setTheme] = useState('dark');
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroTab, setHeroTab] = useState('chat');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [monthlyQueries, setMonthlyQueries] = useState(2500);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollFillRef = useRef(null);
  const onboardingRef = useRef(null);
  const [onboardingProgress, setOnboardingProgress] = useState(0);
  const [activeFeatureNode, setActiveFeatureNode] = useState(-1);
  const orbitStartRef = useRef(Date.now());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const sectionIds = ['home', 'how-easy', 'features', 'demo', 'calculator', 'pricing', 'faq'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
      
      if (currentScrollY > 100) {
        if (currentScrollY < lastScrollY.current) {
          // Scrolling UP -> Hide navbar (per user request)
          setIsNavHidden(true);
        } else if (currentScrollY > lastScrollY.current) {
          // Scrolling DOWN -> Show navbar
          setIsNavHidden(false);
        }
      } else {
        setIsNavHidden(false);
      }
      
      lastScrollY.current = currentScrollY;

      // Calculate scroll progress percentage directly on DOM for smoothness
      if (scrollFillRef.current) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const progress = (currentScrollY / totalHeight) * 100;
          scrollFillRef.current.style.height = `${progress}%`;
        }
      }

      // Track progress of onboarding section
      if (onboardingRef.current) {
        const rect = onboardingRef.current.getBoundingClientRect();
        const scrollableDist = rect.height - window.innerHeight;
        if (scrollableDist > 0) {
          const progress = Math.max(0, Math.min(1, -rect.top / scrollableDist));
          setOnboardingProgress(progress);
          
          let step = 1;
          if (progress > 0.66) {
            step = 3;
          } else if (progress > 0.33) {
            step = 2;
          }
          setOnboardingStep(step);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track orbit angle to sync gradient border glow with logo position
  useEffect(() => {
    const ORBIT_DURATION = 28000; // 28s matches CSS animation
    // Node angles: 0=0°, 1=60°, 2=120°, 3=180°, 4=240°, 5=300°
    const NODE_ANGLES = [0, 60, 120, 180, 240, 300];
    const TOLERANCE = 22; // degrees window where node is "active"
    let rafId;
    const tick = () => {
      const elapsed = (Date.now() - orbitStartRef.current) % ORBIT_DURATION;
      const currentAngle = (elapsed / ORBIT_DURATION) * 360;
      let active = -1;
      for (let i = 0; i < NODE_ANGLES.length; i++) {
        let diff = Math.abs(currentAngle - NODE_ANGLES[i]);
        if (diff > 180) diff = 360 - diff;
        if (diff <= TOLERANCE) { active = i; break; }
      }
      setActiveFeatureNode(prev => prev !== active ? active : prev);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
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
      a: "Yes! Works universally on WordPress, Shopify, Webflow, Wix, React, Next.js, or plain HTML with zero technical setup required."
    },
    {
      q: "How fast can I get started?",
      a: "You can set up your business profile, customize your widget colors, and activate your AI chatbot on your website in under 2 minutes."
    }
  ];

  return (
    <div className="lp-root">
      {/* Scroll Progress Bar */}
      <div className="lp-scroll-progress-container">
        <div className="lp-scroll-progress-fill" ref={scrollFillRef} style={{ height: '0%' }}>
          <div className="lp-scroll-progress-logo">
            <img src={chatbotLogo} alt="Codeshor AI" />
          </div>
        </div>
      </div>

      {/* Grid Pattern Backdrop */}
      <div className="lp-grid-pattern"></div>

      {/* Ambient Glows */}
      <div className="lp-ambient-glow lp-ambient-1"></div>
      <div className="lp-ambient-glow lp-ambient-2"></div>

      {/* Luxury Top House Banner */}
      <div className="lp-top-banner">
        <div className="lp-house-badge-container">
          <span className="lp-house-prefix">From the house of</span>
          <div className="lp-magnify-brand">
            <span style={{ fontSize: '16px', fontWeight: 400, color: '#a1a1aa' }}>C</span>
            <span style={{ fontSize: '17px', fontWeight: 500, color: '#d4d4d8' }}>O</span>
            <span style={{ fontSize: '18px', fontWeight: 600, color: '#e4e4e7' }}>D</span>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#fafafa' }}>E</span>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#fafafa' }}>S</span>
            <span style={{ fontSize: '18px', fontWeight: 600, color: '#e4e4e7' }}>H</span>
            <span style={{ fontSize: '17px', fontWeight: 500, color: '#d4d4d8' }}>O</span>
            <span style={{ fontSize: '16px', fontWeight: 400, color: '#a1a1aa' }}>R</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`lp-nav ${scrolled ? 'lp-nav-scrolled' : ''} ${isNavHidden ? 'lp-nav-hidden' : ''}`}>
        <div className="lp-nav-logo">
          <img src={chatbotLogo} alt="Codeshor Logo" className="lp-logo-icon" />
          <span className="lp-logo-text">Codeshor</span>
          <span className="lp-logo-badge">AI</span>
        </div>

        <div className={`lp-nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#how-easy" className={activeSection === 'how-easy' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>How Easy It Is</a>
          <a href="#features" className={activeSection === 'features' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#demo" className={activeSection === 'demo' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Live Demo</a>
          <a href="#calculator" className={activeSection === 'calculator' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>ROI Calculator</a>
          <a href="#pricing" className={activeSection === 'pricing' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#faq" className={activeSection === 'faq' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <Link to="/login" className="lp-mobile-cta lp-btn lp-btn-primary" onClick={() => setMobileMenuOpen(false)}>Start Free Trial</Link>
        </div>

        {/* Mobile Overlay */}
        <div className={`lp-mobile-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>

        <div className="lp-nav-actions">
          <button className="lp-theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
          <Link to="/login" className="lp-btn lp-btn-secondary lp-hide-mobile">
            Sign In
          </Link>
          <Link to="/login" className="lp-btn lp-btn-primary lp-hide-mobile">
            Start Free Trial
          </Link>

          <button 
            className={`lp-mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`} 
            aria-label="Toggle Navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="lp-hamburger-bar top-bar"></span>
            <span className="lp-hamburger-bar middle-bar"></span>
            <span className="lp-hamburger-bar bottom-bar"></span>
          </button>
        </div>
      </nav>

      {/* New Hero Section */}
      <header 
        id="home"
        className="new-hero-section"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
        }}
      >
        <div className="new-hero-interactive-bg"></div>
        <div className="new-hero-content">
          
          {/* Mobile-Only Combined Hero Content (Hidden on Desktop) */}
          <div className="hero-mobile-content">
            <h2 className="hero-mobile-title">
              CODESHOR <span className="hero-mobile-badge">AI</span>
            </h2>
            <p className="hero-mobile-desc">
              Never leave a customer on read again. Your AI chatbot handles every enquiry instantly, 24/7.
            </p>
            <div className="hero-mobile-actions">
              <Link to="/login" className="lp-btn lp-btn-primary">Get Started</Link>
              <Link to="/features" className="lp-btn lp-btn-secondary">View Demo</Link>
            </div>
          </div>

          {/* Left Block */}
          <div className="hero-side-block hero-left-block">
            <div className="hero-side-inner">
              <div className="hero-large-letter red-letter" data-text="A">
                A<span className="hero-letter-dot red-dot"></span>
                <span className="hero-letter-label">Artificial</span>
              </div>
              <h2 className="hero-side-title">
                <span className="hero-text-dim">Never leave a</span><br/>
                <span className="hero-text-bright">customer</span><br/>
                <span className="hero-text-dim">on read again.</span>
              </h2>
              <p className="hero-side-desc">
                An AI chatbot on your website that knows everything about your business and responds to every visitor instantly, 24/7.
              </p>
              <Link to="/login" className="lp-btn lp-btn-primary">Get Started</Link>
            </div>
          </div>

          {/* Center Block */}
          <div className="hero-center-block">
            <div className="hero-character-wrapper">
              <h1 className="hero-center-text">CODESHOR</h1>
              <img src={characterImg} alt="Codeshor AI Character" className="hero-character-img" />
            </div>
          </div>

          {/* Right Block */}
          <div className="hero-side-block hero-right-block">
            <div className="hero-side-inner">
              <div className="hero-large-letter blue-letter" data-text="I">
                I<span className="hero-letter-dot blue-dot"></span>
                <span className="hero-letter-label">Intelligence</span>
              </div>
              <h2 className="hero-side-title">
                <span className="hero-text-dim">Every missed</span><br/>
                <span className="hero-text-bright">query</span><br/>
                <span className="hero-text-dim">answered.</span>
              </h2>
              <p className="hero-side-desc">
                Our AI handles every enquiry with voice and text, turning missed questions into truly qualified leads seamlessly.
              </p>
              <Link to="/features" className="lp-btn lp-btn-secondary">View Demo</Link>
            </div>
          </div>

        </div>

        <div className="hero-chatbot-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        </div>
      </header>

      {/* IMPRESSIVE COMPONENT: "How Easy It Is" 3-Step Onboarding Walkthrough */}
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
            <a href="#how-easy">How Easy It Is</a>
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
