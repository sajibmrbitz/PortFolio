import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

// Placeholder data — will be replaced with Firestore data
const latestPosts = [
  {
    id: "1",
    title: "From Organic Chemistry to Graph Theory: A Different Way to Visualize Chemical Reactions",
    slug: "organic-chemistry-graph-theory",
    excerpt:
      "I plan to build an interactive Organic Reaction Visualization Project, where students can select any two compounds and instantly see the shortest conversion path, required reagents, alternative route...",
    coverImage: "/images/blog/chemistry.jpg",
  },
  {
    id: "2",
    title: "Building a Bulletproof Payment Gateway: A System Design Walkthrough",
    slug: "bulletproof-payment-gateway",
    excerpt:
      "Payment systems look deceptively simple on the surface, a user pays, your server talks to a processor like Stripe, and money changes hands. But underneath that simplicity hides a minefield ...",
    coverImage: "/images/blog/payment.jpg",
  },
  {
    id: "3",
    title: "Bangladesh in Anthropic's Official Report: How Are We Actually Using AI?",
    slug: "bangladesh-anthropic-report",
    excerpt:
      "Anthropic recently published an official report based on global Claude AI usage. I spent some time analyzing Bangladesh's data, and a few interesting insights stood out.",
    coverImage: "/images/blog/anthropic.jpg",
  },
];

export default function LatestBlogPosts() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Latest Blog Posts"
          actionLabel="View all"
          actionHref="/blog"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Cover Image */}
              <div className="relative h-44 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-earth-700)] to-[var(--color-earth-900)] flex items-center justify-center">
                  <span className="text-[var(--text-muted)] text-xs px-4 text-center">
                    {post.title}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-2">
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
    </section>
  );
}
