import React from 'react';

const FAQ = ({ faqs, openFaq, toggleFaq, faqLogoPos, faqHeaderRef, faqTitleWordRef, faqAccordionRef, chatbotLogo }) => {
  return (
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
                  maxHeight: isOpen ? '1000px' : '0',
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
  );
};

export default FAQ;
