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
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt sooner
      setShowPrompt(true);
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
    <div className="install-prompt is-visible">
      <div className="pwa-icon">✨</div>
      <p><strong>Experience the Magic!</strong> Install this portfolio app for a faster & premium experience.</p>
      <div className="install-prompt-btns">
        <button className="install-btn dismiss" onClick={handleDismiss}>Not now</button>
        <button className="install-btn confirm" onClick={handleInstall}>Install Now</button>
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
    return () => {
      document.body.style.overflow = '';
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
