import React, { useEffect, useRef } from 'react';
import './Demo.css';

const Demo = ({ videoUrl, chatbotLogo }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.playbackRate = 2.0;
            videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      });
    }, { threshold: 0.3 });

    if (videoRef.current) {
      observer.observe(videoRef.current);
      videoRef.current.playbackRate = 2.0;
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoUrl]);

  return (
    <section id="demo" className="lp-section lp-demo-section">
      <div className="lp-demo-ambient-glow"></div>
      
      <div className="lp-container">
        <div className="lp-section-header">
          <div className="lp-section-tag">SEE IT IN ACTION</div>
          <h2 className="lp-section-title">
            <span className="hero-text-dim">Experience The</span> <span className="hero-text-bright">Power</span> <span className="hero-text-dim">Of AI</span>
          </h2>
          <p className="lp-section-desc">Watch how our AI assistant effortlessly handles customer queries in real-time.</p>
        </div>

        <div className="lp-demo-showcase-wrapper">
          {/* Floating AI Orbs */}
          <div className="lp-demo-floating-orb left-orb">
            <img src={chatbotLogo} alt="Codeshor AI Orb" />
          </div>
          <div className="lp-demo-floating-orb right-orb">
            <img src={chatbotLogo} alt="Codeshor AI Orb" />
          </div>

          {/* Futuristic Phone Device Frame */}
          <div className="lp-demo-phone-frame">
            {/* Side buttons for high tech realism */}
            <div className="lp-demo-phone-button lp-demo-phone-button-left-1"></div>
            <div className="lp-demo-phone-button lp-demo-phone-button-left-2"></div>
            <div className="lp-demo-phone-button lp-demo-phone-button-right"></div>
            
            <div className="lp-demo-phone-screen">
              {/* Dynamic Island */}
              <div className="lp-demo-phone-dynamic-island">
                <div className="lp-demo-phone-camera"></div>
              </div>
              
              {videoUrl ? (
                <video 
                  ref={videoRef}
                  className="lp-demo-video"
                  src={videoUrl}
                  loop
                  muted
                  playsInline
                />
              ) : (
                <div className="lp-demo-placeholder">
                  <div className="lp-demo-placeholder-icon">▶</div>
                  <p>Your Demo Video Here</p>
                </div>
              )}
              
              {/* Bottom Home Indicator */}
              <div className="lp-demo-phone-home-indicator"></div>
              
              {/* Screen reflection highlight */}
              <div className="lp-demo-phone-reflection"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
