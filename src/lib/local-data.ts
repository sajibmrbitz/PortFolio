import type { Achievement, AchievementInput, Project, ProjectInput } from "@/types";

export interface SiteSettings {
  name: string;
  role: string;
  bio: string;
  profileImage: string;
  email: string;
  github: string;
  linkedin: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: "sans" | "serif" | "mono";
}

export const defaultSiteSettings: SiteSettings = {
  name: "Mahmodur Rahman Sajib",
  role: "CS Undergraduate · Systems Builder · Game Developer",
  bio: "CS undergraduate from Dhaka building system-minded software, developer tools, multiplayer games, and AI/data products.",
  profileImage: "/images/profile.png",
  email: "sajibmr2005@gmail.com",
  github: "https://github.com/sajibmrbitz",
  linkedin: "https://www.linkedin.com/in/mahmodur-rahman-sajib/",
  accentColor: "#e30613",
  backgroundColor: "#f7f7f5",
  fontFamily: "sans",
};

const keys = {
  projects: "portfolio.projects",
  achievements: "portfolio.achievements",
  settings: "portfolio.settings",
  auth: "portfolio.admin-auth",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("portfolio-data-updated", { detail: key }));
}

export function getProjects() {
  return read<Project[]>(keys.projects, []);
}

export function getAchievements() {
  return read<Achievement[]>(keys.achievements, []);
}

export function getSiteSettings() {
  return { ...defaultSiteSettings, ...read<Partial<SiteSettings>>(keys.settings, {}) };
}

export function saveSiteSettings(settings: SiteSettings) {
  write(keys.settings, settings);
}

export function isLocalAdmin() {
  return read<boolean>(keys.auth, false);
}

export function localLogin(email: string, password: string) {
  const valid = email.trim().toLowerCase() === "sajibmr2005@gmail.com" && password === "12345678";
  if (valid) write(keys.auth, true);
  return valid;
}

export function localLogout() {
  write(keys.auth, false);
}

function id() {
  return crypto.randomUUID();
}

export function saveProject(input: ProjectInput, projectId?: string) {
  const projects = getProjects();
  const project = { ...input, id: projectId ?? id(), updatedAt: new Date(), createdAt: new Date() } as unknown as Project;
  write(keys.projects, projectId ? projects.map((item) => item.id === projectId ? project : item) : [...projects, project]);
}

export function deleteLocalProject(projectId: string) {
  write(keys.projects, getProjects().filter((item) => item.id !== projectId));
}

export function saveAchievement(input: AchievementInput, achievementId?: string) {
  const achievements = getAchievements();
  const achievement = { ...input, id: achievementId ?? id(), updatedAt: new Date(), createdAt: new Date() } as unknown as Achievement;
  write(keys.achievements, achievementId ? achievements.map((item) => item.id === achievementId ? achievement : item) : [...achievements, achievement]);
}

export function deleteLocalAchievement(achievementId: string) {
  write(keys.achievements, getAchievements().filter((item) => item.id !== achievementId));
}

export function subscribeToLocalData(onUpdate: () => void) {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener("portfolio-data-updated", onUpdate);
  return () => window.removeEventListener("portfolio-data-updated", onUpdate);
}
