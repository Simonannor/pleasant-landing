import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import bible from "@/assets/open-bible.jpg";

export default function MinistrySection() {
  return (
    <section id="ministry" className="ministry reveal" data-reveal="fade-up">
      <div className="ministry-photo reveal" data-reveal="slide-right" data-delay="100">
          <img
            src={bible}
            alt="An open Bible illuminated by warm sunlight"
            width={1536}
            height={1024}
            loading="lazy"
          />
        </div>
        <div className="ministry-content reveal" data-reveal="slide-left" data-delay="250">
          <div className="eyebrow">Grow deeper. Go further.</div>
          <h2 className="text-reveal" data-reveal="fade-up" data-delay="400">
            The Father’s Heart
            <br />
            <span>School of Ministry</span>
          </h2>
          <p className="body-copy reveal" data-reveal="fade-up" data-delay="550">
            A heart for God. A life of purpose. Pleasant Springs Chapel is the current home of The
            Father’s Heart School of Ministry.
          </p>
          <p className="body-copy mt-4 reveal" data-reveal="fade-up" data-delay="650">
            Discover a community committed to spiritual growth and a life of service.
          </p>
          <Link className="text-link gold-underline reveal" data-reveal="fade-up" data-delay="750" to="/visit">
            Connect with us at the chapel <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
  );
}
