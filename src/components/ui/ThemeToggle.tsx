"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg transition-theme"
        aria-label="Toggle theme"
      >
        <div className="w-[18px] h-[18px]" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg hover:bg-[var(--bg-card-hover)] transition-all duration-300 cursor-pointer"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-[18px] h-[18px] text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors" />
      ) : (
        <Moon className="w-[18px] h-[18px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" />
      )}
    </button>
  );
}
