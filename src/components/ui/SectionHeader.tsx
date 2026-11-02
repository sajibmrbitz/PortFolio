import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function SectionHeader({
  title,
  actionLabel,
  actionHref,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="heading-serif text-2xl sm:text-3xl text-[var(--text-primary)]">
        {title}
      </h2>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="group flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
        >
          {actionLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      )}
    </div>
  );
}
