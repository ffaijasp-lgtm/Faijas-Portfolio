import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../../js/data/site';
import { Briefcase, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-item', 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-24 sm:py-32 border-t border-zinc-800 bg-black relative"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FFDE00] font-bold block">
            CAREER &bull; CREDENTIALS
          </span>
          <h2 id="experience-heading" className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter font-display leading-tight">
            EXPERIENCE &amp; EDUCATION
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            Hands-on agency and independent experience developing digital marketing campaigns, AI content, and professional qualifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2.5 text-xs font-black text-white uppercase tracking-widest font-display mb-6">
              <Briefcase className="w-4 h-4 text-[#FFDE00]" />
              <span>WORK EXPERIENCE</span>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-zinc-800">
              {siteConfig.experience.map((item, idx) => (
                <div key={idx} className="timeline-item relative pl-10 space-y-3">
                  <div className="absolute left-2 top-1.5 w-3.5 h-3.5 bg-[#FFDE00] border-2 border-black -translate-x-1/2" />
                  
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-black text-white uppercase font-display tracking-tight">
                      {item.role}
                    </h3>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 bg-black text-[#FFDE00] border border-zinc-800">
                      {item.period}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-zinc-300 font-sans">
                    {item.company} <span className="text-zinc-500">• {item.location}</span>
                  </div>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="space-y-2 pt-2 text-xs sm:text-sm text-zinc-400 font-sans">
                      {item.highlights.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 bg-[#FFDE00] shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-2.5 text-xs font-black text-white uppercase tracking-widest font-display mb-6">
              <GraduationCap className="w-4 h-4 text-[#FFDE00]" />
              <span>EDUCATION &bull; CREDENTIALS</span>
            </div>

            <div className="space-y-4">
              {siteConfig.education.map((edu, idx) => (
                <div 
                  key={idx}
                  className="timeline-item p-6 bg-zinc-950 border border-zinc-800 hover:border-[#FFDE00] transition-all space-y-2"
                >
                  <span className="text-xs font-mono text-[#FFDE00] font-bold block">
                    {edu.year}
                  </span>
                  <h4 className="text-base font-black text-white uppercase font-display tracking-tight">
                    {edu.degree}
                  </h4>
                  <div className="text-xs text-zinc-400 flex items-center justify-between font-mono">
                    <span>{edu.institution}</span>
                    <span>{edu.location}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="timeline-item p-6 bg-zinc-950 border-2 border-[#FFDE00]/40 space-y-3">
              <div className="text-xs font-mono text-[#FFDE00] uppercase tracking-widest font-bold">
                PRACTICE HIGHLIGHTS
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Hands-on project work in Social Media Campaign Concepts, AI-Assisted Video Delivery with CapCut, and WordPress On-Page Search Optimization.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
