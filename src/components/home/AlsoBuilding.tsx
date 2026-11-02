import Link from "next/link";

// Placeholder data — will be replaced with Firestore data
const sideProjects = [
  {
    id: "1",
    name: "Centfume",
    role: "Founder",
    category: "A perfume brand",
    description:
      "A fragrance startup I founded – building a perfume brand from scratch, from formulation to launch.",
    logo: "C",
    url: "/projects",
  },
];

export default function AlsoBuilding() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-serif text-2xl sm:text-3xl text-[var(--text-primary)] mb-8">
          Also Building
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sideProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors"
            >
              {/* Logo */}
              <div className="w-10 h-10 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] flex items-center justify-center mb-4">
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  {project.logo}
                </span>
              </div>

              {/* Title + Role */}
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {project.name}
                </h3>
                <span className="px-2 py-0.5 text-xs font-medium rounded bg-[var(--accent)] text-white">
                  {project.role}
                </span>
              </div>

              <p className="text-sm text-[var(--text-secondary)] mb-3">
                {project.category}
              </p>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Visit Link */}
              <Link
                href={project.url}
                className="inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium transition-colors duration-300"
              >
                View projects →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
