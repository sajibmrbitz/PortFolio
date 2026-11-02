import Link from "next/link";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { githubProfile } from "@/lib/github-data";

const footerLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Posts", href: "/posts" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Mail, href: `mailto:${githubProfile.email}`, label: "Email" },
  { icon: Phone, href: githubProfile.whatsappUrl, label: "WhatsApp" },
  { icon: Github, href: githubProfile.githubUrl, label: "GitHub" },
  { icon: Linkedin, href: githubProfile.linkedinUrl, label: "LinkedIn" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] transition-theme">
      {/* ── Main Footer Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left Column — Identity */}
          <div className="max-w-sm">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Mahmodur Rahman Sajib
            </h3>
            <p className="mt-2 text-sm text-[var(--accent-gold)] leading-relaxed">
              CS undergrad building systems, games, and useful software in public.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column — Navigation */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300 link-hover"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Copyright Bar ── */}
      <div className="border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p
            className="text-xs tracking-widest uppercase text-[var(--text-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © {currentYear} Mahmodur Rahman Sajib. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
