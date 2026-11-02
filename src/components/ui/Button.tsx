import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer";

  const variants = {
    primary: `bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-sm hover:shadow-md`,
    outline: `border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]`,
  };

  const styles = `${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
        {variant === "primary" && (
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        )}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
      {variant === "primary" && (
        <ArrowRight className="w-4 h-4" />
      )}
    </button>
  );
}
