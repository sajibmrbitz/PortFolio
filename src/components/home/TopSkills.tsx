import Tag from "@/components/ui/Tag";

const skills = [
  "C",
  "C++",
  "Java",
  "JavaScript",
  "Python",
  "SQL",
  "React / Next.js",
  "Node.js / Express",
  "PostgreSQL / Firebase",
  "Socket.IO / WebRTC",
  "Godot / Phaser",
];

export default function TopSkills() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-serif text-2xl sm:text-3xl text-[var(--text-primary)] mb-8">
          Top Skills
        </h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <Tag key={skill} label={skill} size="md" />
          ))}
        </div>
      </div>
    </section>
  );
}
