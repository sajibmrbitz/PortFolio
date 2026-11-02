"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Award,
  FolderKanban,
  LogOut,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { getSiteSettings, isLocalAdmin, localLogout, saveSiteSettings, type SiteSettings } from "@/lib/local-data";
import {
  createAchievement,
  createProject,
  removeAchievement,
  removeProject,
  subscribeToAchievements,
  subscribeToProjects,
  updateAchievement,
  updateProject,
} from "@/lib/content";
import type {
  Achievement,
  AchievementInput,
  Project,
  ProjectInput,
} from "@/types";

const emptyProject: ProjectInput = {
  title: "",
  slug: "",
  description: "",
  coverImage: "",
  tags: [],
  liveUrl: "",
  githubUrl: "",
  featured: false,
  order: 0,
};

const emptyAchievement: AchievementInput = {
  title: "",
  issuer: "",
  year: new Date().getFullYear(),
  description: "",
  credentialUrl: "",
};

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activeTab, setActiveTab] = useState<"projects" | "achievements" | "settings">("projects");
  const [projectForm, setProjectForm] = useState<ProjectInput>(emptyProject);
  const [achievementForm, setAchievementForm] = useState<AchievementInput>(emptyAchievement);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loadError, setLoadError] = useState("");
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    if (isFirebaseConfigured) {
      return onAuthStateChanged(auth, (firebaseUser) => {
        const isAdmin = firebaseUser?.email?.toLowerCase() === "sajibmr2005@gmail.com";
        setUser(Boolean(isAdmin));
        if (!isAdmin) router.replace("/admin/login");
      });
    }
    const authenticated = isLocalAdmin();
    setUser(authenticated);
    if (!authenticated) router.replace("/admin/login");
  }, [router]);

  useEffect(() => {
    if (!user) return;
    const unsubscribeProjects = subscribeToProjects(setProjects, (error) =>
      setLoadError(error.message),
    );
    const unsubscribeAchievements = subscribeToAchievements(setAchievements, (error) =>
      setLoadError(error.message),
    );
    return () => {
      unsubscribeProjects();
      unsubscribeAchievements();
    };
  }, [user]);

  const stats = useMemo(
    () => [
      { label: "Total projects", value: projects.length, icon: FolderKanban },
      { label: "Achievements", value: achievements.length, icon: Award },
    ],
    [projects.length, achievements.length],
  );

  function resetForms() {
    setProjectForm(emptyProject);
    setAchievementForm(emptyAchievement);
    setEditingProject(null);
    setEditingAchievement(null);
  }

  async function submitProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const input = {
        ...projectForm,
        slug: projectForm.slug || projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        tags: projectForm.tags,
      };
      if (editingProject) await updateProject(editingProject, input);
      else await createProject(input);
      setMessage(editingProject ? "Project updated live." : "Project published live.");
      resetForms();
    } catch {
      setMessage("Could not save the project. Check your Firebase configuration.");
    } finally {
      setSaving(false);
    }
  }

  async function submitAchievement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      if (editingAchievement) await updateAchievement(editingAchievement, achievementForm);
      else await createAchievement(achievementForm);
      setMessage(editingAchievement ? "Achievement updated live." : "Achievement published live.");
      resetForms();
    } catch {
      setMessage("Could not save the achievement. Check your Firebase configuration.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteItem(type: "project" | "achievement", id: string) {
    if (!window.confirm(`Delete this ${type}? This cannot be undone.`)) return;
    try {
      if (type === "project") await removeProject(id);
      else await removeAchievement(id);
      setMessage(`${type === "project" ? "Project" : "Achievement"} deleted.`);
    } catch {
      setMessage("Delete failed. Please try again.");
    }

  }

  function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveSiteSettings(settings);
    setMessage("Site settings updated live.");
  }

  if (!user) return null;

  return (
    <main className="min-h-[calc(100vh-9rem)] bg-[var(--bg-primary)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
              Content studio
            </p>
            <h1 className="heading-serif text-4xl text-[var(--text-primary)] sm:text-5xl">
              Good evening, Sajib.
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Manage the content that appears on your portfolio.
            </p>
          </div>
          <button
            onClick={async () => { if (isFirebaseConfigured) await signOut(auth); else localLogout(); router.replace("/admin/login"); }}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:border-red-400 hover:text-red-500"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--tag-bg)] text-[var(--accent)]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{label}</p>
              <p className="mt-1 text-3xl font-semibold text-[var(--text-primary)]">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                  {activeTab === "projects" ? (editingProject ? "Edit project" : "New project") : editingAchievement ? "Edit achievement" : "New achievement"}
                </h2>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">Changes publish instantly.</p>
              </div>
              {(editingProject || editingAchievement) && (
                <button onClick={resetForms} aria-label="Cancel editing" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {activeTab === "projects" ? (
              <form onSubmit={submitProject} className="space-y-4">
                <input required placeholder="Project title" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} className="admin-input" />
                <input placeholder="Slug (optional)" value={projectForm.slug} onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })} className="admin-input" />
                <textarea required placeholder="Description" rows={4} value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className="admin-input resize-none" />
                <input placeholder="Tags, separated by commas" value={projectForm.tags.join(", ")} onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) })} className="admin-input" />
                <input placeholder="Cover image URL (optional)" value={projectForm.coverImage} onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })} className="admin-input" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input placeholder="Live URL" type="url" value={projectForm.liveUrl} onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })} className="admin-input" />
                  <input placeholder="GitHub URL" type="url" value={projectForm.githubUrl} onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })} className="admin-input" />
                </div>
                <div className="flex items-center gap-4">
                  <input type="number" min="0" placeholder="Order" value={projectForm.order} onChange={(e) => setProjectForm({ ...projectForm, order: Number(e.target.value) })} className="admin-input w-32" />
                  <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"><input type="checkbox" checked={projectForm.featured} onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })} /> Featured</label>
                </div>
                <button disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"><Plus className="h-4 w-4" /> {saving ? "Saving..." : editingProject ? "Update project" : "Publish project"}</button>
              </form>
            ) : activeTab === "achievements" ? (
              <form onSubmit={submitAchievement} className="space-y-4">
                <input required placeholder="Achievement title" value={achievementForm.title} onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })} className="admin-input" />
                <input required placeholder="Issuing organization" value={achievementForm.issuer} onChange={(e) => setAchievementForm({ ...achievementForm, issuer: e.target.value })} className="admin-input" />
                <input required type="number" min="1900" max="2200" placeholder="Year" value={achievementForm.year} onChange={(e) => setAchievementForm({ ...achievementForm, year: Number(e.target.value) })} className="admin-input" />
                <textarea required placeholder="Description" rows={4} value={achievementForm.description} onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })} className="admin-input resize-none" />
                <input placeholder="Credential URL (optional)" type="url" value={achievementForm.credentialUrl} onChange={(e) => setAchievementForm({ ...achievementForm, credentialUrl: e.target.value })} className="admin-input" />
                <button disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"><Plus className="h-4 w-4" /> {saving ? "Saving..." : editingAchievement ? "Update achievement" : "Publish achievement"}</button>
              </form>
            ) : (
              <form onSubmit={saveSettings} className="space-y-4">
                <input required placeholder="Your name" value={settings.name} onChange={(e) => setSettings({ ...settings, name: e.target.value })} className="admin-input" />
                <input required placeholder="Role / headline" value={settings.role} onChange={(e) => setSettings({ ...settings, role: e.target.value })} className="admin-input" />
                <textarea required rows={4} placeholder="Bio" value={settings.bio} onChange={(e) => setSettings({ ...settings, bio: e.target.value })} className="admin-input resize-none" />
                <input placeholder="Profile image URL" value={settings.profileImage} onChange={(e) => setSettings({ ...settings, profileImage: e.target.value })} className="admin-input" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="text-sm text-[var(--text-secondary)]">Accent<input type="color" value={settings.accentColor} onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })} className="mt-2 h-10 w-full" /></label>
                  <label className="text-sm text-[var(--text-secondary)]">Background<input type="color" value={settings.backgroundColor} onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })} className="mt-2 h-10 w-full" /></label>
                  <label className="text-sm text-[var(--text-secondary)]">Font<select value={settings.fontFamily} onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value as SiteSettings["fontFamily"] })} className="admin-input mt-2"><option value="sans">Sans</option><option value="serif">Serif</option><option value="mono">Mono</option></select></label>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <input placeholder="Email link" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="admin-input" />
                  <input placeholder="GitHub link" value={settings.github} onChange={(e) => setSettings({ ...settings, github: e.target.value })} className="admin-input" />
                  <input placeholder="LinkedIn link" value={settings.linkedin} onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })} className="admin-input" />
                </div>
                <button className="rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white">Save site settings</button>
              </form>
            )}
            {message && <p className="mt-4 text-sm text-[var(--accent)]">{message}</p>}
            {loadError && <p className="mt-4 text-sm text-red-500">{loadError}</p>}
          </section>

          <section>
            <div className="mb-4 flex gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1">
              <button onClick={() => setActiveTab("projects")} className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${activeTab === "projects" ? "bg-[var(--tag-bg)] text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>Projects ({projects.length})</button>
              <button onClick={() => setActiveTab("achievements")} className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${activeTab === "achievements" ? "bg-[var(--tag-bg)] text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>Achievements ({achievements.length})</button>
              <button onClick={() => setActiveTab("settings")} className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${activeTab === "settings" ? "bg-[var(--tag-bg)] text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>Site design</button>
            </div>
            <div className="space-y-3">
              {activeTab === "projects" ? projects.map((project) => (
                <article key={project.id} className="flex items-start justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4">
                  <div><h3 className="font-semibold text-[var(--text-primary)]">{project.title}</h3><p className="mt-1 line-clamp-2 text-sm text-[var(--text-secondary)]">{project.description}</p></div>
                  <div className="flex shrink-0 gap-1"><button onClick={() => { setEditingProject(project.id); setProjectForm({ title: project.title, slug: project.slug, description: project.description, coverImage: project.coverImage, tags: project.tags, liveUrl: project.liveUrl ?? "", githubUrl: project.githubUrl ?? "", featured: project.featured, order: project.order }); }} className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--tag-bg)] hover:text-[var(--accent)]" aria-label="Edit project"><Pencil className="h-4 w-4" /></button><button onClick={() => deleteItem("project", project.id)} className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-red-50 hover:text-red-500" aria-label="Delete project"><Trash2 className="h-4 w-4" /></button></div>
                </article>
              )) : achievements.map((achievement) => (
                <article key={achievement.id} className="flex items-start justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4">
                  <div><h3 className="font-semibold text-[var(--text-primary)]">{achievement.title}</h3><p className="mt-1 text-sm text-[var(--text-secondary)]">{achievement.issuer} · {achievement.year}</p></div>
                  <div className="flex shrink-0 gap-1"><button onClick={() => { setEditingAchievement(achievement.id); setAchievementForm({ title: achievement.title, issuer: achievement.issuer, year: achievement.year, description: achievement.description, credentialUrl: achievement.credentialUrl ?? "" }); }} className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--tag-bg)] hover:text-[var(--accent)]" aria-label="Edit achievement"><Pencil className="h-4 w-4" /></button><button onClick={() => deleteItem("achievement", achievement.id)} className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-red-50 hover:text-red-500" aria-label="Delete achievement"><Trash2 className="h-4 w-4" /></button></div>
                </article>
              ))}
              {activeTab !== "settings" && (activeTab === "projects" ? projects : achievements).length === 0 && <div className="rounded-xl border border-dashed border-[var(--border-color)] p-8 text-center text-sm text-[var(--text-secondary)]">No content yet. Add your first item using the form.</div>}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
