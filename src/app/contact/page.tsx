"use client";

import { useState, FormEvent } from "react";
import {
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { githubProfile } from "@/lib/github-data";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputStyles = `
    w-full px-4 py-3 rounded-lg border bg-[var(--bg-primary)] text-[var(--text-primary)]
    placeholder:text-[var(--text-muted)] text-sm
    focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 focus:border-[var(--accent)]
    transition-all duration-300
  `;

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-12">
          <h1 className="heading-serif text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
            Contact
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            Have a project in mind, a question, or just want to say hello? I&apos;d
            love to hear from you. Fill out the form below and I&apos;ll get back
            to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* ── Contact Form ── */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 px-8 rounded-2xl border border-[var(--accent)]/30 bg-[var(--bg-card)]">
                <CheckCircle className="w-16 h-16 text-[var(--accent)] mb-4" />
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  Message Sent!
                </h3>
                <p className="text-[var(--text-secondary)] text-center max-w-sm">
                  Thank you for reaching out. I&apos;ll get back to you as soon
                  as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`${inputStyles} ${
                      errors.name
                        ? "border-red-500"
                        : "border-[var(--border-subtle)]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={`${inputStyles} ${
                      errors.email
                        ? "border-red-500"
                        : "border-[var(--border-subtle)]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1.5">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className={`${inputStyles} ${
                      errors.subject
                        ? "border-red-500"
                        : "border-[var(--border-subtle)]"
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-500 mt-1.5">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or question..."
                    rows={6}
                    className={`${inputStyles} resize-none ${
                      errors.message
                        ? "border-red-500"
                        : "border-[var(--border-subtle)]"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1.5">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Contact Info Sidebar ── */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-8">
              {/* Info Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-[var(--accent)]" />
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      Email
                    </h3>
                  </div>
                  <a
                    href={`mailto:${githubProfile.email}`}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {githubProfile.email}
                  </a>
                </div>

                <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-[var(--accent)]" />
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      Location
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Bangladesh 🇧🇩
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
                  Connect
                </h3>
                <div className="flex flex-col gap-3">
                  <a
                    href={githubProfile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                  <a
                    href={githubProfile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Availability */}
              <div className="p-5 rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    Currently Available
                  </h3>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  I&apos;m open to freelance projects, collaborations, and
                  full-time opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
