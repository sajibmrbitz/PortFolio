import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import type { Achievement, AchievementInput, Project, ProjectInput } from "@/types";
import {
  deleteLocalAchievement,
  deleteLocalProject,
  getAchievements,
  getProjects,
  saveAchievement,
  saveProject,
  subscribeToLocalData,
} from "@/lib/local-data";

export function subscribeToProjects(onData: (projects: Project[]) => void, onError?: (error: Error) => void) {
  if (isFirebaseConfigured) {
    return onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const projects = snapshot.docs
          .map((item) => ({ id: item.id, ...item.data() }) as Project)
          .sort((a, b) => a.order - b.order);
        onData(projects);
      },
      (error) => onError?.(error),
    );
  }
  const update = () => onData(getProjects());
  try { update(); return subscribeToLocalData(update); }
  catch (error) { onError?.(error as Error); return () => undefined; }
}

export function subscribeToAchievements(onData: (achievements: Achievement[]) => void, onError?: (error: Error) => void) {
  if (isFirebaseConfigured) {
    return onSnapshot(
      collection(db, "achievements"),
      (snapshot) => {
        const achievements = snapshot.docs
          .map((item) => ({ id: item.id, ...item.data() }) as Achievement)
          .sort((a, b) => b.year - a.year);
        onData(achievements);
      },
      (error) => onError?.(error),
    );
  }
  const update = () => onData(getAchievements());
  try { update(); return subscribeToLocalData(update); }
  catch (error) { onError?.(error as Error); return () => undefined; }
}

export async function createProject(input: ProjectInput) {
  if (isFirebaseConfigured) {
    await addDoc(collection(db, "projects"), { ...input, createdAt: new Date(), updatedAt: new Date() });
    return;
  }
  saveProject(input);
}

export async function updateProject(id: string, input: ProjectInput) {
  if (isFirebaseConfigured) {
    await updateDoc(doc(db, "projects", id), { ...input, updatedAt: new Date() });
    return;
  }
  saveProject(input, id);
}

export async function removeProject(id: string) {
  if (isFirebaseConfigured) {
    await deleteDoc(doc(db, "projects", id));
    return;
  }
  deleteLocalProject(id);
}

export async function createAchievement(input: AchievementInput) {
  if (isFirebaseConfigured) {
    await addDoc(collection(db, "achievements"), { ...input, createdAt: new Date(), updatedAt: new Date() });
    return;
  }
  saveAchievement(input);
}

export async function updateAchievement(id: string, input: AchievementInput) {
  if (isFirebaseConfigured) {
    await updateDoc(doc(db, "achievements", id), { ...input, updatedAt: new Date() });
    return;
  }
  saveAchievement(input, id);
}

export async function removeAchievement(id: string) {
  if (isFirebaseConfigured) {
    await deleteDoc(doc(db, "achievements", id));
    return;
  }
  deleteLocalAchievement(id);
}
