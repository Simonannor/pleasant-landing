import { ArrowUpRight, Clock3, Facebook, Instagram, MapPin, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { church, navLinks, services } from "@/lib/church";
import shield from "@/assets/chapel-shield.png";

const SOCIALS = [
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={shield} alt={`${church.name} shield emblem`} width={72} height={72} />
            <div className="footer-name">{church.name}</div>
            <p className="footer-mission">{church.mission}</p>
            <div className="social-row">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  className="social-btn"
                  href={s.href}
                  aria-label={`${church.name} on ${s.label}`}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-heading">Explore</div>
            {navLinks.map((l) => (
              <Link key={l.href} className="footer-link" to={l.href}>
                {l.label}
              </Link>
            ))}
            <Link className="footer-link" to="/visit">
              Plan your visit
            </Link>
          </div>
          <div className="footer-col">
            <div className="footer-heading">Gather with us</div>
            {services.map((s) => (
              <div className="footer-service" key={s.name}>
                <span>{s.name}</span>
                <strong>
                  <Clock3 size={11} aria-hidden="true" /> {s.time}
                </strong>
              </div>
            ))}
          </div>
          <div className="footer-col">
            <div className="footer-heading">Visit</div>
            <p className="footer-visit">
              <MapPin size={12} aria-hidden="true" />
              <span>
                {church.location}
                <br />
                {church.venue}
              </span>
            </p>
            <a className="text-link" href={church.directions} target="_blank" rel="noreferrer">
              Get directions <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {church.name}. All rights reserved.</span>
          <span>Achimota Mile 7 · Accra, Ghana</span>
          <span>Built on faith. Bound by love.</span>
        </div>
      </div>
    </footer>
  );
}
