import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * ElectricCodeshorText
 * 
 * An ultra-smooth, responsive canvas component featuring:
 * 1. Neon bluish glowing typography ("CODESHOR AI") built from a reactive particle pixel matrix.
 * 2. High-voltage electric shockwaves and ambient electricity crawling around the component.
 * 3. Fast crackling lightning bolts branching towards cursor on hover / touch.
 * 4. Dynamic pixel dislocation physics (electromagnetic repulsion & jitter disorder) near cursor.
 * 5. Elastic spring-back recovery when cursor leaves or moves away.
 * 6. Responsive scaling from mobile (320px) to ultra-wide 4K screens with Retina DPR support.
 */
const ElectricCodeshorText = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const isHoveringRef = useRef(false);
  const mouseRef = useRef({ x: -1000, y: -1000, prevX: -1000, prevY: -1000, speed: 0 });
  const [isElectrified, setIsElectrified] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let lightningBolts = [];
    let sparks = [];
    let borderSparks = [];
    let ambientArcTimer = 0;
    let frameCount = 0;

    // Detect theme (dark or light)
    const isLightTheme = () => document.documentElement.getAttribute('data-theme') === 'light';

    // Color palettes
    const getNeonColors = () => {
      if (isLightTheme()) {
        return {
          primary: '#0284c7',
          secondary: '#2563eb',
          accent: '#00f3ff',
          hot: '#1e1b4b',
          glow: 'rgba(2, 132, 199, 0.4)',
          borderGlow: 'rgba(37, 99, 235, 0.35)',
          lightningCore: '#ffffff',
          lightningGlow: '#0284c7'
        };
      }
      return {
        primary: '#00f3ff',
        secondary: '#38bdf8',
        accent: '#60a5fa',
        hot: '#ffffff',
        glow: 'rgba(0, 243, 255, 0.6)',
        borderGlow: 'rgba(0, 243, 255, 0.4)',
        lightningCore: '#ffffff',
        lightningGlow: '#00f3ff'
      };
    };

    // Calculate font size & sample text particles
    const initParticles = () => {
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      // Canvas height proportional to font size + room for dislocated particles
      const isMobile = width < 640;
      const baseHeight = isMobile ? Math.max(140, width * 0.36) : Math.max(180, width * 0.22);
      height = Math.floor(baseHeight);

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Offscreen canvas for typography rasterization
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      const text = 'CODESHOR AI';
      
      // Determine optimal font size so "CODESHOR AI" fits comfortably on one line
      let fontSize = width * (isMobile ? 0.13 : 0.115);
      fontSize = Math.max(26, Math.min(160, fontSize));

      offCtx.font = `900 ${fontSize}px "Space Grotesk", "Clash Display", -apple-system, BlinkMacSystemFont, sans-serif`;
      let textWidth = offCtx.measureText(text).width;
      const targetWidth = width * (isMobile ? 0.94 : 0.88);

      if (textWidth > targetWidth) {
        fontSize = fontSize * (targetWidth / textWidth);
        offCtx.font = `900 ${fontSize}px "Space Grotesk", "Clash Display", -apple-system, BlinkMacSystemFont, sans-serif`;
        textWidth = offCtx.measureText(text).width;
      }

      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillStyle = '#ffffff';
      offCtx.fillText(text, width / 2, height / 2);

      const imgData = offCtx.getImageData(0, 0, width, height).data;

      // Density step based on screen width for 60fps performance
      const step = isMobile ? 5 : width < 1024 ? 4 : 3;
      const newParticles = [];
      const colors = isLightTheme() 
        ? ['#0284c7', '#0369a1', '#2563eb', '#0ea5e9']
        : ['#00f3ff', '#38bdf8', '#00e5ff', '#67e8f9', '#60a5fa', '#93c5fd'];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          const alpha = imgData[idx + 3];
          if (alpha > 120) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            newParticles.push({
              homeX: x,
              homeY: y,
              x: x,
              y: y,
              vx: 0,
              vy: 0,
              size: step * (isMobile ? 0.75 : 0.82),
              color: color,
              baseAlpha: 0.75 + Math.random() * 0.25,
              phase: Math.random() * Math.PI * 2,
              pulseSpeed: 0.03 + Math.random() * 0.04,
              dislocated: 0 // 0 to 1 intensity
            });
          }
        }
      }

      particles = newParticles;
      lightningBolts = [];
      sparks = [];
    };

    initParticles();

    // Listen for font load completion to guarantee crisp Space Grotesk rendering
    if (document.fonts) {
      document.fonts.ready.then(() => {
        initParticles();
      });
    }

    // Resize observer
    const ro = new ResizeObserver(() => {
      initParticles();
    });
    ro.observe(container);

    // Theme mutation observer (for instant light/dark palette adaptation)
    const themeObserver = new MutationObserver(() => {
      initParticles();
    });
    themeObserver.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });

    // Fast branching fractal lightning generator
    const createLightningBolt = (x1, y1, x2, y2, maxDisplace = 24, branchProb = 0.35) => {
      const segments = [];
      
      const generateBranch = (sx, sy, ex, ey, displace, depth) => {
        if (depth > 4) {
          segments.push({ x1: sx, y1: sy, x2: ex, y2: ey });
          return;
        }
        const dx = ex - sx;
        const dy = ey - sy;
        const len = Math.hypot(dx, dy);
        if (len < 12) {
          segments.push({ x1: sx, y1: sy, x2: ex, y2: ey });
          return;
        }

        const midX = (sx + ex) / 2;
        const midY = (sy + ey) / 2;
        const normX = -dy / len;
        const normY = dx / len;
        const offset = (Math.random() - 0.5) * displace;
        const cx = midX + normX * offset;
        const cy = midY + normY * offset;

        generateBranch(sx, sy, cx, cy, displace * 0.6, depth + 1);
        generateBranch(cx, cy, ex, ey, displace * 0.6, depth + 1);

        // Branching fork
        if (Math.random() < branchProb && depth < 2) {
          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.1;
          const branchLen = len * (0.35 + Math.random() * 0.45);
          const bx = cx + Math.cos(angle) * branchLen;
          const by = cy + Math.sin(angle) * branchLen;
          generateBranch(cx, cy, bx, by, displace * 0.45, depth + 2);
        }
      };

      generateBranch(x1, y1, x2, y2, maxDisplace, 0);

      return {
        segments,
        alpha: 1.0,
        decay: 0.18 + Math.random() * 0.12,
        width: 1.2 + Math.random() * 1.0
      };
    };

    // Spawn sparks at lightning contact points
    const addSparks = (x, y, count = 4) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4.5;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1 + Math.random() * 2,
          alpha: 1.0,
          decay: 0.04 + Math.random() * 0.05
        });
      }
    };

    // Border shocks running along the frame
    const updateBorderShocks = () => {
      // Occasionally spawn border sparks
      if (Math.random() < 0.2) {
        const side = Math.floor(Math.random() * 4);
        let bx = 0, by = 0, bvx = 0, bvy = 0;
        const spd = 3 + Math.random() * 4;
        if (side === 0) { // top
          bx = Math.random() * width;
          by = 0;
          bvx = (Math.random() > 0.5 ? 1 : -1) * spd;
        } else if (side === 1) { // right
          bx = width;
          by = Math.random() * height;
          bvy = (Math.random() > 0.5 ? 1 : -1) * spd;
        } else if (side === 2) { // bottom
          bx = Math.random() * width;
          by = height;
          bvx = (Math.random() > 0.5 ? 1 : -1) * spd;
        } else { // left
          bx = 0;
          by = Math.random() * height;
          bvy = (Math.random() > 0.5 ? 1 : -1) * spd;
        }
        borderSparks.push({
          x: bx,
          y: by,
          vx: bvx,
          vy: bvy,
          life: 20 + Math.random() * 25,
          maxLife: 45
        });
      }

      // Update border sparks
      for (let i = borderSparks.length - 1; i >= 0; i--) {
        const bs = borderSparks[i];
        bs.x += bs.vx;
        bs.y += bs.vy;
        bs.life--;
        if (bs.life <= 0 || bs.x < 0 || bs.x > width || bs.y < 0 || bs.y > height) {
          borderSparks.splice(i, 1);
        }
      }
    };

    // Main animation loop
    const render = () => {
      frameCount++;
      const colors = getNeonColors();

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isHover = isHoveringRef.current;
      const repelRadius = Math.max(75, Math.min(160, width * 0.13));
      const spring = 0.085;
      const friction = 0.83;

      let nearestDislocated = [];

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isHover) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < repelRadius * repelRadius) {
            const dist = Math.sqrt(distSq);
            const norm = 1 - dist / repelRadius;
            const force = Math.pow(norm, 1.4) * 16;
            const angle = Math.atan2(dy, dx);

            // Chaotic electric turbulence / disorder
            const jitterX = (Math.random() - 0.5) * force * 1.8;
            const jitterY = (Math.random() - 0.5) * force * 1.8;

            p.vx += Math.cos(angle) * force + jitterX;
            p.vy += Math.sin(angle) * force + jitterY;
            p.dislocated = Math.min(1.0, p.dislocated + 0.35);

            if (nearestDislocated.length < 8 && Math.random() < 0.25) {
              nearestDislocated.push(p);
            }
          }
        }

        // Spring force pulling back to home position
        const homeDx = p.homeX - p.x;
        const homeDy = p.homeY - p.y;
        const distFromHome = Math.hypot(homeDx, homeDy);

        p.vx += homeDx * spring;
        p.vy += homeDy * spring;
        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        // Dislocation decay
        if (distFromHome < 2) {
          p.dislocated = Math.max(0, p.dislocated - 0.05);
          if (distFromHome < 0.2 && Math.abs(p.vx) < 0.05 && Math.abs(p.vy) < 0.05) {
            p.x = p.homeX;
            p.y = p.homeY;
            p.vx = 0;
            p.vy = 0;
          }
        } else {
          p.dislocated = Math.min(1.0, distFromHome / 30);
        }

        // Draw particle
        const isDisplaced = p.dislocated > 0.15;
        const alpha = isDisplaced 
          ? 1.0 
          : p.baseAlpha * (0.8 + 0.2 * Math.sin(frameCount * p.pulseSpeed + p.phase));

        ctx.fillStyle = isDisplaced ? colors.hot : p.color;
        ctx.globalAlpha = alpha;

        // Render crisp neon pixel
        const renderSize = p.size * (isDisplaced ? 1.25 : 1.0);
        ctx.fillRect(
          p.x - renderSize / 2, 
          p.y - renderSize / 2, 
          renderSize, 
          renderSize
        );
      }

      // Fast lightning near cursor when hovered
      if (isHover) {
        // Generate fast crackling lightning bolts (2 to 4 per frame)
        const boltCount = Math.floor(2 + Math.random() * 3);
        for (let b = 0; b < boltCount; b++) {
          if (nearestDislocated.length > 0) {
            const target = nearestDislocated[Math.floor(Math.random() * nearestDislocated.length)];
            lightningBolts.push(createLightningBolt(mx, my, target.x, target.y, 22, 0.45));
            if (Math.random() < 0.3) addSparks(target.x, target.y, 3);

            // Inter-particle plasma lightning between dislocated pixels
            if (nearestDislocated.length >= 2 && Math.random() < 0.45) {
              const pA = nearestDislocated[Math.floor(Math.random() * nearestDislocated.length)];
              const pB = nearestDislocated[Math.floor(Math.random() * nearestDislocated.length)];
              if (pA !== pB) {
                lightningBolts.push(createLightningBolt(pA.x, pA.y, pB.x, pB.y, 14, 0.3));
              }
            }
          } else {
            // Crackle to a random point within hover radius
            const randAngle = Math.random() * Math.PI * 2;
            const randDist = (0.3 + Math.random() * 0.7) * repelRadius;
            const tx = mx + Math.cos(randAngle) * randDist;
            const ty = my + Math.sin(randAngle) * randDist;
            lightningBolts.push(createLightningBolt(mx, my, tx, ty, 18, 0.3));
          }
        }
      }

      // Ambient periodic electricity / shock near text & around container
      ambientArcTimer++;
      if (ambientArcTimer > (isHover ? 15 : 45)) {
        ambientArcTimer = 0;
        if (particles.length > 0) {
          // Arc between two random particles or from edge to particle
          const p1 = particles[Math.floor(Math.random() * particles.length)];
          const fromEdge = Math.random() < 0.45;
          const startX = fromEdge ? (Math.random() > 0.5 ? 0 : width) : p1.x + (Math.random() - 0.5) * 60;
          const startY = fromEdge ? (Math.random() > 0.5 ? 0 : height) : p1.y + (Math.random() - 0.5) * 30;
          lightningBolts.push(createLightningBolt(startX, startY, p1.x, p1.y, 28, 0.4));
          addSparks(p1.x, p1.y, 2);
        }
      }

      // Render lightning bolts with brilliant neon aura
      ctx.save();
      ctx.shadowColor = colors.lightningGlow;
      ctx.shadowBlur = 12;
      for (let i = lightningBolts.length - 1; i >= 0; i--) {
        const bolt = lightningBolts[i];
        
        // Outer glow
        ctx.beginPath();
        for (let s = 0; s < bolt.segments.length; s++) {
          const seg = bolt.segments[s];
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        }
        ctx.strokeStyle = colors.lightningGlow;
        ctx.lineWidth = bolt.width * 3.2;
        ctx.globalAlpha = bolt.alpha * 0.6;
        ctx.stroke();

        // Hot white core
        ctx.beginPath();
        for (let s = 0; s < bolt.segments.length; s++) {
          const seg = bolt.segments[s];
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        }
        ctx.strokeStyle = colors.lightningCore;
        ctx.lineWidth = bolt.width;
        ctx.globalAlpha = bolt.alpha;
        ctx.stroke();

        bolt.alpha -= bolt.decay;
        if (bolt.alpha <= 0) {
          lightningBolts.splice(i, 1);
        }
      }
      ctx.restore();

      // Render sparks
      ctx.save();
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.94;
        sp.vy *= 0.94;
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0) {
          sparks.splice(i, 1);
        } else {
          ctx.fillStyle = colors.lightningCore;
          ctx.globalAlpha = sp.alpha;
          ctx.fillRect(sp.x, sp.y, sp.size, sp.size);
        }
      }
      ctx.restore();

      // Update and render border shocks
      updateBorderShocks();
      ctx.save();
      for (let i = 0; i < borderSparks.length; i++) {
        const bs = borderSparks[i];
        const lifeRatio = bs.life / bs.maxLife;
        ctx.fillStyle = colors.accent;
        ctx.globalAlpha = lifeRatio;
        ctx.fillRect(bs.x - 1.5, bs.y - 1.5, 3, 3);
        // Small discharge tail
        ctx.strokeStyle = colors.lightningGlow;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(bs.x, bs.y);
        ctx.lineTo(bs.x - bs.vx * 2, bs.y - bs.vy * 2);
        ctx.stroke();
      }
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    // Mouse & Touch listeners
    const handlePointerMove = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      mouseRef.current.speed = Math.hypot(x - mouseRef.current.x, y - mouseRef.current.y);
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      isHoveringRef.current = true;
      setIsElectrified(true);
    };

    const handlePointerLeave = () => {
      isHoveringRef.current = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      setIsElectrified(false);
    };

    const onMouseMove = (e) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onMouseEnter = (e) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      handlePointerLeave();
    };

    const onTouchStart = (e) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      handlePointerLeave();
    };

    const containerEl = containerRef.current;
    containerEl.addEventListener('mousemove', onMouseMove, { passive: true });
    containerEl.addEventListener('mouseenter', onMouseEnter, { passive: true });
    containerEl.addEventListener('mouseleave', onMouseLeave, { passive: true });
    containerEl.addEventListener('touchstart', onTouchStart, { passive: true });
    containerEl.addEventListener('touchmove', onTouchMove, { passive: true });
    containerEl.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      themeObserver.disconnect();
      containerEl.removeEventListener('mousemove', onMouseMove);
      containerEl.removeEventListener('mouseenter', onMouseEnter);
      containerEl.removeEventListener('mouseleave', onMouseLeave);
      containerEl.removeEventListener('touchstart', onTouchStart);
      containerEl.removeEventListener('touchmove', onTouchMove);
      containerEl.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`lp-electric-footer-wrapper ${isElectrified ? 'is-electrified' : ''}`}
      aria-label="CODESHOR AI Interactive Neon Electric Display"
    >
      {/* Background High-Voltage Ambient Atmosphere */}
      <div className="lp-electric-ambient-glow" />
      <div className="lp-electric-grid-lines" />
      
      {/* High-Voltage Cyber Conduit Framing */}
      <div className="lp-electric-frame-corner lp-corner-tl">
        <span className="lp-corner-pin" />
      </div>
      <div className="lp-electric-frame-corner lp-corner-tr">
        <span className="lp-corner-pin" />
      </div>
      <div className="lp-electric-frame-corner lp-corner-bl">
        <span className="lp-corner-pin" />
      </div>
      <div className="lp-electric-frame-corner lp-corner-br">
        <span className="lp-corner-pin" />
      </div>

      {/* Interactive Electric Canvas */}
      <canvas 
        ref={canvasRef} 
        className="lp-electric-canvas"
        role="img"
        aria-label="CODESHOR AI"
      />

      {/* Electric Shock Border Tracer */}
      <div className="lp-electric-border-tracer" />
    </div>
  );
};

export default ElectricCodeshorText;
