import React, { useState, useMemo, useEffect } from 'react';
import { projects, projectCategories } from '../js/data/project';
import { siteConfig } from '../js/data/site';
import ProjectFilters from '../components/projects/ProjectFilters';
import ProjectGrid from '../components/projects/ProjectGrid';
import VideoModal from '../components/ui/VideoModal';
import DecryptedText from '../components/ui/DecryptedText';
import MagneticButton from '../components/ui/MagneticButton';
import { Sparkles, Layers, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    document.title = `Projects & Campaigns — ${siteConfig.name}`;
    
    let desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute('content', `Browse selected digital marketing campaigns, AI video concepts, generative brand art, and SEO architecture by ${siteConfig.name}.`);
    }

    window.scrollTo(0, 0);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `Projects & Portfolio — ${siteConfig.name}`,
      "description": `Collection of digital marketing, AI video, and creative campaigns by ${siteConfig.name}.`,
      "url": `${siteConfig.seo.siteUrl}/projects`,
      "creator": {
        "@type": "Person",
        "name": siteConfig.name
      }
    };

    let script = document.getElementById('json-ld-collection');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld-collection';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(structuredData);

    return () => {
      const el = document.getElementById('json-ld-collection');
      if (el) el.remove();
    };
  }, []);

  const projectCounts = useMemo(() => {
    const counts = { All: projects.length };
    projects.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <main id="main-content" className="pt-28 pb-36 min-h-screen bg-[#070707] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <MagneticButton strength={0.3}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-[#FFDE00] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>&larr; BACK TO OVERVIEW</span>
            </Link>
          </MagneticButton>
        </div>

        {/* Editorial Archive Header */}
        <header className="max-w-4xl space-y-4 mb-14 pb-8 border-b border-white/10">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#FFDE00] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <DecryptedText text="CATALOGUE ARCHIVE // ALL CASES" speed={30} />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter font-display leading-[0.95]">
            SELECTED WORKS &bull; <br />
            <span className="text-[#FFDE00]">AI CONCEPTS.</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans font-light max-w-2xl">
            An editorial showcase exploring short-form AI video generation, social ad creative direction, SEO structural audits, and digital marketing implementations.
          </p>

          <div className="flex items-center gap-3 text-xs text-zinc-400 pt-2 font-mono">
            <Layers className="w-4 h-4 text-[#FFDE00]" />
            <span>TOTAL WORKS CATALOGUED: {projects.length}</span>
            <span>&bull;</span>
            <span>SULTHAN BATHERY, WAYANAD</span>
          </div>
        </header>

        {/* Filter Navigation */}
        <div className="mb-12 pb-6 border-b border-white/[0.08]">
          <ProjectFilters
            categories={projectCategories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            projectCounts={projectCounts}
          />
        </div>

        {/* Interactive Grid */}
        <ProjectGrid projects={filteredProjects} onOpenVideo={setActiveVideo} />

      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </main>
  );
}
