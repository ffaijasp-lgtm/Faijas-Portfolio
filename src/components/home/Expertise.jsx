import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../../js/data/site';
import { Megaphone, Target, Wand2, Palette, Globe } from 'lucide-react';
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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.expertise-card', 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="expertise" 
      ref={sectionRef}
      className="py-24 sm:py-32 border-t border-zinc-800 bg-black relative"
      aria-labelledby="expertise-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-bold block">
            CORE DISCIPLINES &bull; SERVICES
          </span>
          <h2 id="expertise-heading" className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter font-display leading-tight">
            WHAT I DO
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            Bridging structured digital marketing execution with generative AI content production for high-converting social campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {siteConfig.skills.map((skillGroup, index) => {
            const Icon = iconMap[skillGroup.category] || Megaphone;
            
            // Grid layout: first 3 cards take 2 columns each (3 x 2 = 6 on md/lg),
            // bottom 2 cards take 3 columns each (2 x 3 = 6 on md/lg)
            const colSpanClass = index < 3 ? 'md:col-span-3 lg:col-span-2' : 'md:col-span-3 lg:col-span-3';

            return (
              <div 
                key={index}
                className={`expertise-card p-7 bg-zinc-950 border border-zinc-800 hover:border-[#FFDE00] transition-all duration-300 flex flex-col justify-between group ${colSpanClass}`}
              >
                <div>
                  <div className="w-12 h-12 bg-black border border-zinc-800 text-[#FFDE00] flex items-center justify-center mb-6 group-hover:bg-[#FFDE00] group-hover:text-black transition-colors">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <h3 className="text-xl font-black text-white uppercase tracking-tight font-display mb-3">
                    {skillGroup.category}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-sans">
                    {skillGroup.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-900">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-3 font-bold">
                    DELIVERABLES / SKILLS
                  </h4>
                  <ul className={`font-sans ${index >= 3 ? 'grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3' : 'space-y-2'}`}>
                    {skillGroup.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                        <span className="w-1.5 h-1.5 bg-[#FFDE00] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
