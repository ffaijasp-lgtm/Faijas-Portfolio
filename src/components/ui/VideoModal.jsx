import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow || 'auto';
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div 
        className="relative w-full max-w-5xl bg-zinc-950 border-2 border-[#FFDE00] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-black border-b border-zinc-800 text-xs font-mono gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 bg-red-500 animate-pulse shrink-0" />
            <span id="video-modal-title" className="text-white font-bold font-display uppercase tracking-wide truncate text-xs sm:text-sm">
              {video.title}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFDE00] text-black hover:bg-[#FFE838] transition-colors uppercase font-mono text-xs font-black shrink-0 shadow-md active:scale-95"
            aria-label="Close video player"
          >
            <span>CLOSE</span>
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          {video.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 p-8 text-center space-y-2">
              <span className="text-sm font-mono uppercase text-[#FFDE00]">NO DIRECT YOUTUBE STREAM ATTACHED</span>
              <p className="text-xs text-zinc-500 max-w-sm">Configure a youtubeId in src/js/data/product.js to stream directly.</p>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="px-2.5 py-0.5 bg-[#FFDE00] text-black font-display font-black text-[10px] uppercase mr-2">
              {video.category}
            </span>
            <span className="text-zinc-400 font-sans">{video.description}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 shrink-0">
            {video.tools?.map((tool, idx) => (
              <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-400 border border-zinc-800 uppercase">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
