import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Magnetic({ children }) {
    const ref = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile, { passive: true });
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const mouseMove = (e) => {
        if (isMobile || !ref.current) return;
        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current.getBoundingClientRect();
        
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        
        const moveX = x * 0.3;
        const moveY = y * 0.3;

        requestAnimationFrame(() => {
          if (ref.current) {
            ref.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
          }
        });
    };

    const mouseLeave = () => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(0, 0, 0)`;
        }
    };

    if (isMobile) {
      return <>{children}</>;
    }

    return (
        <div
            ref={ref}
            onMouseMove={mouseMove}
            onMouseLeave={mouseLeave}
            style={{ 
              display: 'inline-block',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform'
            }}
        >
            {children}
        </div>
    );
}
