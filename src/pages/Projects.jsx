import React, { useState, useMemo, useEffect } from 'react';
import { projects, projectCategories } from '../js/data/product';
import { siteConfig } from '../js/data/site';
import ProjectFilters from '../components/projects/ProjectFilters';
import ProjectGrid from '../components/projects/ProjectGrid';
import VideoModal from '../components/ui/VideoModal';
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
    <main id="main-content" className="pt-28 pb-32 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-[#FFDE00] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; BACK TO OVERVIEW</span>
          </Link>
        </div>

        <header className="max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-mono uppercase tracking-widest text-[#FFDE00] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ARCHIVE CATALOGUE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter font-display leading-tight">
            SELECTED WORKS &bull; <span className="text-[#FFDE00]">AI CONCEPTS</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
            An editorial archive exploring short-form AI video generation, social ad creative direction, SEO structural audits, and digital marketing implementations.
          </p>

          <div className="flex items-center gap-2 text-xs text-zinc-400 pt-2 font-mono">
            <Layers className="w-4 h-4 text-[#FFDE00]" />
            <span>TOTAL PROJECTS CATALOGUED: {projects.length}</span>
          </div>
        </header>

        <div className="mb-12 pb-6 border-b border-zinc-800">
          <ProjectFilters
            categories={projectCategories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            projectCounts={projectCounts}
          />
        </div>

        <ProjectGrid projects={filteredProjects} onOpenVideo={setActiveVideo} />

      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </main>
  );
}
