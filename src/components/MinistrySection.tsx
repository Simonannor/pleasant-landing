import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import bible from "@/assets/open-bible.jpg";

export default function MinistrySection() {
  return (
    <section id="ministry" className="ministry reveal" data-reveal="zoom">
      <div className="ministry-photo">
        <img
          src={bible}
          alt="An open Bible illuminated by warm sunlight"
          width={1536}
          height={1024}
          loading="lazy"
        />
      </div>
      <div className="ministry-content">
        <div className="eyebrow">Grow deeper. Go further.</div>
        <h2>
          The Father’s Heart
          <br />
          School of Ministry
        </h2>
        <p className="body-copy">
          A heart for God. A life of purpose. Pleasant Springs Chapel is the current home of The
          Father’s Heart School of Ministry.
        </p>
        <p className="body-copy mt-4">
          Discover a community committed to spiritual growth and a life of service.
        </p>
        <Link className="text-link" to="/visit">
          Connect with us at the chapel <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
