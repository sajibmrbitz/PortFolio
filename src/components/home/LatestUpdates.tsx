import SectionHeader from "@/components/ui/SectionHeader";

// Placeholder data — will be replaced with Firestore data
const updates = [
  {
    id: "1",
    date: "7/29/2026",
      message: "Shipped the portfolio refresh: a project-led home built around the public GitHub profile and pinned work.",
  },
  {
    id: "2",
    date: "7/29/2026",
      message: "Exploring multiplayer game architecture, browser tooling, and systems that stay useful under real constraints.",
  },
];

export default function LatestUpdates() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Latest Updates"
          actionLabel="View all"
          actionHref="/posts"
        />

        <div className="space-y-0 divide-y divide-[var(--border-subtle)]">
          {updates.map((update) => (
            <div
              key={update.id}
              className="py-5 hover:bg-[var(--bg-card-hover)] px-4 -mx-4 rounded-lg transition-colors duration-200"
            >
              <p className="text-xs text-[var(--text-muted)] mb-2">
                {update.date}
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {update.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
