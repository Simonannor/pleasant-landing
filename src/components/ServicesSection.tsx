import { ArrowUpRight, CalendarPlus, MapPin, Wifi } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { church, services } from "@/lib/church";

export default function ServicesSection() {
  return (
    <section id="services" className="services reveal" data-reveal="fade-up">
      <div className="container">
        <div className="services-head reveal" data-reveal="slide-left" data-delay="100">
          <div className="eyebrow">Worship with us</div>
          <h2 id="services-title">
            A rhythm of grace.
            <br />
            <em>Come as you are.</em>
          </h2>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <article
              className="service-card reveal lift-card"
              data-reveal="zoom"
              data-parallax="0.25"
              data-delay={i * 120}
              key={s.name}
            >
              <span className="service-pill">{s.day}</span>
              <h3 className="service-name">{s.name}</h3>
              <div className="service-time">{s.time}</div>
              <p className="service-desc">{s.description}</p>
              <div className="service-meta">
                {s.directions === null ? (
                  <Wifi size={12} aria-hidden="true" />
                ) : (
                  <MapPin size={12} aria-hidden="true" />
                )}
                {s.location}
              </div>
              <div className="service-links">
                {s.calendar && (
                  <a className="text-link" href={s.calendar} target="_blank" rel="noreferrer">
                    Add to calendar <CalendarPlus size={14} />
                  </a>
                )}
                {s.meetingLink && (
                  <a
                    className="text-link"
                    href={s.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Join meeting <ArrowUpRight size={14} />
                  </a>
                )}
                {s.directions !== null && !s.meetingLink && (
                  <a
                    className="text-link"
                    href={s.directions ?? church.directions}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get directions <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="services-cta reveal" data-reveal="fade-up" data-delay="500">
          <Button variant="chapel" asChild className="magnetic">
            <Link to="/visit">
              Plan your visit <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
