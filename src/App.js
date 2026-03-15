import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
// Lenis removed — replaced with native CSS scroll-behavior for better performance
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// PWA Install Prompt Component
const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if it already fired and was captured globally
    if (window.deferredPWAInstallPrompt) {
      setDeferredPrompt(window.deferredPWAInstallPrompt);
      // Delay showing it for better UX
      setTimeout(() => setShowPrompt(true), 3000);
    }

    const handler = (e) => {
      e.preventDefault();
      window.deferredPWAInstallPrompt = e;
      setDeferredPrompt(e);
      // Delay showing it
      setTimeout(() => setShowPrompt(true), 5000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User installed the PWA');
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => setShowPrompt(false);

  if (!showPrompt) return null;

  return (
    <div className={`install-prompt ${showPrompt ? 'is-visible' : ''}`}>
      <button className="close-prompt" onClick={handleDismiss} aria-label="Close">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div className="pwa-content">
        <div className="pwa-icon-wrapper">
          <div className="pwa-icon">
            <svg viewBox="0 0 100 100" width="40" height="40">
              <circle cx="50" cy="50" r="48" fill="var(--accent-cyan)" fillOpacity="0.1" stroke="var(--accent-cyan)" strokeWidth="2" />
              <path d="M50 30L30 70H70L50 30Z" fill="var(--text-primary)" />
            </svg>
          </div>
          <div className="pwa-badge">PRO</div>
        </div>
        <div className="pwa-text">
          <h3>Install App</h3>
          <p>Get a faster & seamless experience by adding <strong>Avinash</strong> to your home screen.</p>
        </div>
      </div>
      <div className="install-prompt-btns">
        <button className="install-btn confirm" onClick={handleInstall}>
          <span>Install Now</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14m-7-7l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Native CSS smooth scroll instead of Lenis RAF loop
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Security Layer - Prevent right-click, copy, drag, and print shortcuts
    const preventAction = (e) => e.preventDefault();
    const preventKeys = (e) => {
      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+P, Ctrl+C
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'S' || e.key === 'P' || e.key === 'C')) ||
        (e.metaKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.metaKey && (e.key === 'U' || e.key === 'S' || e.key === 'P' || e.key === 'C'))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', preventAction);
    document.addEventListener('copy', preventAction);
    document.addEventListener('dragstart', preventAction);
    document.addEventListener('keydown', preventKeys);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('contextmenu', preventAction);
      document.removeEventListener('copy', preventAction);
      document.removeEventListener('dragstart', preventAction);
      document.removeEventListener('keydown', preventKeys);
    };
  }, [loading]);

  useEffect(() => {
    let interval;
    if (progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.floor(Math.random() * 15) + 5;
          return next > 100 ? 100 : next;
        });
      }, 150);
    } else {
      setTimeout(() => setFadeOut(true), 400);
      setTimeout(() => setLoading(false), 1000);
    }
    return () => clearInterval(interval);
  }, [progress]);

  const loadingMessages = [
    "Forging Innovation",
    "Calibrating Aesthetics",
    "Optimizing Experience",
    "Pixel Perfection",
    "Ready to Launch"
  ];

  if (loading) {
    const messageIndex = Math.min(Math.floor((progress / 100) * loadingMessages.length), loadingMessages.length - 1);

    return (
      <div className={`loading-screen ${fadeOut ? 'curtain-exit' : ''}`}>
        {/* Entrance Curtains */}
        <div className="loader-curtain curtain-left"></div>
        <div className="loader-curtain curtain-right"></div>

        <div className="loading-content">
          <div className="logo-box">
            <svg className="premium-loader-svg" viewBox="0 0 100 100">
              <circle className="logo-ring" cx="50" cy="50" r="48" />
              <path className="logo-path logo-a" d="M50 15L15 75H35L50 49L65 75H85L50 15Z" fill="var(--text-primary)" />
              <path className="logo-path logo-v" d="M50 85L85 25H65L50 51L35 25H15L50 85Z" fill="var(--accent-cyan)" />
            </svg>
            <div className="logo-glow"></div>
          </div>

          <div className="loading-brand-wrap">
            <div className="loading-brand-glitch" data-text="AVINASH">AVINASH</div>
            <div className="loading-sub-text">Digital Visionary</div>
          </div>

          <div className="loading-info-box">
            <div className="loading-counter">
              <span className="big-num">{progress}</span>
              <span className="small-pct">%</span>
            </div>
            <div className="loading-status-msg">{loadingMessages[messageIndex]}</div>
            <div className="loading-bar-container">
              <div className="loading-bar-active" style={{ width: `${progress}%` }}></div>
              <div className="loading-bar-bg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <InstallPrompt />
    </ThemeProvider>
  );
}

export default App;
