import { useRef } from "react";
import { Play } from "lucide-react";
import type { GalleryShot } from "@/lib/gallery";

export default function GalleryTile({
  shot,
  span,
  onOpen,
}: {
  shot: GalleryShot;
  span?: string | undefined;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = shot.type === "video";

  return (
    <figure className={`tile ${span ?? shot.span ?? ""}`}>
      <button
        type="button"
        className="tile-btn lift-card"
        onClick={onOpen}
        aria-label={`View ${shot.alt}`}
        onMouseEnter={() => {
          if (isVideo) videoRef.current?.play().catch(() => {});
        }}
        onMouseLeave={() => {
          const v = videoRef.current;
          if (isVideo && v) {
            v.pause();
            v.currentTime = 0;
          }
        }}
      >
        {isVideo ? (
          <video ref={videoRef} src={shot.src} muted loop playsInline preload="metadata" />
        ) : (
          <img src={shot.src} alt={shot.alt} loading="lazy" />
        )}
        {isVideo && (
          <span className="tile-play" aria-hidden="true">
            <Play size={15} />
          </span>
        )}
        <figcaption className="tile-caption">
          <span className="tile-tag">{shot.category}</span>
          {shot.alt}
        </figcaption>
      </button>
    </figure>
  );
}
