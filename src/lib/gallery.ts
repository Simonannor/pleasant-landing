// Shared gallery source: one module for the landing-page teaser and the
// /gallery route, so captions and categories stay in sync everywhere.
//
// AUTO-IMPORT — two tiers:
//   src/assets/gallery/**        → the /gallery route (global collection)
//   src/assets/gallery/preview/  → also featured on the landing-page teaser
// Drop a file anywhere in either folder and it is picked up automatically
// (instant in dev; included in the next production build). Give a new file a
// caption/category/bento-span by adding its filename to CAPTIONS below.
const modules = import.meta.glob<{ default: string }>(
  "../assets/gallery/**/*.{jpg,jpeg,png,webp,avif,gif,mp4,MP4,mov,MOV,webm,WEBM,m4v,M4V}",
  { eager: true },
);

export type GalleryCategory = "Sunday Worship" | "Community" | "Events";

export type GalleryShot = {
  src: string;
  type: "image" | "video";
  alt: string;
  category: GalleryCategory;
  /** Bento span classes, applied only in the unfiltered "All" view. */
  span?: string;
  /** Shown in the landing-page teaser (automatic for preview/ files). */
  featured?: boolean;
};

// Curated captions keyed by original filename.
const CAPTIONS: Record<
  string,
  { alt: string; category: GalleryCategory; span?: string; featured?: boolean }
> = {
  "photo_2026-11-15_22-18-53.jpg": {
    alt: "Congregants lifting their hands in worship",
    category: "Sunday Worship",
    span: "tile-tall",
  },
  "photo_2026-11-15_22-20-01.jpg": {
    alt: "Men gathered around the Word for a study circle",
    category: "Community",
  },
  "photo_2026-11-15_22-20-41.jpg": {
    alt: "A study circle sharing notes and laughter",
    category: "Community",
    span: "tile-wide",
  },
  "photo_2026-11-15_22-20-48.jpg": {
    alt: "Leaders and elders gathered in a family meeting",
    category: "Community",
  },
  "photo_2026-11-15_22-21-02.jpg": {
    alt: "The congregation gathered for Sunday worship",
    category: "Sunday Worship",
    span: "tile-lg",
  },
  "photo_2026-11-15_22-21-19.jpg": {
    alt: "Sunday service in the main hall",
    category: "Sunday Worship",
  },
  "photo_2026-11-15_22-21-45.jpg": {
    alt: "Celebrating a milestone with thanksgiving and cake",
    category: "Events",
  },
  "photo_2026-11-15_22-21-51.jpg": {
    alt: "Families sharing a joyful church celebration",
    category: "Events",
    span: "tile-lg",
  },
  "photo_2026-11-15_22-22-34.jpg": {
    alt: "The church family dining together under the canopy",
    category: "Events",
    span: "tile-tall",
  },
  "photo_2026-11-15_22-22-48.jpg": {
    alt: "Joy and laughter at a church celebration",
    category: "Events",
    span: "tile-wide",
  },
  "photo_2026-11-15_22-23-01.jpg": {
    alt: "Members gathered around the table at a church celebration",
    category: "Events",
  },
  "chapel-glimpse.mp4": {
    alt: "A glimpse of our chapel",
    category: "Events",
  },
  // Landing-page preview shots (src/assets/gallery/preview/)
  "worship-banner.jpg": {
    alt: "The congregation worshipping under the theme banner",
    category: "Sunday Worship",
    span: "tile-lg",
  },
  "baby-dedication.jpg": {
    alt: "A family presenting their child for dedication",
    category: "Events",
    span: "tile-tall",
  },
  "praying-women.jpg": {
    alt: "Women holding hands in prayer during service",
    category: "Sunday Worship",
    span: "tile-half",
  },
  "praying-brethren.jpg": {
    alt: "Members praying together in the chapel",
    category: "Sunday Worship",
    span: "tile-half",
  },
  "covenant-prayer.jpg": {
    alt: "Two brethren holding hands in prayer",
    category: "Sunday Worship",
    span: "tile-half",
  },
};

const isVideo = (src: string) => /\.(mp4|mov|webm|m4v)$/i.test(src);

type FileEntry = { name: string; path: string; src: string };

const files: FileEntry[] = Object.entries(modules).map(([path, mod]) => ({
  name: path.split("/").pop() ?? path,
  path,
  src: mod.default,
}));

const build = (file: FileEntry): GalleryShot => {
  const meta = CAPTIONS[file.name];
  const featured = meta?.featured ?? file.path.includes("/preview/");
  return {
    src: file.src,
    type: isVideo(file.src) ? "video" : "image",
    alt: meta?.alt ?? "A moment from church life",
    category: meta?.category ?? "Events",
    ...(meta?.span ? { span: meta.span } : {}),
    ...(featured ? { featured: true } : {}),
  };
};

const byName = new Map(files.map((f) => [f.name, f]));

export const galleryShots: GalleryShot[] = [
  // Curated shots first, in manifest order…
  ...Object.keys(CAPTIONS)
    .map((name) => byName.get(name))
    .filter((f): f is FileEntry => Boolean(f))
    .map(build),
  // …then any newly dropped files, sorted by path.
  ...files
    .filter((f) => !(f.name in CAPTIONS))
    .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))
    .map(build),
];

export const featuredShots = galleryShots.filter((s) => s.featured);

export const galleryFilters = ["All", "Sunday Worship", "Community", "Events"] as const;
export type GalleryFilter = (typeof galleryFilters)[number];
