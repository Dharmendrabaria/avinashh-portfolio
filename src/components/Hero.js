import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMail, FiChevronDown } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { TypeAnimation } from 'react-type-animation';
import Magnetic from './Magnetic';
import { useFadeInOnScroll } from '../context/ThemeContext';
import './Hero.css';

const Hero = () => {
  const statsRef = useFadeInOnScroll();
  const rolesRef = useFadeInOnScroll();
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      {/* Background Enhancements */}
      {/* Interactive Cyberpunk Particles Background */}
      <div className="hero-bg">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false, zIndex: 0 },
            fpsLimit: 40,
            interactivity: {
              events: { onClick: { enable: false }, onHover: { enable: false }, resize: false },
            },
            particles: {
              color: { value: ["#06d6f7", "#6200ea"] },
              links: {
                color: "random",
                distance: 100,
                enable: true,
                opacity: 0.08,
                width: 1
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 0.6,
                straight: false
              },
              number: {
                density: { enable: false },
                value: 25
              },
              opacity: { value: 0.25 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 2 } },
            },
            detectRetina: false,
          }}
          className="interactive-particles"
        />
        <div className="hero-glow-orb purple-orb" style={{ opacity: 0.5 }}></div>
        <div className="hero-glow-orb cyan-orb" style={{ opacity: 0.5 }}></div>
      </div>

      <div className="hero-content">
        {/* Left side */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* === TOP BLOCK: tag + name + roles + stats === */}
          <div className="hero-top-block">
            <div className="hero-tag">
              <HiSparkles size={16} />
              <span>Creative Designer</span>
            </div>

            <div className="hero-greeting-wrap">
              <span className="hero-greeting-hand">Creative Designer</span>
            </div>

            <div className="hero-name-wrap">
              <h1 className="hero-name">
                Avi<span className="highlight">nash</span>
              </h1>
            </div>

            <div className="hero-roles reveal slide-up" ref={rolesRef}>
              <div className="role-badge">UI/UX Designer</div>
              <div className="role-dot"></div>
              <div className="role-badge">Brand Strategist</div>
              <div className="role-dot"></div>
              <div className="role-badge">Visual Artist</div>
            </div>

            <div className="hero-stats reveal slide-up" ref={statsRef}>
              <div className="hero-stat-card">
                <span className="stat-num">2+</span>
                <span className="stat-label">Years Exp.</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-num">200+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-num">U.G.</span>
                <span className="stat-label">Urban Gujarat</span>
              </div>
            </div>
          </div>

          {/* === MOBILE IMAGE SLOT === */}
          <div className="hero-mobile-image-slot">
            <div className="hero-image-container">
              <div className="hero-image-polygon">
                <img src="/avinash_profile.jpeg" alt="Avinash" className="hero-img-inner" loading="eager" decoding="async" />
              </div>
              <div className="hero-image-border"></div>
            </div>
          </div>

          {/* === BOTTOM BLOCK: quote + buttons === */}
          <div className="hero-bottom-block">
            <div className="hero-quote-wrap">
              <span className="hero-quote">
                <TypeAnimation
                  sequence={[
                    'Building digital experiences that matter.', 3000,
                    'Design is intelligence made visible.', 3000,
                    'Simplifying the complex through design.', 3000,
                    'Crafting pixel-perfect visual stories.', 3000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                />
              </span>
            </div>

            <div className="hero-btns">
              <button className="btn-primary" onClick={() => scrollTo('projects')}>
                View Projects <FiArrowRight size={18} />
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('contact')}>
                Contact Me <FiMail size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right side - profile image (DESKTOP only) */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-image-container">
            <div className="hero-image-polygon">
              <img src="/avinash_profile.jpeg" alt="Avinash" className="hero-img-inner" loading="eager" decoding="async" />
            </div>
            <div className="hero-image-border"></div>

            {/* Pills — now CSS animated, no framer-motion per-frame cost */}
            <div className="hero-pill pill-1">
              <div className="pill-color" style={{ background: 'var(--accent-purple)' }}></div>
              <span>UI/UX Master</span>
            </div>

            <div className="hero-pill pill-2">
              <div className="pill-color" style={{ background: 'var(--accent-cyan)' }}></div>
              <span>Figma Pro</span>
            </div>

            <div className="hero-pill pill-3">
              <div className="pill-color" style={{ background: 'var(--accent-pink)' }}></div>
              <span>Visual Design</span>
            </div>
          </div>
        </motion.div>
      </div>

      <button
        className="scroll-indicator scroll-bounce"
        onClick={() => scrollTo('about')}
      >
        <FiChevronDown size={28} />
      </button>
    </section>
  );
};

export default Hero;
