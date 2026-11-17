import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import GalleryLightbox from "@/components/GalleryLightbox";
import GalleryTile from "@/components/GalleryTile";
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
    <section id="gallery" className="gallery reveal" data-reveal="fade-up" aria-labelledby="gallery-title">
      <div className="container">
        <div className="gallery-head reveal" data-reveal="slide-left" data-delay="100">
          <div>
            <div className="eyebrow">Church life</div>
            <h2 id="gallery-title">
              Moments that
              <br />
              <em>make us family.</em>
            </h2>
          </div>
          <Button variant="chapel" asChild className="magnetic reveal" data-reveal="zoom" data-delay="250">
            <Link to="/gallery">
              See gallery <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <div className="bento reveal" data-stagger data-reveal="zoom" data-delay="400">
          {featuredShots.map((shot, i) => (
            <GalleryTile
              key={shot.src}
              shot={shot}
              onOpen={() => setLightbox(featuredShots.indexOf(shot))}
            />
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
