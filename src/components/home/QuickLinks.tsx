import Link from "next/link";
import { Code2, BookOpen, ImageIcon, ArrowRight, Github } from "lucide-react";
import { githubProfile } from "@/lib/github-data";

const links = [
  {
    icon: Code2,
    title: "Projects",
    description: "Check out my latest work",
    action: "Explore",
    href: "/projects",
    color: "text-[var(--accent)]",
  },
  {
    icon: Github,
    title: "GitHub",
    description: "26 public repositories and ongoing experiments",
    action: "Open profile",
    href: githubProfile.githubUrl,
    color: "text-[var(--accent)]",
  },
  {
    icon: BookOpen,
    title: "Blog",
    description: "Thoughts on tech and development",
    action: "Read More",
    href: "/blog",
    color: "text-[var(--accent)]",
  },
  {
    icon: ImageIcon,
    title: "Gallery",
    description: "Capturing moments and achievements",
    action: "View Gallery",
    href: "/gallery",
    color: "text-[var(--accent)]",
  },
];

export default function QuickLinks() {
  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group p-5 border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors"
            >
              <item.icon
                className={`w-6 h-6 ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
              />
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {item.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] font-medium group-hover:gap-2.5 transition-all duration-300">
                {item.action}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
