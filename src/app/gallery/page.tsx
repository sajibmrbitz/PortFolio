"use client";

import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

// Placeholder data — will be replaced with Cloudinary + Firestore data
const galleryImages = [
  {
    id: "1",
    title: "Campus Sunset",
    caption: "Beautiful sunset at the university campus",
    category: "Nature",
    aspectRatio: "landscape" as const,
  },
  {
    id: "2",
    title: "Hackathon 2026",
    caption: "Winning team at the inter-university hackathon",
    category: "Events",
    aspectRatio: "landscape" as const,
  },
  {
    id: "3",
    title: "Code & Coffee",
    caption: "Late night coding session",
    category: "Dev Life",
    aspectRatio: "portrait" as const,
  },
  {
    id: "4",
    title: "Workshop Speaker",
    caption: "Speaking at the web development workshop",
    category: "Events",
    aspectRatio: "landscape" as const,
  },
  {
    id: "5",
    title: "Team Photo",
    caption: "With the development team",
    category: "People",
    aspectRatio: "landscape" as const,
  },
  {
    id: "6",
    title: "Setup",
    caption: "My development workspace",
    category: "Dev Life",
    aspectRatio: "portrait" as const,
  },
  {
    id: "7",
    title: "Conference Badge",
    caption: "Attending the dev conference",
    category: "Events",
    aspectRatio: "square" as const,
  },
  {
    id: "8",
    title: "Mountain View",
    caption: "Weekend trip to the mountains",
    category: "Nature",
    aspectRatio: "landscape" as const,
  },
  {
    id: "9",
    title: "Project Demo",
    caption: "",
    category: "Dev Life",
    aspectRatio: "landscape" as const,
  },
];

const categories = ["All", ...Array.from(new Set(galleryImages.map((img) => img.category)))];

const aspectClasses = {
  landscape: "aspect-video",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

// Gradient colors for placeholder thumbnails
const gradients = [
  "from-emerald-900/40 to-stone-900",
  "from-amber-900/40 to-stone-900",
  "from-sky-900/40 to-stone-900",
  "from-rose-900/40 to-stone-900",
  "from-violet-900/40 to-stone-900",
  "from-teal-900/40 to-stone-900",
  "from-orange-900/40 to-stone-900",
  "from-cyan-900/40 to-stone-900",
  "from-indigo-900/40 to-stone-900",
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<(typeof galleryImages)[0] | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-12">
          <h1 className="heading-serif text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
            Gallery
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            Capturing moments, achievements, and the journey — a visual diary of
            my experiences.
          </p>
        </div>

        {/* ── Category Filters ── */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ── Masonry Grid ── */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setLightboxImage(image)}
            >
              <div
                className={`relative ${aspectClasses[image.aspectRatio]} rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:shadow-xl transition-all duration-300`}
              >
                {/* Placeholder gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center`}
                >
                  <span className="text-[var(--text-muted)] text-sm">
                    {image.title}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    <ZoomIn className="w-8 h-8 text-white mx-auto mb-2" />
                    <p className="text-sm font-medium text-white">
                      {image.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Caption below image */}
              <p className="text-xs text-[var(--text-muted)] mt-2 px-1">
                {image.caption}
              </p>
            </div>
          ))}
        </div>

        {/* ── Empty State ── */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted)] text-lg">
              No images in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* ── Lightbox Modal ── */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div
            className="max-w-4xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative ${aspectClasses[lightboxImage.aspectRatio]} rounded-xl overflow-hidden`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[galleryImages.indexOf(lightboxImage) % gradients.length]} flex items-center justify-center`}
              >
                <span className="text-white/60 text-lg">
                  {lightboxImage.title}
                </span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-white">
                {lightboxImage.title}
              </h3>
              {lightboxImage.caption && (
                <p className="text-sm text-white/60 mt-1">
                  {lightboxImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

