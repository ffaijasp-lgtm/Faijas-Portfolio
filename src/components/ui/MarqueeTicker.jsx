import React from 'react';

/**
 * MarqueeTicker - 100% Seamless Infinite Looping Marquee
 * Built to never end, never stutter, and smoothly loop infinitely.
 */
export default function MarqueeTicker({ items, speed = 28, reverse = false, className = "" }) {
  const defaultItems = [
    "AI VIDEO PRODUCTION",
    "PERFORMANCE MARKETING",
    "GENERATIVE VISUALS",
    "SEARCH ENGINE OPTIMIZATION",
    "CAPCUT & CANVA",
    "META & GOOGLE ADS",
    "CONVERSION COPYWRITING",
    "WORDPRESS ARCHITECTURE"
  ];

  const marqueeList = items || defaultItems;

  return (
    <div
      className={`relative w-full overflow-hidden select-none border-y border-white/10 bg-black/80 py-4 ${className}`}
      aria-label="Core competencies ticker"
    >
      <div
        className={`flex w-max ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } hover:[animation-play-state:paused]`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-8 pr-8">
          {marqueeList.map((text, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-8">
              <span className="font-display font-extrabold text-xs sm:text-sm uppercase tracking-widest text-zinc-300 hover:text-[#FFDE00] transition-colors whitespace-nowrap">
                {text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFDE00] inline-block shrink-0 shadow-[0_0_8px_#FFDE00]" />
            </div>
          ))}
        </div>

        {/* Track 2 (Exact duplicate for 100% seamless infinite loop) */}
        <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
          {marqueeList.map((text, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-8">
              <span className="font-display font-extrabold text-xs sm:text-sm uppercase tracking-widest text-zinc-300 hover:text-[#FFDE00] transition-colors whitespace-nowrap">
                {text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFDE00] inline-block shrink-0 shadow-[0_0_8px_#FFDE00]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
