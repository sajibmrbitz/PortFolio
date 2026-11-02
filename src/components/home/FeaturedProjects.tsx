"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Tag from "@/components/ui/Tag";
import SectionHeader from "@/components/ui/SectionHeader";
import { subscribeToProjects } from "@/lib/content";
import type { Project } from "@/types";
import { portfolioProjects } from "@/lib/github-data";

// Placeholder data — will be replaced with Firestore data
const featuredProjects = portfolioProjects.filter((project) => project.featured);

export default function FeaturedProjects() {
  const [liveProjects, setLiveProjects] = useState<Project[]>([]);

  useEffect(() => {
    return subscribeToProjects(
      (projects) => setLiveProjects(projects.filter((project) => project.featured)),
      () => {
        // The curated fallback remains available when Firebase is not configured.
      },
    );
  }, []);

  const projects = liveProjects.length > 0 ? liveProjects.filter((project) => project.featured) : featuredProjects;

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Selected work"
          actionLabel="View all"
          actionHref="/projects"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((project) => {
            const accent = "accent" in project ? project.accent : "#334155";
            const category = "category" in project ? project.category : "Build";
            const language = "language" in project ? project.language : "Portfolio";
            return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden hover:-translate-y-1 transition-transform duration-200"
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-[var(--bg-card)]" style={{ background: `linear-gradient(135deg, ${accent}33, var(--bg-card) 68%)` }}>
                  <div className="flex h-full flex-col justify-between p-5">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">{category}</span>
                    <span className="text-5xl font-black tracking-[-0.08em] text-[var(--text-primary)]/10">{project.title.slice(0, 2).toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3"><h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-2">
                  {project.title}
                </h3><span className="font-mono text-[10px] text-[var(--text-muted)]">{language}</span></div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}


