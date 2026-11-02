"use client";

import { useEffect, useState } from "react";
import { Award, ExternalLink } from "lucide-react";
import { subscribeToAchievements } from "@/lib/content";
import type { Achievement } from "@/types";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    return subscribeToAchievements(setAchievements, () => {
      // Empty state is intentionally rendered while Firebase is unavailable.
    });
  }, []);

  return (
    <main className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            Milestones
          </p>
          <h1 className="heading-serif text-4xl text-[var(--text-primary)] sm:text-5xl">
            Achievements
          </h1>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Certifications, awards, and milestones collected along the way.
          </p>
        </div>

        {achievements.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {achievements.map((achievement) => (
              <article
                key={achievement.id}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--tag-bg)] text-[var(--accent)]">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-[var(--tag-bg)] px-3 py-1 text-sm text-[var(--text-secondary)]">
                    {achievement.year}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  {achievement.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-[var(--accent)]">
                  {achievement.issuer}
                </p>
                <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                  {achievement.description}
                </p>
                {achievement.credentialUrl && (
                  <a
                    href={achievement.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
                  >
                    View credential <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border-color)] px-6 py-16 text-center">
            <Award className="mx-auto h-8 w-8 text-[var(--text-muted)]" />
            <p className="mt-4 text-[var(--text-secondary)]">
              Achievements will appear here as they are published.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
