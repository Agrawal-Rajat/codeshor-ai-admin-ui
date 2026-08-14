import React, { useState, useEffect, useRef } from 'react';
import characterImg from '../assets/codeshor-ai.png';
import chatbotLogo from '../assets/chatbot_logo.png';
import '../styles/landing.css';

// Landing page section components
import Nav from '../components/landing/Nav';
import Hero from '../components/landing/Hero';
import Onboarding from '../components/landing/Onboarding';
import Features from '../components/landing/Features';
import Calculator from '../components/landing/Calculator';
import Compare from '../components/landing/Compare';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

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

      // Track progress of onboarding section (only on desktop viewports)
      if (onboardingRef.current && window.innerWidth > 1024) {
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

      <Nav
        scrolled={scrolled}
        isNavHidden={isNavHidden}
        chatbotLogo={chatbotLogo}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection={activeSection}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      <Hero characterImg={characterImg} />

      <Onboarding
        onboardingRef={onboardingRef}
        onboardingProgress={onboardingProgress}
        onboardingStep={onboardingStep}
        setOnboardingStep={setOnboardingStep}
        chatbotLogo={chatbotLogo}
      />

      <Features activeFeatureNode={activeFeatureNode} chatbotLogo={chatbotLogo} />

      <Calculator
        monthlyQueries={monthlyQueries}
        setMonthlyQueries={setMonthlyQueries}
        hoursSavedPerMonth={hoursSavedPerMonth}
        estimatedMoneySaved={estimatedMoneySaved}
      />

      <Compare
        activeCompareIndex={activeCompareIndex}
        compareGridRef={compareGridRef}
        chatbotLogo={chatbotLogo}
      />

      <Pricing
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
        chatbotLogo={chatbotLogo}
      />

      <FAQ
        faqs={faqs}
        openFaq={openFaq}
        toggleFaq={toggleFaq}
        faqLogoPos={faqLogoPos}
        faqHeaderRef={faqHeaderRef}
        faqTitleWordRef={faqTitleWordRef}
        faqAccordionRef={faqAccordionRef}
        chatbotLogo={chatbotLogo}
      />

      <CTA />

      <Footer chatbotLogo={chatbotLogo} />
    </div>
  );
};

export default LandingPage;
