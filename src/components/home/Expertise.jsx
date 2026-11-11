import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../../js/data/site';
import { Megaphone, Target, Wand2, Palette, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';
import DecryptedText from '../ui/DecryptedText';
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

const badgeMap = {
  "Digital Marketing": "ORGANIC AUDIENCE GROWTH",
  "Paid Advertising": "DATA-DRIVEN PERFORMANCE",
  "AI Content Creation": "GENERATIVE AI PIPELINE",
  "Design & Editing Tools": "RAPID POST-PRODUCTION",
  "Website Platform": "TECHNICAL SEO ARCHITECTURE",
};

export default function Expertise() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.bento-item-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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
      className="py-24 sm:py-36 border-t border-white/10 bg-[#070707] text-white relative overflow-hidden"
      aria-labelledby="capabilities-heading"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-[#FFDE00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Centered Editorial Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-zinc-950 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <DecryptedText text="03 // CAPABILITIES & DISCIPLINES" speed={30} />
          </div>

          <h2
            id="capabilities-heading"
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95] font-display"
          >
            CORE DISCIPLINES &amp; <br />
            <span className="text-[#FFDE00]">SERVICES.</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-sans max-w-xl mx-auto font-light leading-relaxed">
            Bridging structured marketing execution with generative AI media production for measurable digital audience engagement and rapid turnaround.
          </p>
        </div>

        {/* 100% BALANCED BENTO SPOTLIGHT GRID (Zero Empty Space) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.skills.map((skillGroup, idx) => {
            const Icon = iconMap[skillGroup.category] || Megaphone;
            const badge = badgeMap[skillGroup.category] || "FEATURED DISCIPLINE";
            const num = String(idx + 1).padStart(2, '0');

            // Perfectly balanced grid:
            // Card 0: 2 cols, Card 1: 1 col (Row 1 = 3 cols)
            // Card 2: 1 col, Card 3: 2 cols (Row 2 = 3 cols)
            // Card 4: 3 cols (100% full width across Row 3, fitting perfectly!)
            let gridColClass = "col-span-1";
            if (idx === 0 || idx === 3) {
              gridColClass = "md:col-span-1 lg:col-span-2";
            } else if (idx === 4) {
              gridColClass = "col-span-full md:col-span-2 lg:col-span-3";
            }

            const isFullWidthCard = idx === 4;

            return (
              <div
                key={idx}
                className={`bento-item-reveal ${gridColClass} w-full`}
              >
                <SpotlightCard
                  spotlightColor="rgba(255, 222, 0, 0.16)"
                  borderColor="rgba(255, 222, 0, 0.5)"
                  className="h-full p-7 sm:p-9 border border-white/10 hover:border-[#FFDE00] transition-all duration-500 rounded-none hover:-translate-y-1.5 flex flex-col justify-between group shadow-2xl w-full"
                >
                  <div className={`space-y-6 ${isFullWidthCard ? 'lg:flex lg:items-start lg:justify-between lg:space-y-0 lg:gap-12' : ''}`}>
                    <div className={isFullWidthCard ? 'lg:max-w-xl space-y-5' : 'space-y-6'}>
                      {/* Top status & index */}
                      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                        <div className="flex items-center gap-2">
                          <span className="text-[#FFDE00] font-bold">[{num}]</span>
                          <span className="text-zinc-500">DISCIPLINE</span>
                        </div>
                        <span className="text-[#FFDE00] font-bold px-2 py-0.5 bg-black border border-white/10">
                          {badge}
                        </span>
                      </div>

                      {/* Icon and Title */}
                      <div className="flex items-start sm:items-center gap-4">
                        <div className="w-12 h-12 rounded-none bg-zinc-950 border border-white/10 text-[#FFDE00] flex items-center justify-center shrink-0 group-hover:bg-[#FFDE00] group-hover:text-black group-hover:border-[#FFDE00] transition-all duration-300 shadow-lg">
                          <Icon className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase font-display tracking-tight group-hover:text-[#FFDE00] transition-colors">
                            {skillGroup.category}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed font-light">
                        {skillGroup.description}
                      </p>
                    </div>

                    {/* Deliverables Chip Matrix */}
                    <div className={`${isFullWidthCard ? 'lg:pt-0 lg:mt-0 lg:border-t-0 lg:w-1/2' : 'pt-6 mt-6 border-t border-white/[0.08]'} space-y-3`}>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                        PROVEN DELIVERABLES
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((item, itemIdx) => (
                          <span
                            key={itemIdx}
                            className="px-3.5 py-1.5 bg-zinc-950 border border-white/10 text-zinc-300 text-[10px] sm:text-[11px] font-mono uppercase group-hover:border-[#FFDE00]/50 group-hover:text-white transition-all flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFDE00]" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
