"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { isLocalAdmin, localLogin } from "@/lib/local-data";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("sajibmr2005@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFirebaseConfigured) {
      return onAuthStateChanged(auth, (user) => {
        if (user) router.replace("/admin");
      });
    }
    if (isLocalAdmin()) router.replace("/admin");
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isFirebaseConfigured) {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (!localLogin(email, password)) {
        throw new Error("Invalid credentials");
      }
      router.replace("/admin");
    } catch {
      setError("Email or password is incorrect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-9rem)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 shadow-xl">
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
          Private area
        </p>
        <h1 className="heading-serif text-4xl text-[var(--text-primary)]">
          Admin login
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
          Sign in to manage the portfolio content. Changes are published live.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              Email
            </span>
            <span className="relative block">
              <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--text-muted)]" />
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-[var(--border-color)] bg-transparent py-2.5 pl-10 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              Password
            </span>
            <span className="relative block">
              <LockKeyhole className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--text-muted)]" />
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-[var(--border-color)] bg-transparent py-2.5 pl-10 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
            </span>
          </label>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
