import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import MarqueeTicker from '../components/ui/MarqueeTicker';
import SelectedWorksStack from '../components/home/SelectedWorksStack';
import Expertise from '../components/home/Expertise';
import About from '../components/home/About';
import Experience from '../components/home/Experience';
import ContactSection from '../components/home/ContactSection';
import VideoModal from '../components/ui/VideoModal';
import { siteConfig } from '../js/data/site';

export default function Index() {
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    document.title = siteConfig.seo.defaultTitle;
    
    let desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute('content', siteConfig.seo.defaultDescription);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": siteConfig.name,
      "jobTitle": siteConfig.role,
      "description": siteConfig.summary,
      "url": siteConfig.seo.siteUrl,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Wayanad",
        "addressRegion": "Kerala",
        "addressCountry": "IN"
      },
      "email": siteConfig.email,
      "telephone": siteConfig.phone,
      "sameAs": [
        siteConfig.links.linkedin
      ],
      "knowsAbout": [
        "Digital Marketing",
        "AI Image Creation",
        "AI Video Creation",
        "Social Media Marketing",
        "Search Engine Optimization (SEO)",
        "Meta Ads",
        "Google Ads",
        "WordPress Content Architecture"
      ]
    };

    let script = document.getElementById('json-ld-person');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld-person';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(structuredData);
  }, []);

  return (
    <main id="main-content" className="relative bg-[#070707]">
      {/* 01: Hero Intro */}
      <Hero onOpenVideo={setActiveVideo} />

      {/* Kinetic Marquee Ticker */}
      <MarqueeTicker speed={30} />

      {/* 02: Selected Works Experience (Interactive Scroll Stacking) */}
      <SelectedWorksStack onOpenVideo={setActiveVideo} />

      {/* 03: Capabilities & Disciplines */}
      <Expertise />

      {/* Secondary Reverse Marquee */}
      <MarqueeTicker
        speed={35}
        reverse={true}
        items={[
          "CINEMATIC SHORT FORM",
          "KEYWORD TARGETING",
          "PROMPT ENGINEERING",
          "BRAND DIRECTION",
          "AUDIENCE TARGETING",
          "CREATIVE PROTOTYPING"
        ]}
      />

      {/* 04: Narrative & Creative Profile */}
      <About />

      {/* 05: Practical Journey & Education */}
      <Experience />

      {/* 06: Grand Closing CTA */}
      <ContactSection />

      {/* Video Stream Player Modal */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </main>
  );
}
