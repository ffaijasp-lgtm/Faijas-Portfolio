import React, { useRef, useEffect, useState } from 'react';
import { siteConfig } from '../../js/data/site';
import { Megaphone, Target, Wand2, Palette, Globe, ChevronDown, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  "Digital Marketing": Megaphone,
  "Paid Advertising": Target,
  "AI Content Creation": Wand2,
  "Design & Editing Tools": Palette,
  "Website Platform": Globe,
};

export default function Expertise() {
  const sectionRef = useRef(null);
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.capability-row',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="py-24 sm:py-36 border-t border-white/10 bg-[#070707] relative overflow-hidden"
      aria-labelledby="capabilities-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>(03 / DISCIPLINES &amp; SOLUTIONS)</span>
            </div>
            <h2
              id="capabilities-heading"
              className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter font-display leading-none"
            >
              CAPABILITIES &amp; <br />
              <span className="text-[#FFDE00]">SERVICES.</span>
            </h2>
          </div>

          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Bridging structured marketing execution with generative AI media production for measurable engagement and rapid creative output.
          </p>
        </div>

        {/* Editorial Capabilities List */}
        <div className="divide-y divide-white/[0.08] border-b border-white/[0.08]">
          {siteConfig.skills.map((skillGroup, idx) => {
            const Icon = iconMap[skillGroup.category] || Megaphone;
            const num = String(idx + 1).padStart(2, '0');
            const isOpen = activeItem === idx;

            return (
              <div
                key={idx}
                className="capability-row group py-8 sm:py-12 transition-all duration-300 cursor-pointer"
                onClick={() => setActiveItem(isOpen ? -1 : idx)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left: Index & Category Name */}
                  <div className="flex items-start sm:items-center gap-6 sm:gap-10 w-full lg:w-1/2">
                    <span className="text-xs font-mono font-bold text-zinc-500 group-hover:text-[#FFDE00] transition-colors mt-1 sm:mt-0">
                      [{num}]
                    </span>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-none bg-zinc-900 border border-white/10 text-[#FFDE00] flex items-center justify-center shrink-0 group-hover:bg-[#FFDE00] group-hover:text-black transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase font-display tracking-tight group-hover:text-[#FFDE00] group-hover:translate-x-2 transition-all duration-300">
                        {skillGroup.category}
                      </h3>
                    </div>
                  </div>

                  {/* Right: Summary Description & Toggle */}
                  <div className="w-full lg:w-1/2 flex items-center justify-between gap-6 pl-16 sm:pl-20 lg:pl-0">
                    <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-md">
                      {skillGroup.description}
                    </p>

                    <button
                      type="button"
                      aria-label={`Toggle ${skillGroup.category} details`}
                      className={`w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-zinc-400 group-hover:border-[#FFDE00] group-hover:text-[#FFDE00] transition-all shrink-0 ${
                        isOpen ? 'rotate-180 bg-[#FFDE00] text-black border-transparent' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* Expandable Deliverables Drawer */}
                {isOpen && (
                  <div className="mt-8 pt-6 border-t border-dashed border-white/10 pl-16 sm:pl-20 lg:pl-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-300">
                    {skillGroup.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="p-3.5 bg-zinc-950 border border-white/10 flex items-center gap-2.5 text-xs text-zinc-200 font-mono font-medium"
                      >
                        <span className="w-1.5 h-1.5 bg-[#FFDE00] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
