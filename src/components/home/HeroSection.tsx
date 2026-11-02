import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, MapPin, Terminal } from "lucide-react";
import Button from "@/components/ui/Button";
import { githubProfile } from "@/lib/github-data";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(var(--border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--border-subtle)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* ── Profile Image ── */}
          <div className="shrink-0">
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 overflow-hidden border border-[var(--border-color)] bg-[var(--bg-card)] shadow-[12px_12px_0_var(--accent)]">
              <Image
                src="/images/profile.png"
                alt="Mahmodur Rahman Sajib — CS undergrad and system builder"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 256px, 288px"
              />
            </div>
          </div>

          {/* ── Text Content ── */}
          <div className="flex-1 text-center md:text-left">
            {/* Availability Badge */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center md:justify-start mb-5 text-xs font-semibold tracking-[0.16em] uppercase">
              <span className="inline-flex items-center gap-2 text-[var(--accent)]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                Available for collaborations
              </span>
              <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
                <MapPin className="h-3.5 w-3.5" /> Dhaka, Bangladesh
              </span>
            </div>

            {/* Name */}
            <h1 className="heading-serif text-4xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] mb-3">
              Mahmodur Rahman <span className="text-[var(--accent)]">Sajib</span>
            </h1>

            {/* Title */}
            <p className="text-lg sm:text-xl font-medium text-[var(--text-primary)] mb-5">
              CS Undergraduate <span className="text-[var(--text-muted)]">/</span> System Designer <span className="text-[var(--text-muted)]">/</span> Game Developer
            </p>

            {/* Description */}
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-lg mb-8">
              {githubProfile.bio} I build full-stack products, multiplayer game systems,
              developer tools, and data-driven experiments that turn ideas into
              useful experiences.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <Button href="/projects" variant="primary">
                Explore my work
              </Button>
              <Button href="/about" variant="outline">
                About me
              </Button>
            </div>
            <div className="mt-7 flex items-center justify-center md:justify-start gap-5 text-sm">
              <Link href={githubProfile.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)]">
                <Github className="h-4 w-4" /> @{githubProfile.username} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <span className="text-[var(--border-subtle)]">|</span>
              <span className="inline-flex items-center gap-2 text-[var(--text-muted)]"><Terminal className="h-4 w-4" /> systems + algorithms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
