import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('av-theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('av-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

// Custom hook for scroll-based fade-in
export const useFadeInOnScroll = () => {
  const ref = useRef(null);
  useEffect(() => {
    // Tighter margin for mobile so animation starts exactly when entering screen
    const IS_MOBILE = window.innerWidth <= 768;
    const margin = IS_MOBILE ? '10px 0px -10px 0px' : '150px 0px 150px 0px';
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: IS_MOBILE ? 0.05 : 0.02,
        rootMargin: margin
      }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, []);
  return ref;
};
