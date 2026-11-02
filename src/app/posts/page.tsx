import type { Metadata } from "next";
import { GitCommit } from "lucide-react";

export const metadata: Metadata = {
  title: "Posts",
  description:
    "Short updates, micro-posts, and activity feed from Mahmodur Rahman Sajib.",
};

// Placeholder data — will be replaced with Firestore data
const posts: Array<{
  id: string;
  icon: typeof GitCommit;
  content: string;
  date: string;
  category: string;
}> = [];

const categoryColors: Record<string, string> = {
  commit: "text-[var(--accent)]",
  blog: "text-[var(--accent-gold)]",
  update: "text-[var(--text-muted)]",
};

export default function PostsPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-12">
          <h1 className="heading-serif text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
            Posts
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            Short updates, commits, micro-posts, and things I&apos;m working on
            — a stream of everything happening behind the scenes.
          </p>
        </div>

        {/* ── Posts Timeline ── */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[17px] top-0 bottom-0 w-px bg-[var(--border-subtle)]" />

          <div className="space-y-0">
            {posts.map((post) => {
              const Icon = post.icon;
              return (
                <div
                  key={post.id}
                  className="relative flex gap-5 py-5 group hover:bg-[var(--bg-card-hover)] px-4 -mx-4 rounded-lg transition-colors duration-200"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 shrink-0 mt-0.5">
                    <div className="w-[35px] h-[35px] rounded-full bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] group-hover:border-[var(--accent)] flex items-center justify-center transition-colors duration-300">
                      <Icon
                        className={`w-4 h-4 ${categoryColors[post.category]}`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {post.content}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1.5">
                      {post.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Load More (placeholder) ── */}
        <div className="text-center mt-12">
          <button className="px-6 py-2.5 text-sm font-medium rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all duration-300 cursor-pointer">
            Load more posts
          </button>
        </div>
      </div>
    </div>
  );
}
