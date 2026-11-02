import Link from "next/link";
import type { Metadata } from "next";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on tech, development, system design, and AI — by Mahmodur Rahman Sajib.",
};

// Placeholder data — will be replaced with Firestore data
const blogPosts = [
  {
    id: "1",
    title:
      "From Organic Chemistry to Graph Theory: A Different Way to Visualize Chemical Reactions",
    slug: "organic-chemistry-graph-theory",
    excerpt:
      "I plan to build an interactive Organic Reaction Visualization Project, where students can select any two compounds and instantly see the shortest conversion path, required reagents, alternative routes, and conditions — all powered by graph algorithms.",
    coverImage: "/images/blog/chemistry.jpg",
    date: "July 25, 2026",
    readTime: "8 min read",
    tags: ["Graph Theory", "Chemistry", "Algorithm"],
  },
  {
    id: "2",
    title:
      "Building a Bulletproof Payment Gateway: A System Design Walkthrough",
    slug: "bulletproof-payment-gateway",
    excerpt:
      "Payment systems look deceptively simple on the surface, a user pays, your server talks to a processor like Stripe, and money changes hands. But underneath that simplicity hides a minefield of edge cases.",
    coverImage: "/images/blog/payment.jpg",
    date: "July 20, 2026",
    readTime: "12 min read",
    tags: ["System Design", "Payments", "Backend"],
  },
  {
    id: "3",
    title:
      "Bangladesh in Anthropic's Official Report: How Are We Actually Using AI?",
    slug: "bangladesh-anthropic-report",
    excerpt:
      "Anthropic recently published an official report based on global Claude AI usage. I spent some time analyzing Bangladesh's data, and a few interesting insights stood out.",
    coverImage: "/images/blog/anthropic.jpg",
    date: "July 15, 2026",
    readTime: "6 min read",
    tags: ["AI", "Bangladesh", "Analysis"],
  },
  {
    id: "4",
    title: "Why Every Developer Should Learn System Design Early",
    slug: "learn-system-design-early",
    excerpt:
      "System design isn't just for senior engineers or interview prep. Learning it early in your career changes how you think about building software — from monoliths to microservices, from APIs to event-driven architectures.",
    coverImage: "/images/blog/system-design.jpg",
    date: "July 10, 2026",
    readTime: "10 min read",
    tags: ["System Design", "Career", "Backend"],
  },
  {
    id: "5",
    title: "My Experience Building a SaaS Product from Scratch",
    slug: "building-saas-from-scratch",
    excerpt:
      "From idea validation to deployment — a comprehensive walkthrough of what it takes to build a SaaS product as a solo developer. Lessons learned, tech choices made, and mistakes to avoid.",
    coverImage: "/images/blog/saas.jpg",
    date: "July 5, 2026",
    readTime: "15 min read",
    tags: ["SaaS", "Startup", "Full-stack"],
  },
];

export default function BlogPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-12">
          <h1 className="heading-serif text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
            Blog
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            Thoughts on tech, development, system design, and the occasional
            deep dive into AI — written with passion and curiosity.
          </p>
        </div>

        {/* ── Blog Posts Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Post (first post, larger) */}
          <Link
            href={`/blog/${blogPosts[0].slug}`}
            className="group lg:col-span-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col md:flex-row">
              {/* Cover Image */}
              <div className="relative md:w-1/2 h-56 md:h-auto overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-earth-700)] to-[var(--color-earth-900)] flex items-center justify-center min-h-[280px]">
                  <span className="text-[var(--text-muted)] text-sm px-4 text-center">
                    {blogPosts[0].title}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider">
                    Featured
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {blogPosts[0].readTime}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-3">
                  {blogPosts[0].title}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-4">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <Calendar className="w-3.5 h-3.5" />
                  {blogPosts[0].date}
                </div>
              </div>
            </div>
          </Link>

          {/* Remaining Posts */}
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-earth-700)] to-[var(--color-earth-900)] flex items-center justify-center">
                  <span className="text-[var(--text-muted)] text-xs px-4 text-center">
                    {post.title}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-xs text-[var(--text-muted)]">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                  <span className="mx-1">·</span>
                  {post.readTime}
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
