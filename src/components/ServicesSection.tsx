import { ArrowUpRight, CalendarPlus, MapPin, Wifi } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { church, services } from "@/lib/church";

export default function ServicesSection() {
  return (
    <section id="services" className="services" aria-labelledby="services-title">
      <div className="container">
        <div className="services-head">
          <div className="eyebrow">Worship with us</div>
          <h2 id="services-title">
            A rhythm of grace.
            <br />
            <em>Come as you are.</em>
          </h2>
        </div>
        <div className="services-grid">
          {services.map((s) => (
            <article className="service-card reveal" data-delay="0" key={s.name}>
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
                {s.directions !== null && (
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
        <div className="services-cta reveal" data-delay="120">
          <Button variant="chapel" asChild>
            <Link to="/visit">
              Plan your visit <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
