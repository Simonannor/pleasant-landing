// Shared gallery source: one module for the landing-page teaser and the
// /gallery route, so captions and categories stay in sync everywhere.
import p01 from "@/assets/gallery/photo_2026-11-15_22-18-53.jpg";
import p02 from "@/assets/gallery/photo_2026-11-15_22-20-01.jpg";
import p03 from "@/assets/gallery/photo_2026-11-15_22-20-41.jpg";
import p04 from "@/assets/gallery/photo_2026-11-15_22-20-48.jpg";
import p05 from "@/assets/gallery/photo_2026-11-15_22-21-02.jpg";
import p06 from "@/assets/gallery/photo_2026-11-15_22-21-19.jpg";
import p07 from "@/assets/gallery/photo_2026-11-15_22-21-45.jpg";
import p08 from "@/assets/gallery/photo_2026-11-15_22-21-51.jpg";
import p09 from "@/assets/gallery/photo_2026-11-15_22-22-34.jpg";
import p10 from "@/assets/gallery/photo_2026-11-15_22-22-48.jpg";
import p11 from "@/assets/gallery/photo_2026-11-15_22-23-01.jpg";

export type GalleryCategory = "Sunday Worship" | "Community" | "Events";

export type GalleryShot = {
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Bento span classes, applied only in the unfiltered "All" view. */
  span?: string;
  /** Shown in the landing-page teaser. */
  featured?: boolean;
};

export const galleryShots: GalleryShot[] = [
  {
    src: p01,
    alt: "Congregants lifting their hands in worship",
    category: "Sunday Worship",
    span: "tile-tall",
    featured: true,
  },
  {
    src: p02,
    alt: "Men gathered around the Word for a study circle",
    category: "Community",
  },
  {
    src: p03,
    alt: "A study circle sharing notes and laughter",
    category: "Community",
    span: "tile-wide",
    featured: true,
  },
  {
    src: p04,
    alt: "Leaders and elders gathered in a family meeting",
    category: "Community",
  },
  {
    src: p05,
    alt: "The congregation gathered for Sunday worship",
    category: "Sunday Worship",
    span: "tile-lg",
    featured: true,
  },
  {
    src: p06,
    alt: "Sunday service in the main hall",
    category: "Sunday Worship",
  },
  {
    src: p07,
    alt: "Celebrating a milestone with thanksgiving and cake",
    category: "Events",
  },
  {
    src: p08,
    alt: "Families sharing a joyful church celebration",
    category: "Events",
    span: "tile-lg",
  },
  {
    src: p09,
    alt: "The church family dining together under the canopy",
    category: "Events",
    span: "tile-tall",
  },
  {
    src: p10,
    alt: "Joy and laughter at a church celebration",
    category: "Events",
    span: "tile-wide",
    featured: true,
  },
  {
    src: p11,
    alt: "Members gathered around the table at a church celebration",
    category: "Events",
  },
];

export const featuredShots = galleryShots.filter((s) => s.featured);

export const galleryFilters = ["All", "Sunday Worship", "Community", "Events"] as const;
export type GalleryFilter = (typeof galleryFilters)[number];
