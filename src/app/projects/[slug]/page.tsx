import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import { portfolioProjects } from "@/lib/github-data";


export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="py-20 text-center">
        <h1 className="heading-serif text-3xl text-[var(--text-primary)] mb-4">
          Project Not Found
        </h1>
        <p className="text-[var(--text-secondary)] mb-6">
          The project you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button href="/projects" variant="outline">
          ← Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Back Link ── */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* ── Header ── */}
        <h1 className="heading-serif text-3xl sm:text-4xl text-[var(--text-primary)] mb-4">
          {project.title}
        </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            {project.description}
          </p>

        <div className="mb-8 grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-3">
          <div className="bg-[var(--bg-card)] p-4"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Category</p><p className="mt-2 text-sm font-medium text-[var(--text-primary)]">{project.category}</p></div>
          <div className="bg-[var(--bg-card)] p-4"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Primary language</p><p className="mt-2 text-sm font-medium text-[var(--text-primary)]">{project.language}</p></div>
          <div className="bg-[var(--bg-card)] p-4"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Source</p><p className="mt-2 text-sm font-medium text-[var(--text-primary)]">Public on GitHub</p></div>
        </div>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} size="md" />
          ))}
        </div>

        {/* ── Action Links ── */}
        <div className="flex flex-wrap gap-3 mb-12">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          )}
        </div>

        {/* ── Cover Image ── */}
        <div className="relative h-64 sm:h-80 overflow-hidden mb-12 border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex h-full flex-col justify-between p-8" style={{ background: `linear-gradient(135deg, ${project.accent}33, var(--bg-card) 72%)` }}>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">{project.category}</span>
            <span className="text-7xl font-black tracking-[-0.1em] text-[var(--text-primary)]/10 sm:text-9xl">{project.title.slice(0, 2).toUpperCase()}</span>
          </div>
        </div>

        {/* ── Content ── */}
        <article className="prose prose-invert max-w-none">
          {project.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="heading-serif text-xl sm:text-2xl text-[var(--text-primary)] mt-10 mb-4"
                >
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("- **")) {
              const match = line.match(/- \*\*(.+?)\*\* — (.+)/);
              if (match) {
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-2"
                  >
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[var(--accent)] shrink-0" />
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="font-semibold text-[var(--text-primary)]">
                        {match[1]}
                      </span>{" "}
                      — {match[2]}
                    </p>
                  </div>
                );
              }
            }
            if (line.trim() === "") return null;
            return (
              <p
                key={i}
                className="text-[var(--text-secondary)] leading-relaxed mb-2"
              >
                {line}
              </p>
            );
          })}
        </article>
      </div>
    </div>
  );
}
