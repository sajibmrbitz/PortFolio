import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Tag from "@/components/ui/Tag";

// Placeholder — will be fetched from Firestore
const blogData: Record<string, {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}> = {
  "organic-chemistry-graph-theory": {
    title:
      "From Organic Chemistry to Graph Theory: A Different Way to Visualize Chemical Reactions",
    excerpt:
      "Building an interactive Organic Reaction Visualization Project using graph algorithms.",
    date: "July 25, 2026",
    readTime: "8 min read",
    tags: ["Graph Theory", "Chemistry", "Algorithm"],
    content: `What if you could visualize every organic reaction as a graph — where compounds are nodes, reactions are edges, and finding the best synthesis route is just a shortest-path problem?

That's exactly what I set out to build. An interactive Organic Reaction Visualization Project, where students can select any two compounds and instantly see the shortest conversion path, required reagents, alternative routes, and conditions — all powered by graph algorithms.

## The Problem

Organic chemistry is notoriously difficult for students. One major pain point is understanding how different compounds relate to each other through reactions. Textbooks present reactions linearly, but chemistry is actually a complex network.

## The Graph Approach

By modeling compounds as nodes and reactions as weighted edges, we can leverage well-known graph algorithms:
- **Dijkstra's Algorithm** — Find the shortest synthesis path
- **BFS** — Explore all possible routes at each "distance"
- **DFS** — Deep exploration of reaction chains

## Implementation

The project uses React for the frontend with D3.js for graph visualization. Each node displays the compound structure, and edges show the required reagents and conditions.

## What's Next

I plan to expand the dataset to cover the entire undergraduate organic chemistry curriculum and add features like reaction condition filtering and yield optimization.`,
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogData[slug];

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h1 className="heading-serif text-3xl text-[var(--text-primary)] mb-4">
          Post Not Found
        </h1>
        <p className="text-[var(--text-secondary)] mb-6">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Back Link ── */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* ── Meta ── */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>

        {/* ── Title ── */}
        <h1 className="heading-serif text-3xl sm:text-4xl text-[var(--text-primary)] mb-6 leading-tight">
          {post.title}
        </h1>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} size="md" />
          ))}
        </div>

        {/* ── Cover Image ── */}
        <div className="relative h-56 sm:h-72 rounded-xl overflow-hidden mb-12 border border-[var(--border-subtle)]">
          <div className="w-full h-full bg-gradient-to-br from-[var(--color-earth-700)] to-[var(--color-earth-900)] flex items-center justify-center">
            <span className="text-[var(--text-muted)]">Cover Image</span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="space-y-6">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="heading-serif text-xl sm:text-2xl text-[var(--text-primary)] mt-8 mb-2"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("- **")) {
              return (
                <ul key={i} className="space-y-2 ml-1">
                  {paragraph.split("\n").map((line, j) => {
                    const match = line.match(/- \*\*(.+?)\*\* — (.+)/);
                    if (match) {
                      return (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                        >
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[var(--accent)] shrink-0" />
                          <span>
                            <strong className="text-[var(--text-primary)]">
                              {match[1]}
                            </strong>{" "}
                            — {match[2]}
                          </span>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              );
            }
            return (
              <p
                key={i}
                className="text-[var(--text-secondary)] leading-relaxed text-base"
              >
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* ── Back to Blog ── */}
        <div className="mt-16 pt-8 border-t border-[var(--section-divider)]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
