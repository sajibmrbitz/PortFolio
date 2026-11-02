"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import type { NavLink } from "@/types";

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Achievements", href: "/achievements" },
  { label: "Posts", href: "/posts" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] backdrop-blur-md bg-[var(--bg-nav)]">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="heading-serif text-xl sm:text-2xl text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors duration-300 shrink-0"
          >
            SAJIB<span className="text-[var(--accent)]">/</span>SYSTEMS
          </Link>

          {/* ── Desktop Navigation ── */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    relative px-3 py-1.5 text-sm font-medium rounded transition-all duration-300
                    ${
                      isActive(link.href)
                        ? "text-[var(--text-primary)] bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }
                  `}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              href="/admin/login"
              className="p-2 rounded-lg hover:bg-[var(--bg-card-hover)] transition-all duration-300"
              aria-label="Admin login"
            >
              <User className="w-[18px] h-[18px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" />
            </Link>

            {/* ── Mobile Menu Button ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-card-hover)] transition-all duration-300 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-[var(--text-primary)]" />
              ) : (
                <Menu className="w-5 h-5 text-[var(--text-primary)]" />
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Navigation ── */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${mobileOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"}
          `}
        >
          <ul className="flex flex-col gap-1 pt-2 border-t border-[var(--border-subtle)]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                    ${
                      isActive(link.href)
                        ? "text-[var(--text-primary)] bg-[var(--bg-card-hover)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]"
                    }
                  `}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
