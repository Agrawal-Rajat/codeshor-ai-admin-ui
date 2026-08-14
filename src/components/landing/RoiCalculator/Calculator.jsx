import React from 'react';

const Calculator = ({ monthlyQueries, setMonthlyQueries, hoursSavedPerMonth, estimatedMoneySaved }) => {
  const intensity = (monthlyQueries - 500) / 14500;

  return (
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
            <div className="lp-roi-gullak-container" style={{ '--gullak-intensity': intensity }}>
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
                <circle cx="100" cy="100" r="85" stroke={`rgba(${Math.round(74 + intensity * 0)}, ${Math.round(180 + intensity * 60)}, ${Math.round(100 + intensity * 20)}, 0.15)`} strokeWidth="2" strokeDasharray="6 4" className="lp-roi-gullak-ring"/>
                <ellipse cx="100" cy="108" rx="58" ry="52" 
                  fill={`rgba(${Math.round(30 - intensity * 15)}, ${Math.round(120 + intensity * 80)}, ${Math.round(70 + intensity * 30)}, 0.2)`}
                  stroke={`rgb(${Math.round(74 + intensity * 0)}, ${Math.round(180 + intensity * 60)}, ${Math.round(100 + intensity * 20)})`}
                  strokeWidth="2"
                />
                <rect x="82" y="56" width="36" height="6" rx="3" 
                  fill={`rgb(${Math.round(74)}, ${Math.round(180 + intensity * 60)}, ${Math.round(100 + intensity * 20)})`}
                  opacity="0.8"
                />
                <circle cx="100" cy="110" r="28" 
                  fill={`rgba(${Math.round(30)}, ${Math.round(140 + intensity * 80)}, ${Math.round(80 + intensity * 30)}, 0.15)`}
                  stroke={`rgba(${Math.round(74)}, ${Math.round(200 + intensity * 40)}, ${Math.round(120)}, 0.4)`}
                  strokeWidth="1"
                />
                <text x="100" y="118" textAnchor="middle" fontSize="28" fontWeight="800" 
                  fill={`rgb(${Math.round(100 + intensity * 50)}, ${Math.round(220 + intensity * 35)}, ${Math.round(140 + intensity * 30)})`}
                >₹</text>
                <ellipse cx="72" cy="158" rx="10" ry="6"
                  fill={`rgba(${Math.round(74)}, ${Math.round(180 + intensity * 60)}, ${Math.round(100)}, 0.3)`}
                />
                <ellipse cx="128" cy="158" rx="10" ry="6"
                  fill={`rgba(${Math.round(74)}, ${Math.round(180 + intensity * 60)}, ${Math.round(100)}, 0.3)`}
                />
                <rect 
                  x="52" 
                  y={160 - intensity * 90} 
                  width="96" 
                  height={intensity * 90}
                  rx="4"
                  fill={`rgba(${Math.round(50)}, ${Math.round(180 + intensity * 60)}, ${Math.round(100 + intensity * 20)}, 0.12)`}
                  style={{ transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
              </svg>

              {/* Plus money badges floating */}
              <div className="lp-roi-money-badge" style={{
                color: `rgb(${Math.round(100 + intensity * 55)}, ${Math.round(230 + intensity * 25)}, ${Math.round(150 + intensity * 20)})`
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
                    width: `${intensity * 100}%`,
                    background: `linear-gradient(90deg, 
                      hsl(${140 + intensity * 20}, 60%, 45%), 
                      hsl(${140 + intensity * 20}, 75%, ${35 + intensity * 15}%))`
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
                    '--slider-progress': `${intensity * 100}%`
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
  );
};

export default Calculator;
