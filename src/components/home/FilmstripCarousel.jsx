import React, { useState, useRef } from 'react';
import { filmstripVideos } from '../../js/data/filmstrip';
import { Film } from 'lucide-react';

export default function FilmstripCarousel({ onOpenVideo }) {
  const [isPaused, setIsPaused] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const containerRef = useRef(null);

  // Duplicate items for a continuous, seamless infinite loop
  const displayItems = [...filmstripVideos, ...filmstripVideos];

  const handleCardClick = (video) => {
    if (onOpenVideo) {
      onOpenVideo({
        title: video.title || `35mm Film Archive ${video.frameCode}`,
        category: "35mm Celluloid Archive",
        src: video.fullSrc || video.src,
        youtubeId: null,
        description: "Archival footage running on continuous 35mm film reel.",
      });
    }
  };

  const handleTouchCard = (videoId) => {
    if (activeVideoId === videoId) {
      // Second tap opens the video in expand modal
      const video = filmstripVideos.find(v => v.id === videoId);
      if (video) handleCardClick(video);
    } else {
      // First tap highlights in color and pauses the strip
      setActiveVideoId(videoId);
      setIsPaused(true);
    }
  };

  // 35mm Sprocket Holes Rail Generator
  const renderSprocketRow = (frameCode, isBottom = false) => (
    <div className={`h-7 sm:h-8 bg-[#0a0a0a] ${isBottom ? 'border-t' : 'border-b'} border-white/10 px-3 flex items-center justify-between select-none pointer-events-none`}>
      {/* Left Sprocket Cluster */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="w-2.5 h-1.5 sm:w-3 sm:h-2 rounded-[1.5px] bg-[#050505] border border-white/20 shadow-inner" />
        <span className="w-2.5 h-1.5 sm:w-3 sm:h-2 rounded-[1.5px] bg-[#050505] border border-white/20 shadow-inner" />
        <span className="w-2.5 h-1.5 sm:w-3 sm:h-2 rounded-[1.5px] bg-[#050505] border border-white/20 shadow-inner" />
        <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-zinc-500 uppercase ml-1.5 hidden xs:inline">
          {isBottom ? 'EASTMAN • 500T' : '35MM FILM'}
        </span>
      </div>

      {/* Center Film Calibration Notch */}
      <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
        <span className="text-[#FFDE00] font-bold">{frameCode}</span>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-400">{isBottom ? 'SAFETY FILM' : 'KODAK 5219'}</span>
      </div>

      {/* Right Sprocket Cluster */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="w-2.5 h-1.5 sm:w-3 sm:h-2 rounded-[1.5px] bg-[#050505] border border-white/20 shadow-inner" />
        <span className="w-2.5 h-1.5 sm:w-3 sm:h-2 rounded-[1.5px] bg-[#050505] border border-white/20 shadow-inner" />
        <span className="w-2.5 h-1.5 sm:w-3 sm:h-2 rounded-[1.5px] bg-[#050505] border border-white/20 shadow-inner" />
      </div>
    </div>
  );

  return (
    <div className="w-full relative py-4 sm:py-8 select-none overflow-hidden">
      {/* Filmstrip Header Status Line */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-3 sm:mb-4 flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <Film className="w-3.5 h-3.5 text-[#FFDE00]" />
          <span className="text-white font-bold">35MM CONTINUOUS FILM REEL</span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-[#FFDE00] hidden sm:inline">AUTOPLAY [B/W] • HOVER FOR COLOR</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-zinc-400">
          <span>8 FILM CELLS</span>
          <span>•</span>
          <span className="text-white">CLICK ANY CELL TO EXPAND ↗</span>
        </div>
      </div>

      {/* 100% Edge-to-Edge Viewport Container (Spans 100% of the entire screen) */}
      <div
        ref={containerRef}
        className="w-full relative overflow-hidden bg-[#050505] border-y border-white/10 py-3 sm:py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setActiveVideoId(null);
        }}
      >
        {/* Left Side Theatrical Smoke Fade Vignette */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 lg:w-56 z-30 bg-gradient-to-r from-[#070707] via-[#070707]/80 to-transparent flex items-center">
          <div className="w-24 sm:w-36 h-3/4 bg-[#FFDE00]/[0.03] rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Right Side Theatrical Smoke Fade Vignette */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 lg:w-56 z-30 bg-gradient-to-l from-[#070707] via-[#070707]/80 to-transparent flex items-center justify-end">
          <div className="w-24 sm:w-36 h-3/4 bg-[#FFDE00]/[0.03] rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Seamless Infinite Rolling Track */}
        <div
          className="flex gap-4 sm:gap-6 w-max will-change-transform"
          style={{
            animation: 'filmstrip-infinite 42s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {displayItems.map((video, index) => {
            const isHoveredOrActive = activeVideoId === video.id;

            return (
              <div
                key={`${video.id}-${index}`}
                onClick={() => handleCardClick(video)}
                onTouchStart={() => handleTouchCard(video.id)}
                data-cursor="expand"
                className="group relative flex-shrink-0 w-[280px] sm:w-[380px] md:w-[460px] lg:w-[500px] bg-black border border-white/10 hover:border-[#FFDE00] transition-all duration-500 shadow-2xl cursor-pointer"
              >
                {/* 1. Top 35mm Sprocket Perforations Rail */}
                {renderSprocketRow(video.frameCode, false)}

                {/* 2. Pure Cinema Video Frame (No buttons, no descriptions) */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <video
                    ref={(el) => {
                      if (el) {
                        el.defaultMuted = true;
                        el.muted = true;
                        const p = el.play();
                        if (p !== undefined) {
                          p.catch(() => {});
                        }
                      }
                    }}
                    src={video.src}
                    poster={video.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                      isHoveredOrActive
                        ? 'grayscale-0 contrast-100 brightness-105'
                        : 'grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-105'
                    }`}
                  />

                  {/* Top-Left Film Frame Code Stamp */}
                  <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
                    <span className="px-2 py-0.5 bg-black/80 border border-white/20 text-[#FFDE00] font-mono font-bold text-[9px] uppercase tracking-wider backdrop-blur-md">
                      {video.frameCode}
                    </span>
                  </div>

                  {/* Subtle Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                </div>

                {/* 3. Bottom 35mm Sprocket Perforations Rail */}
                {renderSprocketRow(video.frameCode, true)}
              </div>
            );
          })}
        </div>
      </div>

      {/* Inline Keyframes for 100% infinite filmstrip loop */}
      <style>{`
        @keyframes filmstrip-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
