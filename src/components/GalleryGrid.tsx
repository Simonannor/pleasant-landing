import { useCallback, useState } from "react";
import GalleryLightbox from "@/components/GalleryLightbox";
import { galleryFilters, galleryShots, type GalleryFilter } from "@/lib/gallery";

export default function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryFilter>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = galleryShots.filter((s) => filter === "All" || s.category === filter);

  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((i) => {
        if (i === null || visible.length === 0) return null;
        return (i + dir + visible.length) % visible.length;
      });
    },
    [visible.length],
  );

  return (
    <>
      <div className="gallery-filters" role="tablist" aria-label="Filter photos">
        {galleryFilters.map((f) => (
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
      <div className={`bento${filter === "All" ? "" : " bento-flat"}`}>
        {visible.map((shot) => (
          <figure key={shot.alt} className={`tile ${filter === "All" ? (shot.span ?? "") : ""}`}>
            <button
              type="button"
              className="tile-btn"
              onClick={() => setLightbox(visible.indexOf(shot))}
              aria-label={`View ${shot.alt}`}
            >
              <img src={shot.src} alt={shot.alt} loading="lazy" />
              <figcaption className="tile-caption">
                <span className="tile-tag">{shot.category}</span>
                {shot.alt}
              </figcaption>
            </button>
          </figure>
        ))}
      </div>
      <GalleryLightbox
        shots={visible}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onStep={step}
      />
    </>
  );
}
