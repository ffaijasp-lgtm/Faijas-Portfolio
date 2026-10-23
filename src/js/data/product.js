import aiVideoConcept from '../../assets/images/ai-video-concept.webp';
import socialCampaign from '../../assets/images/social-campaign.webp';
import seoWordpress from '../../assets/images/seo-wordpress.webp';
import aiBrandArt from '../../assets/images/ai-brand-art.webp';
import paidAds from '../../assets/images/paid-ads.webp';
import xenMedia from '../../assets/images/xen-media.webp';

/**
 * Product & Project data source.
 * Images are imported directly from src/assets/images.
 * To update videos, replace youtubeId with any YouTube Video ID or null.
 */

export const projects = [
  {
    id: "proj-001",
    slug: "ai-assisted-video-creation",
    title: "AI-Assisted Short-Form Video Concepts",
    category: "AI Video",
    description: "Short-form promotional video concepts created using AI-generated visual generation workflows, edited, paced, and finalized in CapCut for multi-platform social media delivery.",
    thumbnail: aiVideoConcept,
    previewVideo: null,
    youtubeId: "LXb3EKWsInQ",
    year: "2026",
    tools: ["AI Visuals", "CapCut", "Video Editing", "Prompt Direction"],
    featured: true,
    projectType: "Video Production",
    projectUrl: null,
  },
  {
    id: "proj-002",
    slug: "social-media-campaign-concepts",
    title: "Social Media Campaign & Ad Creative Direction",
    category: "Social Media",
    description: "Comprehensive content themes and creative direction developed for promotional product campaigns, complete with tailored ad copywriting designed to engage social media audiences.",
    thumbnail: socialCampaign,
    previewVideo: null,
    youtubeId: "kJQP7kiw5Fk",
    year: "2026",
    tools: ["Content Strategy", "Creative Direction", "Ad Copywriting", "Canva"],
    featured: true,
    projectType: "Campaign Strategy",
    projectUrl: null,
  },
  {
    id: "proj-003",
    slug: "wordpress-on-page-seo",
    title: "WordPress Architecture & On-Page SEO Optimization",
    category: "SEO & Web",
    description: "Structured website content with optimized headings, strategic keyword placement, and high-impact meta titles and descriptions to boost organic search visibility.",
    thumbnail: seoWordpress,
    previewVideo: null,
    youtubeId: "9bZkp7q19f0",
    year: "2026",
    tools: ["WordPress", "Keyword Research", "On-Page SEO", "Meta Tagging"],
    featured: true,
    projectType: "On-Page Optimization",
    projectUrl: null,
  },
  {
    id: "proj-004",
    slug: "ai-brand-imagery-generation",
    title: "AI-Generated Brand Imagery & Marketing Creatives",
    category: "AI Images",
    description: "Commercial-grade AI image creation for brand communications and digital campaigns, combined with Photoshop post-production and typography treatments.",
    thumbnail: aiBrandArt,
    previewVideo: null,
    youtubeId: "fJ9rUzIMcZQ",
    year: "2026",
    tools: ["AI Image Creation", "Adobe Photoshop", "Brand Communication"],
    featured: true,
    projectType: "Visual Design",
    projectUrl: null,
  },
  {
    id: "proj-005",
    slug: "meta-google-ads-creatives",
    title: "Meta & Google Ads Performance Creatives",
    category: "Digital Marketing",
    description: "High-conversion ad design and promotional copy testing for paid digital campaigns across Meta Ads and Google Ads ecosystems.",
    thumbnail: paidAds,
    previewVideo: null,
    youtubeId: "JGwWNGJdvx8",
    year: "2026",
    tools: ["Meta Ads", "Google Ads", "Photoshop", "Ad Copywriting"],
    featured: false,
    projectType: "Paid Advertising",
    projectUrl: null,
  },
  {
    id: "proj-006",
    slug: "xen-ai-media-promotional-assets",
    title: "Xen AI Media Promotional Brand Workflows",
    category: "Digital Marketing",
    description: "Hands-on promotional marketing execution, supporting SEO activities, creating AI-driven brand visuals, and managing social media publishing channels.",
    thumbnail: xenMedia,
    previewVideo: null,
    youtubeId: "OPf0YbXqDm0",
    year: "2026",
    tools: ["Canva", "CapCut", "SEO Support", "Social Media"],
    featured: false,
    projectType: "Agency Work",
    projectUrl: null,
  }
];

export const projectCategories = [
  "All",
  "AI Video",
  "Social Media",
  "SEO & Web",
  "AI Images",
  "Digital Marketing"
];
