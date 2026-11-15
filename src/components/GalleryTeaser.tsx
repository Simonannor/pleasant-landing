import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import GalleryLightbox from "@/components/GalleryLightbox";
import { featuredShots } from "@/lib/gallery";

export default function GalleryTeaser() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const step = (dir: 1 | -1) => {
    setLightbox((i) => {
      if (i === null) return null;
      return (i + dir + featuredShots.length) % featuredShots.length;
    });
  };

  return (
    <section id="gallery" className="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="gallery-head reveal">
          <div>
            <div className="eyebrow">Church life</div>
            <h2 id="gallery-title">
              Moments that
              <br />
              <em>make us family.</em>
            </h2>
          </div>
          <Button variant="chapel" asChild>
            <Link to="/gallery">
              See gallery <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <div className="bento">
          {featuredShots.map((shot) => (
            <figure key={shot.alt} className={`tile ${shot.span ?? ""}`}>
              <button
                type="button"
                className="tile-btn"
                onClick={() => setLightbox(featuredShots.indexOf(shot))}
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
      </div>
      <GalleryLightbox
        shots={featuredShots}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onStep={step}
      />
    </section>
  );
}
