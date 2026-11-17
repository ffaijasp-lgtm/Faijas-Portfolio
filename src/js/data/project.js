import aiVideoConcept from '../../assets/images/ai-video-concept.webp';
import socialCampaign from '../../assets/images/social-campaign.webp';
import seoWordpress from '../../assets/images/seo-wordpress.webp';
import aiBrandArt from '../../assets/images/ai-brand-art.webp';
import paidAds from '../../assets/images/paid-ads.webp';
import xenMedia from '../../assets/images/xen-media.webp';

/**
 * Project data source.
 * 
 * Thumbnail support:
 * - Direct imported local image asset (e.g. `import myImage from '../../assets/images/...'`)
 * - Cloudinary or any external HTTPS image URL (e.g. `"https://res.cloudinary.com/demo/image/upload/sample.jpg"`)
 * 
 * Video support:
 * - youtubeId: YouTube Video ID string (plays automatically in maximum HD resolution in modal) or null
 */

export const projects = [
  {
    id: "proj-001",
    slug: "ai-assisted-video-creation",
    title: "AI-Assisted Short-Form Video Concepts",
    category: "Cinematic Video",
    description: "Short-form promotional video concepts created using AI-generated visual generation workflows, edited, paced, and finalized in CapCut for multi-platform delivery.",
    thumbnail: aiVideoConcept,
    previewVideo: null,
    youtubeId: "SH11-LZmZP0",
    year: "2026",
    featured: true,
    projectType: "Short Form",
    projectUrl: null,
  },
  {
    id: "proj-002",
    slug: "commercial-brand-campaign",
    title: "High-Impact Commercial Product Teasers",
    category: "Commercial",
    description: "Dynamic commercial video teasers and brand campaigns combining hyper-realistic AI generation with fast-paced cuts and rhythmic sound design.",
    thumbnail: socialCampaign,
    previewVideo: null,
    youtubeId: "nxIz0dBxjJY",
    year: "2026",
    featured: true,
    projectType: "Brand Commercial",
    projectUrl: null,
  },
  {
    id: "proj-003",
    slug: "animated-visual-narratives",
    title: "Stylized Animated Visual Narratives",
    category: "Animated",
    description: "Expressive animation and stylized character motion design blending generative AI frames with modern motion graphics and sound pacing.",
    thumbnail: seoWordpress,
    previewVideo: null,
    youtubeId: "9bZkp7q19f0",
    year: "2026",
    featured: true,
    projectType: "Motion Animation",
    projectUrl: null,
  },
  {
    id: "proj-004",
    slug: "cinematic-atmosphere-reels",
    title: "Cinematic Atmosphere & Visual Storytelling",
    category: "Cinematic Video",
    description: "Atmospheric visual concept reels featuring film noir lighting, depth of field styling, and cinematic framing driven by state-of-the-art AI video tools.",
    thumbnail: aiBrandArt,
    previewVideo: null,
    youtubeId: "fJ9rUzIMcZQ",
    year: "2026",
    featured: true,
    projectType: "Cinematic Reel",
    projectUrl: null,
  },
  {
    id: "proj-005",
    slug: "promotional-ad-creatives",
    title: "Performance Commercial Video Ads",
    category: "Commercial",
    description: "High-converting short-form video commercials engineered for viral retention, hook testing, and digital platform engagement.",
    thumbnail: paidAds,
    previewVideo: null,
    youtubeId: "JGwWNGJdvx8",
    year: "2026",
    featured: false,
    projectType: "Promotional Ad",
    projectUrl: null,
  },
  {
    id: "proj-006",
    slug: "animated-motion-workflows",
    title: "Experimental Animated Motion Concepts",
    category: "Animated",
    description: "Fluid character animations, surreal visual transitions, and generative kinetic sequences crafted for cutting-edge digital campaigns.",
    thumbnail: xenMedia,
    previewVideo: null,
    youtubeId: "OPf0YbXqDm0",
    year: "2026",
    featured: false,
    projectType: "Motion Graphics",
    projectUrl: null,
  }
];

export const projectCategories = [
  "All",
  "Cinematic Video",
  "Animated",
  "Commercial"
];
