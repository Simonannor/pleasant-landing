import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryShot } from "@/lib/gallery";

export default function GalleryLightbox({
  shots,
  index,
  onClose,
  onStep,
}: {
  shots: GalleryShot[];
  index: number | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onStep]);

  if (index === null) return null;
  const current = shots[index];
  if (!current) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
    >
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="lightbox-close"
          aria-label="Close gallery"
          onClick={onClose}
        >
          <X />
        </button>
        {current.type === "video" ? (
          <video src={current.src} controls autoPlay muted playsInline />
        ) : (
          <img src={current.src} alt={current.alt} />
        )}
        <div className="lightbox-bar">
          <span className="tile-tag">{current.category}</span>
          <p>{current.alt}</p>
          <div className="lightbox-nav">
            <button type="button" aria-label="Previous photo" onClick={() => onStep(-1)}>
              <ChevronLeft />
            </button>
            <span>
              {index + 1} / {shots.length}
            </span>
            <button type="button" aria-label="Next photo" onClick={() => onStep(1)}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
