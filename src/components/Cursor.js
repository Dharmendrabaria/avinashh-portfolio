import React, { useEffect, useRef } from 'react';

// Cursor — fully ref-based, zero React state updates, zero re-renders during movement
const Cursor = () => {
  const cursorRef = useRef(null);

  // Skip on touch devices at component level
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isTouch) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let rafId = null;
    let isHovered = false;

    const updatePosition = () => {
      const scale = isHovered ? 2.5 : 1;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(${scale})`;
      rafId = null;
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    // Use mouseover but update DOM directly — no React state = no re-render
    const onMouseOver = (e) => {
      const target = e.target;

      // Quick class/tag check before expensive .closest()
      const tag = target.tagName;
      const isNative = tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA';

      const isInteractive = isNative ||
        target.closest('.project-card') ||
        target.closest('.gallery-item') ||
        target.closest('.social-btn');

      const newHovered = !!isInteractive;

      if (newHovered !== isHovered) {
        isHovered = newHovered;
        cursor.classList.toggle('cursor-hover', isHovered);
      }

      // Handle hidden
      const shouldHide = target.closest('.modal-close') || 
        target.closest('.lightbox-close') || 
        target.closest('.lightbox-nav');
      cursor.style.opacity = shouldHide ? '0' : '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []); // Empty deps — runs once only, no re-registrations

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="cursor-dot"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
        transition: 'opacity 0.2s ease, border-color 0.2s ease, background 0.2s ease',
        opacity: 1,
      }}
    />
  );
};

export default Cursor;
