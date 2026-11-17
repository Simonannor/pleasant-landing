import {
  ArrowUpRight,
  Clock3,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import type { ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import { church, contact, navLinks, services, socials } from "@/lib/church";
import shield from "@/assets/chapel-shield.webp";

// Lucide ships no TikTok brand glyph — small inline icon fills the gap.
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.09 1.53.63 3.09 1.75 4.17 1.12 1.08 2.68 1.64 4.24 1.72v4.03c-1.44-.05-2.89-.28-4.24-.79-.55-.19-1.09-.42-1.62-.68v6.6c0 3.51-2.24 6.68-5.61 7.87-3.37 1.19-7.16.45-9.83-1.97-2.66-2.42-3.71-6.23-2.72-9.79.99-3.56 3.88-6.29 7.53-6.99.87-.16 1.74-.21 2.61-.14v4.19c-.31-.04-.63-.07-.94-.07-1.6.03-3.14.78-4.16 2.07a5.35 5.35 0 0 0-1.02 4.62c.38 1.63 1.53 2.98 3.09 3.62 1.56.64 3.35.47 4.77-.42 1.42-.89 2.29-2.45 2.3-4.14V.02z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  Facebook,
  Instagram,
  TikTok: TikTokIcon,
};

export default function SiteFooter() {
  return (
    <footer className="site-footer reveal" data-reveal="fade-up" aria-label="Footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand reveal" data-reveal="slide-left" data-delay="100">
            <img src={shield} alt={`${church.name} shield emblem`} width={72} height={72} />
            <div className="footer-name">{church.name}</div>
            <p className="footer-mission">{church.mission}</p>
            <div className="social-row">
              {socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.label];
                if (!Icon) return null;
                return (
                  <a
                    key={s.label}
                    className="social-btn"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${church.name} on ${s.label}`}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="footer-col reveal" data-reveal="fade-up" data-delay="200">
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
          <div className="footer-col reveal" data-reveal="fade-up" data-delay="300">
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
          <div className="footer-col reveal" data-reveal="fade-up" data-delay="400">
            <div className="footer-heading">Visit</div>
            <p className="footer-visit">
              <MapPin size={12} aria-hidden="true" />
              <span>
                {church.location}
                <br />
                {church.venue}
              </span>
            </p>
            <div className="footer-contact">
              <a href={contact.phoneHref}>
                <Phone size={13} aria-hidden="true" /> {contact.phone}
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle size={13} aria-hidden="true" /> WhatsApp
              </a>
            </div>
            <a className="text-link" href={church.directions} target="_blank" rel="noreferrer">
              Get directions <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom reveal" data-reveal="fade-up" data-delay="500">
          <span>© 2026 {church.name}. All rights reserved.</span>
          <span>Achimota Mile 7 · Accra, Ghana</span>
          <span>Built on faith. Bound by love.</span>
        </div>
      </div>
    </footer>
  );
}
