import Link from "next/link";
import { ArrowRight, GitBranch, ShieldCheck, Trophy } from "lucide-react";
import { githubProfile } from "@/lib/github-data";

// Placeholder data — will be replaced with GitHub API or Firestore data
const githubEvents = [
  { icon: GitBranch, label: "Pinned portfolio", value: "6 repositories", detail: "Tools, games, and systems" },
  { icon: Trophy, label: "Competitive programming", value: "Codeforces + LeetCode", detail: "A growing archive of solved problems" },
  { icon: ShieldCheck, label: "Security fundamentals", value: "TryHackMe", detail: "CTF · Linux · networking · Windows security" },
];

export default function GitHubActivity() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="heading-serif text-2xl sm:text-3xl text-[var(--text-primary)]">
            The work behind the profile
          </h2>
          <Link
            href={githubProfile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
          >
            GitHub profile
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-3">
          {githubEvents.map((event) => (
            <div key={event.label} className="bg-[var(--bg-card)] p-6">
              <event.icon className="mb-8 h-5 w-5 text-[var(--accent)]" />
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{event.label}</p>
              <p className="mb-2 text-lg font-semibold text-[var(--text-primary)]">{event.value}</p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{event.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
