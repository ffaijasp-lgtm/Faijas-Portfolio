import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers and no reduced-motion preference
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    setIsVisible(true);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    // Direct tracking for center dot
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Smooth trailing ring
      gsap.to(ring, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.25,
        ease: 'power3.out',
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], .cursor-pointer');
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor');
        if (text) {
          setCursorText(text);
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Center pinpoint */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FFDE00] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 hidden md:block ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Outer interactive ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 hidden md:flex ${
          isHovered
            ? 'w-16 h-16 rounded-full bg-[#FFDE00] text-black font-display font-black text-[9px] uppercase tracking-wider scale-100 shadow-xl'
            : 'w-8 h-8 rounded-full border border-white/40 scale-75'
        }`}
      >
        {isHovered && cursorText && (
          <span className="leading-none text-center select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
