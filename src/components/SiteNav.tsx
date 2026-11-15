import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { church, navLinks } from "@/lib/church";
import shield from "@/assets/chapel-shield.png";
import logoFallback from "@/assets/chuech logo.jpg";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav-shell${scrolled ? " is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#home" className="nav-brand" aria-label={`${church.name} home`}>
          <img
            className="nav-shield"
            src={shield}
            alt=""
            width={46}
            height={46}
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset["fb"]) {
                img.dataset["fb"] = "1";
                img.src = logoFallback;
              }
            }}
          />
          <span className="brand-name">
            Pleasant Springs
            <br />
            Chapel<small>Faith · Family · Purpose</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((l) => (
            <a key={l.href} className="nav-link" href={l.href}>
              {l.label}
            </a>
          ))}
          <Button variant="chapel" asChild className="nav-cta">
            <a href="#visit">
              Plan your visit <ArrowUpRight />
            </a>
          </Button>
        </nav>
        <Button
          className="mobile-menu-toggle"
          variant="chapelIcon"
          size="icon"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <div className="nav-drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="nav-drawer-scrim" onClick={() => setOpen(false)} />
          <nav className="nav-drawer-panel" aria-label="Mobile navigation">
            <div className="nav-drawer-head">
              <img src={shield} alt="" width={40} height={40} />
              <span>{church.name}</span>
            </div>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
                <ArrowUpRight size={15} />
              </a>
            ))}
            <Button variant="chapel" asChild className="nav-drawer-cta">
              <a href="#visit" onClick={() => setOpen(false)}>
                Plan your visit <ArrowUpRight />
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
