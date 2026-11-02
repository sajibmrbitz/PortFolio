import Image from "next/image";
import type { Metadata } from "next";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Mahmodur Rahman Sajib, a CS undergraduate focused on system design, algorithms, games, and useful software.",
};

const experience = [
  {
    role: "Systems-minded developer",
    company: "Self Inspired",
    period: "2025 — Present",
    description:
      "Building full-stack products, browser tools, and real-time systems with an emphasis on clear architecture and useful interfaces.",
  },
  {
    role: "Game Developer & Designer",
    company: "Self Inspired",
    period: "2026 — Present",
    description:
      "Designing and Building playable exes of some amazing concept driven games using game engines like Unity and Godot.",
  },
];

const education = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "BUET, Dhaka, Bangladesh",
    period: "2025 — Present",
    description:
      "Studying core CS fundamentals including Data Structures, Algorithms, OOP, Database Systems, OS, Software Engineering etc.",
  },
  {
    degree: "HSC in Science",
    institution: "Notre Dame College, Dhaka, Bangladesh",
    period: "2023 — 2024",
    description:
      "I completed my HSC level education in science with top 100 academic ranking in college and 100% attendance record",
  },
];

const technicalSkills = [
  {
    category: "Languages",
    skills: ["C", "C++", "Java", "JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Vite"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Socket.IO", "PeerJS", "REST APIs"],
  },
  {
    category: "Database",
    skills: ["Firebase", "PostgreSQL", "MongoDB", "MySQL", "Oracle"],
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Linux"],
  },
  {
    category: "AI / ML",
    skills: ["Python", "Streamlit", "ARIMA", "Gemini API", "TensorFlow Basics"],
  },
];

const interests = [
  "Web Development",
  "AI & Machine Learning",
  "System Design",
  "Open Source",
  "UI/UX Design",
  "Startups & Entrepreneurship",
  "Game Development",
  "Cybersecurity Fundamentals",
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-start gap-10">
            {/* Profile Image */}
            <div className="shrink-0">
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-xl border-2 border-[var(--border-subtle)]">
                <Image
                  src="/images/profile.png"
                  alt="Mahmodur Rahman Sajib"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1">
              <h1 className="heading-serif text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
                About Me
              </h1>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
                Hi, I&apos;m{" "}
                <span className="text-[var(--text-primary)] font-semibold">
                  Mahmodur Rahman Sajib
                </span>
                — a CS undergraduate who likes understanding how systems work,
                then turning that understanding into software people can use.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                My public work spans real-time multiplayer games, browser extensions,
                peer-to-peer sharing, AI/data products, and the algorithms that
                support them. I care about readable architecture, honest
                constraints, and learning in public.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-sm font-medium text-[var(--accent)]">
                  Available for collaboration
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <hr className="border-[var(--section-divider)] mb-16" />

        {/* ── Experience ── */}
        <section className="mb-16">
          <h2 className="heading-serif text-2xl sm:text-3xl text-[var(--text-primary)] mb-8">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((item, index) => (
              <div
                key={index}
                className="relative pl-6 border-l-2 border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors duration-300"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent)]" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    {item.role}
                  </h3>
                  <span className="text-sm text-[var(--accent)]">
                    @ {item.company}
                  </span>
                </div>
                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  {item.period}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <hr className="border-[var(--section-divider)] mb-16" />

        {/* ── Education ── */}
        <section className="mb-16">
          <h2 className="heading-serif text-2xl sm:text-3xl text-[var(--text-primary)] mb-8">
            Education
          </h2>
          <div className="space-y-8">
            {education.map((item, index) => (
              <div
                key={index}
                className="relative pl-6 border-l-2 border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors duration-300"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent)]" />
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                  {item.degree}
                </h3>
                <p className="text-sm text-[var(--accent)] mb-1">
                  {item.institution}
                </p>
                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  {item.period}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <hr className="border-[var(--section-divider)] mb-16" />

        {/* ── Technical Skills ── */}
        <section className="mb-16">
          <h2 className="heading-serif text-2xl sm:text-3xl text-[var(--text-primary)] mb-8">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {technicalSkills.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Tag key={skill} label={skill} size="md" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <hr className="border-[var(--section-divider)] mb-16" />

        {/* ── Interests ── */}
        <section className="mb-16">
          <h2 className="heading-serif text-2xl sm:text-3xl text-[var(--text-primary)] mb-8">
            Interests
          </h2>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all duration-300"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="text-center py-12 px-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <h2 className="heading-serif text-2xl sm:text-3xl text-[var(--text-primary)] mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            I&apos;m always open to discussing new projects, creative ideas on web/IoT/Game projects, or
            opportunities to be part of your vision.
          </p>
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <Button href="/contact" variant="primary">
              Get in Touch
            </Button>
            <Button href="/projects" variant="outline">
              View My Works
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
