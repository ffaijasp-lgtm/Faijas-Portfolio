import React, { useRef, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Layers } from 'lucide-react';
import gsap from 'gsap';

export default function ProjectGrid({ projects, onOpenVideo }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.project-item', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [projects]);

  if (projects.length === 0) {
    return (
      <div className="py-20 text-center bg-zinc-950 border border-zinc-800 p-8 space-y-4">
        <div className="w-12 h-12 bg-black text-zinc-500 mx-auto flex items-center justify-center border border-zinc-800">
          <Layers className="w-6 h-6" />
        </div>
        <h3 className="text-base font-black text-white uppercase font-display">No projects found in this category</h3>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto font-sans">
          Select another category filter to explore more marketing and AI visual campaigns.
        </p>
      </div>
    );
  }

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onOpenVideo={onOpenVideo} />
      ))}
    </div>
  );
}
