import { Timestamp } from "firebase/firestore";

// ──────────────────────────────────────────────
// Projects
// ──────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProjectInput {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  year: number;
  description: string;
  credentialUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface AchievementInput {
  title: string;
  issuer: string;
  year: number;
  description: string;
  credentialUrl: string;
}

// ──────────────────────────────────────────────
// Blog Posts
// ──────────────────────────────────────────────
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ──────────────────────────────────────────────
// Short Posts (Updates / Micro-posts)
// ──────────────────────────────────────────────
export interface Post {
  id: string;
  content: string;
  link?: string;
  createdAt: Timestamp;
}

// ──────────────────────────────────────────────
// Gallery Images
// ──────────────────────────────────────────────
export interface GalleryImage {
  id: string;
  title: string;
  caption?: string;
  imageUrl: string;
  cloudinaryPublicId: string;
  category?: string;
  order: number;
  createdAt: Timestamp;
}

// ──────────────────────────────────────────────
// Contact Submissions
// ──────────────────────────────────────────────
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Timestamp;
}

// ──────────────────────────────────────────────
// GitHub Activity (for the home feed)
// ──────────────────────────────────────────────
export interface GitHubEvent {
  id: string;
  type: string;
  repo: string;
  message: string;
  timestamp: string;
}

// ──────────────────────────────────────────────
// Side Projects ("Also Building" section)
// ──────────────────────────────────────────────
export interface SideProject {
  id: string;
  name: string;
  role: string;
  category: string;
  description: string;
  logo?: string;
  url?: string;
  order: number;
}

// ──────────────────────────────────────────────
// Navigation
// ──────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}
