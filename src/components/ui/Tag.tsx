interface TagProps {
  label: string;
  size?: "sm" | "md";
}

export default function Tag({ label, size = "sm" }: TagProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded-md border border-[var(--tag-border)]
        bg-[var(--tag-bg)] text-[var(--tag-text)] font-medium transition-theme
        ${size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3.5 py-1.5 text-sm"}
      `}
    >
      {label}
    </span>
  );
}
