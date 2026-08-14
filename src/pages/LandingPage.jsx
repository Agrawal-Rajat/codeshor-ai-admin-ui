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
  const [faqLogoPos, setFaqLogoPos] = useState({ top: 0, left: 0, isClosed: true });
  const faqHeaderRef = useRef(null);
  const faqTitleWordRef = useRef(null);
  const faqAccordionRef = useRef(null);

  useEffect(() => {
    const updateFaqLogo = () => {
      if (openFaq === null) {
        if (faqTitleWordRef.current && faqHeaderRef.current) {
          const wordEl = faqTitleWordRef.current;
          const headerEl = faqHeaderRef.current;
          setFaqLogoPos({
            top: headerEl.offsetTop + wordEl.offsetTop + wordEl.offsetHeight / 2,
            left: headerEl.offsetLeft + wordEl.offsetLeft + wordEl.offsetWidth + 35,
            isClosed: true
          });
        }
      } else {
        if (faqAccordionRef.current && faqAccordionRef.current.children[openFaq]) {
          const activeCard = faqAccordionRef.current.children[openFaq];
          const accordionContainer = faqAccordionRef.current;
          setFaqLogoPos({
            top: accordionContainer.offsetTop + activeCard.offsetTop + 32,
            left: activeCard.offsetLeft + activeCard.offsetWidth + 35,
            isClosed: false
          });
        }
      }
    };

    updateFaqLogo();
    const timer = setTimeout(updateFaqLogo, 100);
    const timer2 = setTimeout(updateFaqLogo, 350);

    window.addEventListener('resize', updateFaqLogo);
    window.addEventListener('scroll', updateFaqLogo, { passive: true });
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      window.removeEventListener('resize', updateFaqLogo);
      window.removeEventListener('scroll', updateFaqLogo);
    };
  }, [openFaq]);

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
          
          // Disable scroll-controlled step switching on mobile so the step buttons can be clicked
          if (window.innerWidth > 1024) {
            let step = 1;
            if (progress > 0.66) {
              step = 3;
            } else if (progress > 0.33) {
              step = 2;
            }
            setOnboardingStep(step);
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [activeCompareIndex, setActiveCompareIndex] = useState(-1);
  const compareGridRef = useRef(null);

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

  // Comparison section indicator animation (slowly bottom-to-top and top-to-bottom)
  useEffect(() => {
    const CYCLE_DURATION = 14000; // 14 seconds total cycle
    let rafId;
    const tick = () => {
      const elapsed = Date.now() % CYCLE_DURATION;
      const progress = elapsed / CYCLE_DURATION;
      // Triangle wave to go 0 -> 1 -> 0
      const position = progress < 0.5 ? progress * 2 : (1 - progress) * 2;
      
      if (compareGridRef.current) {
        compareGridRef.current.style.setProperty('--compare-logo-pos', `${position}`);
      }

      // Map position [0, 1] to index [0, 4]
      // 5 sections: 0 to 0.2, 0.2 to 0.4, 0.4 to 0.6, 0.6 to 0.8, 0.8 to 1.0
      const index = Math.floor(position * 5);
      setActiveCompareIndex(index >= 5 ? 4 : index);
      
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
      <section id="calculator" className="lp-section lp-roi-section">
        <div className="lp-roi-ambient-glow"></div>
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-tag">ESTIMATE SAVINGS</div>
            <h2 className="lp-section-title"><span className="hero-text-dim">See How Much</span> <span className="hero-text-bright">Time & Money</span> <span className="hero-text-dim">You Save</span></h2>
            <p className="lp-section-desc">Adjust your monthly query volume to estimate your team's savings with Codeshor AI.</p>
          </div>

          <div className="lp-roi-calculator-wrapper">
            {/* Left: Piggy Bank / Gullak Visualization */}
            <div className="lp-roi-gullak-panel">
              <div className="lp-roi-gullak-container" style={{
                '--gullak-intensity': ((monthlyQueries - 500) / 14500)
              }}>
                {/* Animated floating coins */}
                <div className="lp-roi-coins-container">
                  {Array.from({ length: Math.min(Math.floor(monthlyQueries / 1500) + 1, 8) }).map((_, i) => (
                    <div 
                      key={i} 
                      className="lp-roi-coin"
                      style={{
                        '--coin-delay': `${i * 0.4}s`,
                        '--coin-x': `${20 + (i * 12) % 60}%`,
                        opacity: 1
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                        <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">₹</text>
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Futuristic Gullak/Vault SVG */}
                <svg className="lp-roi-gullak-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Glow ring behind */}
                  <circle cx="100" cy="100" r="85" stroke={`rgba(${Math.round(74 + ((monthlyQueries - 500) / 14500) * 0)}, ${Math.round(180 + ((monthlyQueries - 500) / 14500) * 60)}, ${Math.round(100 + ((monthlyQueries - 500) / 14500) * 20)}, 0.15)`} strokeWidth="2" strokeDasharray="6 4" className="lp-roi-gullak-ring"/>
                  
                  {/* Main body - rounded vault/piggy */}
                  <ellipse cx="100" cy="108" rx="58" ry="52" 
                    fill={`rgba(${Math.round(30 - ((monthlyQueries - 500) / 14500) * 15)}, ${Math.round(120 + ((monthlyQueries - 500) / 14500) * 80)}, ${Math.round(70 + ((monthlyQueries - 500) / 14500) * 30)}, 0.2)`}
                    stroke={`rgb(${Math.round(74 + ((monthlyQueries - 500) / 14500) * 0)}, ${Math.round(180 + ((monthlyQueries - 500) / 14500) * 60)}, ${Math.round(100 + ((monthlyQueries - 500) / 14500) * 20)})`}
                    strokeWidth="2"
                  />
                  
                  {/* Coin slot on top */}
                  <rect x="82" y="56" width="36" height="6" rx="3" 
                    fill={`rgb(${Math.round(74)}, ${Math.round(180 + ((monthlyQueries - 500) / 14500) * 60)}, ${Math.round(100 + ((monthlyQueries - 500) / 14500) * 20)})`}
                    opacity="0.8"
                  />
                  
                  {/* Inner glow circle */}
                  <circle cx="100" cy="110" r="28" 
                    fill={`rgba(${Math.round(30)}, ${Math.round(140 + ((monthlyQueries - 500) / 14500) * 80)}, ${Math.round(80 + ((monthlyQueries - 500) / 14500) * 30)}, 0.15)`}
                    stroke={`rgba(${Math.round(74)}, ${Math.round(200 + ((monthlyQueries - 500) / 14500) * 40)}, ${Math.round(120)}, 0.4)`}
                    strokeWidth="1"
                  />
                  
                  {/* Rupee symbol in center */}
                  <text x="100" y="118" textAnchor="middle" fontSize="28" fontWeight="800" 
                    fill={`rgb(${Math.round(100 + ((monthlyQueries - 500) / 14500) * 50)}, ${Math.round(220 + ((monthlyQueries - 500) / 14500) * 35)}, ${Math.round(140 + ((monthlyQueries - 500) / 14500) * 30)})`}
                  >₹</text>
                  
                  {/* Legs */}
                  <ellipse cx="72" cy="158" rx="10" ry="6"
                    fill={`rgba(${Math.round(74)}, ${Math.round(180 + ((monthlyQueries - 500) / 14500) * 60)}, ${Math.round(100)}, 0.3)`}
                  />
                  <ellipse cx="128" cy="158" rx="10" ry="6"
                    fill={`rgba(${Math.round(74)}, ${Math.round(180 + ((monthlyQueries - 500) / 14500) * 60)}, ${Math.round(100)}, 0.3)`}
                  />
                  
                  {/* Savings fill level - animated bar inside piggy */}
                  <rect 
                    x="52" 
                    y={160 - ((monthlyQueries - 500) / 14500) * 90} 
                    width="96" 
                    height={((monthlyQueries - 500) / 14500) * 90}
                    rx="4"
                    fill={`rgba(${Math.round(50)}, ${Math.round(180 + ((monthlyQueries - 500) / 14500) * 60)}, ${Math.round(100 + ((monthlyQueries - 500) / 14500) * 20)}, 0.12)`}
                    style={{ transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                </svg>

                {/* Plus money badges floating */}
                <div className="lp-roi-money-badge" style={{
                  color: `rgb(${Math.round(100 + ((monthlyQueries - 500) / 14500) * 55)}, ${Math.round(230 + ((monthlyQueries - 500) / 14500) * 25)}, ${Math.round(150 + ((monthlyQueries - 500) / 14500) * 20)})`
                }}>
                  +₹{estimatedMoneySaved.toLocaleString()}
                </div>
              </div>

              {/* Savings meter bar */}
              <div className="lp-roi-meter">
                <div className="lp-roi-meter-label">Savings Intensity</div>
                <div className="lp-roi-meter-track">
                  <div 
                    className="lp-roi-meter-fill" 
                    style={{ 
                      width: `${((monthlyQueries - 500) / 14500) * 100}%`,
                      background: `linear-gradient(90deg, 
                        hsl(${140 + ((monthlyQueries - 500) / 14500) * 20}, 60%, 45%), 
                        hsl(${140 + ((monthlyQueries - 500) / 14500) * 20}, 75%, ${35 + ((monthlyQueries - 500) / 14500) * 15}%))`
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Right: Controls + Results */}
            <div className="lp-roi-controls-panel">
              {/* Slider section */}
              <div className="lp-roi-slider-card">
                <div className="lp-roi-slider-header">
                  <div className="lp-roi-slider-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div>
                    <label className="lp-roi-slider-title">Monthly Visitor Queries</label>
                    <p className="lp-roi-slider-sub">Chats handled by AI</p>
                  </div>
                </div>
                <div className="lp-roi-slider-value-display">
                  <span className="lp-roi-slider-number">{monthlyQueries.toLocaleString()}</span>
                  <span className="lp-roi-slider-unit">/ month</span>
                </div>
                <div className="lp-roi-slider-wrapper">
                  <input 
                    type="range" 
                    min="500" 
                    max="15000" 
                    step="500"
                    value={monthlyQueries}
                    onChange={(e) => setMonthlyQueries(Number(e.target.value))}
                    className="lp-roi-range-slider"
                    style={{
                      '--slider-progress': `${((monthlyQueries - 500) / 14500) * 100}%`
                    }}
                  />
                  <div className="lp-roi-slider-marks">
                    <span>500</span>
                    <span>5K</span>
                    <span>10K</span>
                    <span>15K</span>
                  </div>
                </div>
              </div>

              {/* Results cards */}
              <div className="lp-roi-results-grid">
                <div className="lp-roi-result-card">
                  <div className="lp-roi-result-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div className="lp-roi-result-data">
                    <div className="lp-roi-result-number">{hoursSavedPerMonth}<span className="lp-roi-result-suffix">hrs</span></div>
                    <div className="lp-roi-result-label">Support Hours Saved / mo</div>
                  </div>
                </div>

                <div className="lp-roi-result-card lp-roi-result-highlight">
                  <div className="lp-roi-result-icon highlight-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <div className="lp-roi-result-data">
                    <div className="lp-roi-result-number lp-roi-highlight-number">₹{estimatedMoneySaved.toLocaleString()}</div>
                    <div className="lp-roi-result-label">Estimated Monthly Savings</div>
                  </div>
                </div>
              </div>

              {/* Annual projection */}
              <div className="lp-roi-annual-card">
                <div className="lp-roi-annual-inner">
                  <div className="lp-roi-annual-left">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                      <polyline points="17 6 23 6 23 12"/>
                    </svg>
                    <span>Annual Projection</span>
                  </div>
                  <div className="lp-roi-annual-amount">₹{(estimatedMoneySaved * 12).toLocaleString()}<span>/yr</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix - Futuristic Redesign */}
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

      {/* Pricing Section - Futuristic Redesign */}
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

      {/* FAQ Section - Futuristic Redesign */}
      <section id="faq" className="lp-section lp-faq-section">
        <div className="lp-faq-ambient"></div>
        <div className="lp-container" style={{ position: 'relative' }}>
          <div className="lp-section-header" ref={faqHeaderRef}>
            <div className="lp-section-tag">GOT QUESTIONS?</div>
            <h2 className="lp-section-title"><span className="hero-text-dim">Frequently Asked</span> <span className="hero-text-bright" ref={faqTitleWordRef}>Questions</span></h2>
            <p className="lp-section-desc">Everything you need to know about setting up and scaling your custom AI assistant.</p>
          </div>

          {/* Dynamic FAQ Chatbot Logo Indicator */}
          <div 
            className={`lp-faq-moving-logo ${faqLogoPos.isClosed ? 'is-closed' : 'is-open'}`}
            style={{
              position: 'absolute',
              top: `${faqLogoPos.top}px`,
              left: `${faqLogoPos.left}px`,
              transform: 'translate(-50%, -50%)',
              transition: 'top 0.5s cubic-bezier(0.25, 1, 0.5, 1), left 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              zIndex: 10,
              width: '44px',
              height: '44px',
              background: 'var(--lp-card-bg)',
              borderRadius: '50%',
              border: '2px solid var(--lp-primary)',
              boxShadow: '0 0 20px rgba(225, 29, 72, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}
          >
            <img 
              src={chatbotLogo} 
              alt="Codeshor AI Moving Indicator" 
              style={{ width: '24px', height: '24px', objectFit: 'contain' }} 
            />
          </div>

          <div className="lp-faq-accordion" ref={faqAccordionRef}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`lp-faq-item ${isOpen ? 'open' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="lp-faq-question">
                    <span className="lp-faq-question-text">{faq.q}</span>
                    <span className="lp-faq-toggle-btn">
                      <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="lp-faq-chevron-icon"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </div>
                  <div className="lp-faq-answer-wrapper" style={{
                    maxHeight: isOpen ? '200px' : '0',
                    opacity: isOpen ? 1 : 0
                  }}>
                    <div className="lp-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Futuristic Redesign */}
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

      {/* Footer - Futuristic Redesign */}
      <footer className="lp-footer lp-container">
        <div className="lp-footer-content">
          <div className="lp-footer-brand">
            <div className="lp-nav-logo">
              <img src={chatbotLogo} alt="Codeshor Logo" className="lp-logo-icon" />
              <span className="lp-logo-text">Codeshor</span>
              <span className="lp-logo-badge">AI</span>
            </div>
            <p className="lp-footer-tagline">Crafting Next-Gen Autonomous AI Experiences.</p>
            <div className="lp-footer-house">
              From the House of <span className="lp-house-highlight">C O D E S H O R</span>
            </div>
          </div>

          <div className="lp-footer-links-grid">
            <div className="lp-footer-link-col">
              <h4>Site Links</h4>
              <a href="#home">Home</a>
              <a href="#how-easy">How Easy It Is</a>
              <a href="#features">Features</a>
              <a href="#demo">Live Demo</a>
              <a href="#calculator">Calculator</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="lp-footer-link-col">
              <h4>Required &amp; Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Settings</Link>
              <Link to="/support">Contact Support</Link>
              <Link to="/login">Sign In</Link>
            </div>
          </div>
        </div>

        {/* Giant CODESHOR AI Text Block */}
        <div className="lp-footer-giant-text-container">
          <div className="lp-footer-giant-text" data-text="CODESHOR AI">
            CODESHOR AI
          </div>
        </div>

        <div className="lp-footer-bottom">
          <p>&copy; {new Date().getFullYear()} Codeshor AI. All rights reserved.</p>
        </div>
      </footer>

      {/* Luxury Bottom House Banner (Exactly matches top banner) */}
      <div className="lp-top-banner lp-bottom-banner">
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
    </div>
  );
};

export default LandingPage;
