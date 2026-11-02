"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Tag from "@/components/ui/Tag";
import { subscribeToProjects } from "@/lib/content";
import type { Project } from "@/types";
import { portfolioProjects, pinnedProjects } from "@/lib/github-data";

const allProjects = portfolioProjects;

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [liveProjects, setLiveProjects] = useState<Project[]>([]);

  useEffect(() => {
    return subscribeToProjects(setLiveProjects, () => {
      // The curated fallback remains available when Firebase is not configured.
    });
  }, []);

  const projects = useMemo(
    () => (liveProjects.length > 0 ? liveProjects : allProjects),
    [liveProjects],
  );
  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.tags))).sort(),
    [projects],
  );

  const filteredProjects = activeFilter
    ? projects.filter((p) => p.tags.includes(activeFilter))
    : projects;

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-12">
          <h1 className="heading-serif text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
            Projects
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            A field guide to the systems, games, tools, and experiments I build while
            studying computer science. Pinned work comes first from GitHub.
          </p>
        </div>

        <div className="mb-10 grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-3">
          <div className="bg-[var(--bg-card)] p-5"><p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Pinned first</p><p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{pinnedProjects.length}</p><p className="mt-1 text-sm text-[var(--text-secondary)]">GitHub projects curated up front</p></div>
          <div className="bg-[var(--bg-card)] p-5"><p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Core interests</p><p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">Systems + games</p><p className="mt-1 text-sm text-[var(--text-secondary)]">Architecture that people can play with</p></div>
          <div className="bg-[var(--bg-card)] p-5"><p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Open source</p><p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">26 repos</p><p className="mt-1 text-sm text-[var(--text-secondary)]">See the full profile on GitHub</p></div>
        </div>

        {/* ── Filter Tags ── */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-300 cursor-pointer ${
              activeFilter === null
                ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setActiveFilter(activeFilter === tag ? null : tag)
              }
              className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-300 cursor-pointer ${
                activeFilter === tag
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── Projects Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden hover:-translate-y-1 transition-transform duration-200"
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[var(--bg-card-hover)] to-[var(--bg-primary)] flex flex-col justify-between p-5">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">{"category" in project ? project.category : "Build"}</span>
                  <span className="text-5xl font-black tracking-[-0.08em] text-[var(--text-primary)]/10">{project.title.slice(0, 2).toUpperCase()}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3"><h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-2">
                  {project.title}
                </h3>{"language" in project && <span className="font-mono text-[10px] text-[var(--text-muted)]">{project.language}</span>}</div>
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
          ))}
        </div>

        {/* ── Empty State ── */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted)] text-lg">
              No projects found with the selected filter.
            </p>
            <button
              onClick={() => setActiveFilter(null)}
              className="mt-4 text-sm text-[var(--accent)] hover:underline cursor-pointer"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


