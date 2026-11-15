import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImagePlus, X } from "lucide-react";
import bible from "@/assets/open-bible.jpg";

type Category = "Sunday Worship" | "Community" | "Events";

type Shot = {
  src: string | null;
  alt: string;
  category: Category;
  /** Bento span classes, applied only in the unfiltered "All" view. */
  span?: string;
};

// Placeholder lineup — swap these entries for the real church-life photos when
// they are provided; each entry only needs a src, alt, and category.
const SHOTS: Shot[] = [
  {
    src: bible,
    alt: "An open Bible illuminated by warm sunlight",
    category: "Sunday Worship",
    span: "tile-lg",
  },
  {
    src: null,
    alt: "Sunday worship gathering",
    category: "Sunday Worship",
    span: "tile-tall",
  },
  { src: null, alt: "Community outreach in Accra", category: "Community" },
  { src: null, alt: "Sunday school moment", category: "Community", span: "tile-wide" },
  { src: null, alt: "Night of prayer", category: "Events" },
  { src: null, alt: "Choir rehearsal", category: "Events", span: "tile-wide" },
];

const FILTERS = ["All", "Sunday Worship", "Community", "Events"] as const;

export default function GallerySection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = SHOTS.filter((s) => filter === "All" || s.category === filter);
  const viewable = visible.filter((s) => s.src);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((i) => {
        if (i === null || viewable.length === 0) return null;
        return (i + dir + viewable.length) % viewable.length;
      });
    },
    [viewable.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  const current = lightbox !== null ? viewable[lightbox] : undefined;

  return (
    <section id="gallery" className="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="gallery-head reveal">
          <div className="eyebrow">Church life</div>
          <h2 id="gallery-title">
            Moments that
            <br />
            <em>make us family.</em>
          </h2>
          <div className="gallery-filters" role="tablist" aria-label="Filter photos">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                className={`filter-pill${filter === f ? " is-active" : ""}`}
                onClick={() => {
                  setFilter(f);
                  setLightbox(null);
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className={`bento${filter === "All" ? "" : " bento-flat"}`}>
          {visible.map((shot, i) => (
            <figure key={shot.alt} className={`tile ${shot.span ?? ""}`}>
              {shot.src ? (
                <button
                  type="button"
                  className="tile-btn"
                  onClick={() => setLightbox(viewable.indexOf(shot))}
                  aria-label={`View ${shot.alt}`}
                >
                  <img src={shot.src} alt={shot.alt} loading="lazy" />
                  <figcaption className="tile-caption">
                    <span className="tile-tag">{shot.category}</span>
                    {shot.alt}
                  </figcaption>
                </button>
              ) : (
                <div className="tile-soon" aria-hidden="true">
                  <ImagePlus size={22} />
                  <span>Photo coming soon</span>
                  <small>{shot.alt}</small>
                </div>
              )}
            </figure>
          ))}
        </div>
      </div>
      {current?.src && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close gallery"
              onClick={close}
            >
              <X />
            </button>
            <img src={current.src} alt={current.alt} />
            <div className="lightbox-bar">
              <span className="tile-tag">{current.category}</span>
              <p>{current.alt}</p>
              <div className="lightbox-nav">
                <button type="button" aria-label="Previous photo" onClick={() => step(-1)}>
                  <ChevronLeft />
                </button>
                <span>
                  {(lightbox ?? 0) + 1} / {viewable.length}
                </span>
                <button type="button" aria-label="Next photo" onClick={() => step(1)}>
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
