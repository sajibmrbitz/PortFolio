"use client";

import { useEffect } from "react";
import { getSiteSettings, subscribeToLocalData } from "@/lib/local-data";

export default function SiteSettingsApplier() {
  useEffect(() => {
    const apply = () => {
      const settings = getSiteSettings();
      const root = document.documentElement;
      root.style.setProperty("--accent", settings.accentColor);
      root.style.setProperty("--accent-hover", settings.accentColor);
      // Keep the light/dark surface tokens owned by the theme stylesheet.
      // Writing --bg-primary inline here would override [data-theme="dark"]
      // and leave the page canvas light while cards switch to dark colors.
      root.style.setProperty("--site-background-light", settings.backgroundColor);
      root.style.setProperty(
        "--font-sans",
        settings.fontFamily === "serif"
          ? "Georgia, serif"
          : settings.fontFamily === "mono"
            ? "monospace"
            : "Inter, system-ui, sans-serif",
      );
    };
    apply();
    return subscribeToLocalData(apply);
  }, []);

  return null;
}
