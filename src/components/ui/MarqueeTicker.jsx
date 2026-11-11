import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MarqueeTicker({ items, speed = 25, reverse = false, className = "" }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const defaultItems = [
    "AI VIDEO DIRECTION",
    "PERFORMANCE MARKETING",
    "GENERATIVE VISUALS",
    "SEARCH ENGINE OPTIMIZATION",
    "CAPCUT & CANVA",
    "META & GOOGLE ADS",
    "CONVERSION COPYWRITING",
    "WORDPRESS ARCHITECTURE"
  ];

  const marqueeList = items || defaultItems;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !trackRef.current) return;

    const track = trackRef.current;
    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        xPercent: reverse ? 50 : -50,
        ease: 'none',
        duration: speed,
        repeat: -1,
      });

      // Pause marquee on hover for accessibility
      const onEnter = () => tween.pause();
      const onLeave = () => tween.play();

      const container = containerRef.current;
      if (container) {
        container.addEventListener('mouseenter', onEnter);
        container.addEventListener('mouseleave', onLeave);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [speed, reverse]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden select-none border-y border-white/10 bg-black/60 py-4 ${className}`}
      aria-label="Core competencies marquee"
    >
      <div ref={trackRef} className="flex whitespace-nowrap w-max gap-8 items-center">
        {/* Render twice for continuous loop */}
        {[...marqueeList, ...marqueeList, ...marqueeList].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-display font-extrabold text-xs sm:text-sm uppercase tracking-widest text-zinc-300 hover:text-[#FFDE00] transition-colors">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFDE00] inline-block shrink-0 opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}
