import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  MapPin,
  Clock3,
  CalendarDays,
  Heart,
  Cross,
  Users,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { church } from "@/lib/church";
import logo from "@/assets/chapel-logo.png.asset.json";
import film from "@/assets/chapel-film.webm.asset.json";
import filmMp4 from "@/assets/chapel-film.mp4.asset.json";
import localFilm from "@/assets/video_2026-10-10_16-07-52.mp4";
import localLogo from "@/assets/chuech logo.jpg";
import bible from "@/assets/open-bible.jpg";
import ChapelIntro from "@/components/ChapelIntro";
const SacredScene = lazy(() => import("@/components/SacredScene"));

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Pleasant Springs Chapel | Faith, Family & Purpose in Accra" },
      {
        name: "description",
        content:
          "Pleasing God, Serving Our Generation. Join Pleasant Springs Chapel at Achimota Mile 7, Accra, every Sunday at 8:30 AM.",
      },
      { property: "og:title", content: "Pleasant Springs Chapel | Faith, Family & Purpose" },
      {
        property: "og:description",
        content:
          "A vibrant Christian community in Accra. Join us Sundays at 8:30 AM at Achimota Mile 7, on the premises of Kaspong Ltd.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Brand() {
  const brandSrc = import.meta.env.DEV ? localLogo : logo.url;
  return (
    <a href="#home" className="brand" aria-label="Pleasant Springs Chapel home">
      <img
        src={brandSrc}
        onError={(e) => {
          const img = e.currentTarget;
          if (!img.dataset["fb"]) {
            img.dataset["fb"] = "1";
            img.src = localLogo;
          }
        }}
        alt="Pleasant Springs Chapel logo"
        width={58}
        height={58}
      />
      <div className="brand-name">
        Pleasant Springs
        <br />
        Chapel<small>Faith · Family · Purpose</small>
      </div>
    </a>
  );
}

function Index() {
  const [menu, setMenu] = useState(false);
  const [watch, setWatch] = useState(false);
  const [intro, setIntro] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (intro) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      const delay = (el as HTMLElement).dataset["delay"];
      if (delay) (el as HTMLElement).style.transitionDelay = `${delay}ms`;
      observer.observe(el);
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => observer.disconnect();
    }
    const hero = heroRef.current;
    const ministry = document.querySelector<HTMLElement>(".ministry");
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        }
        if (hero) {
          const h = hero.offsetHeight || 1;
          const t = Math.min(1, Math.max(0, y / h));
          hero.style.setProperty("--hero-rise", `${t * -64}px`);
          hero.style.setProperty("--hero-fade", `${1 - t * 0.6}`);
          hero.style.setProperty("--scene-drift", `${t * 110}px`);
        }
        if (ministry) {
          const r = ministry.getBoundingClientRect();
          const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          const clamped = Math.max(-1, Math.min(1, p));
          ministry.style.setProperty("--photo-drift", `${clamped * -46}px`);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const cleanups: Array<() => void> = [];
    if (window.matchMedia("(pointer: fine)").matches) {
      if (hero) {
        const onMove = (e: PointerEvent) => {
          const r = hero.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          hero.style.setProperty("--mx", `${x * 24}px`);
          hero.style.setProperty("--my", `${y * 18}px`);
        };
        const onLeave = () => {
          hero.style.setProperty("--mx", "0px");
          hero.style.setProperty("--my", "0px");
        };
        hero.addEventListener("pointermove", onMove);
        hero.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          hero.removeEventListener("pointermove", onMove);
          hero.removeEventListener("pointerleave", onLeave);
        });
      }
      document.querySelectorAll<HTMLElement>(".chapel-button").forEach((el) => {
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${(x / r.width) * 12}px, ${(y / r.height) * 10 - 3}px)`;
        };
        const onLeave = () => {
          el.style.transform = "";
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });
    }
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  }, [intro]);
  useEffect(() => {
    if (!watch) return;
    const before = document.activeElement;
    const close = document.querySelector<HTMLButtonElement>(".film-close");
    close?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setWatch(false);
      if (e.key === "Tab") {
        const nodes = Array.from(
          document.querySelectorAll<HTMLElement>(".film-dialog button, .film-dialog video"),
        );
        const first = nodes[0];
        const last = nodes.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (before instanceof HTMLElement) before.focus();
    };
  }, [watch]);
  const nav = [
    { label: "Our story", href: "#our-story" },
    { label: "Worship with us", href: "#visit" },
    { label: "School of Ministry", href: "#ministry" },
  ];
  return (
    <div className={intro ? "page page-intro" : "page page-ready"}>
      {intro && <ChapelIntro onDone={() => setIntro(false)} />}
      <div className="scroll-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
      <div id="home" className="container">
        <header className="site-header">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map((n) => (
              <a key={n.href} className="nav-link" href={n.href}>
                {n.label}
              </a>
            ))}
            <Button variant="chapel" asChild>
              <a href="#visit">
                Plan your visit <ArrowUpRight />
              </a>
            </Button>
          </nav>
          <Button
            className="mobile-menu-toggle"
            variant="chapelIcon"
            size="icon"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
          {menu && (
            <nav className="mobile-nav" aria-label="Mobile navigation">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenu(false)}>
                  {n.label}
                </a>
              ))}
            </nav>
          )}
        </header>
        <main>
          <section ref={heroRef} className="hero" aria-labelledby="hero-title">
            <div
              className="scene"
              aria-label="Animated golden cross surrounded by sculptural rings"
            >
              <Suspense fallback={<div className="scene-fallback">✝</div>}>
                <SacredScene />
              </Suspense>
            </div>
            <div className="hero-content">
              <div className="eyebrow hero-enter">Welcome to a place of belonging</div>
              <h1 id="hero-title" className="hero-enter">
                Pleasant Springs
                <br />
                <em>Chapel.</em>
              </h1>
              <p className="hero-copy hero-enter">
                Pleasing God. Serving our generation.
                <br />A family rooted in faith, growing in love, and living with purpose.
              </p>
              <div className="hero-actions hero-enter">
                <Button variant="chapel" asChild>
                  <a href="#visit">
                    Join us this Sunday <ArrowUpRight />
                  </a>
                </Button>
                <Button variant="chapelOutline" onClick={() => setWatch(true)}>
                  <Play size={13} /> A glimpse of our chapel
                </Button>
              </div>
              <div className="hero-location">
                <MapPin size={12} /> Achimota Mile 7 · Accra, Ghana
              </div>
            </div>
            <div className="hero-index">
              01 <span /> A FAITH THAT BRINGS US TOGETHER
            </div>
            <div className="scene-caption">Rooted in Christ. Open to you.</div>
          </section>
          <section className="service-band" aria-label="Sunday service details">
            <div className="service-item reveal" data-delay="0">
              <CalendarDays />
              <div>
                <div className="small-label">Come as you are</div>
                <strong>Every Sunday</strong>
              </div>
            </div>
            <div className="service-item reveal" data-delay="90">
              <Clock3 />
              <div>
                <div className="small-label">Sunday service</div>
                <div className="service-time">{church.sundayService}</div>
              </div>
            </div>
            <div className="service-item reveal" data-delay="180">
              <MapPin />
              <div>
                <div className="small-label">Find your way home</div>
                <strong>Achimota Mile 7, Accra</strong>
              </div>
            </div>
            <a
              className="text-link reveal"
              data-delay="260"
              href={church.directions}
              target="_blank"
              rel="noreferrer"
            >
              Get directions <ArrowUpRight size={15} />
            </a>
          </section>
          <section id="our-story" className="welcome reveal">
            <div>
              <div className="section-number">02 / OUR HEART</div>
              <h2>
                More than a church.
                <br />
                <em>A family in Christ.</em>
              </h2>
            </div>
            <div className="welcome-right">
              <p className="body-copy">
                At Pleasant Springs Chapel, faith is something we live together. We are a vibrant
                Christian community in the heart of Accra, united by a simple calling: to please God
                and serve our generation.
              </p>
              <p className="body-copy mt-4">
                Whether you are taking your first step in faith or looking for a place to call home,
                there is a place for you here.
              </p>
              <div className="values">
                <span className="reveal" data-delay="0">
                  <Cross /> Rooted in faith
                </span>
                <span className="reveal" data-delay="100">
                  <Heart /> United in love
                </span>
                <span className="reveal" data-delay="200">
                  <Users /> Called to serve
                </span>
              </div>
            </div>
          </section>
        </main>
      </div>
      <div className="marquee reveal" data-reveal="fade" aria-hidden="true">
        <div className="marquee-track">
          <span>Pleasing God · Serving Our Generation · Faith · Family · Purpose ·&nbsp;</span>
          <span>Pleasing God · Serving Our Generation · Faith · Family · Purpose ·&nbsp;</span>
        </div>
      </div>
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
          <a className="text-link" href="#visit">
            Connect with us at the chapel <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
      <div className="container">
        <section id="visit" className="visit reveal">
          <div>
            <div className="section-number">03 / YOU’RE INVITED</div>
            <h2>
              Your Sunday.
              <br />
              <em>A new beginning.</em>
            </h2>
            <p className="body-copy">
              Come worship, connect, and grow with us.
              <br />
              We look forward to welcoming you.
            </p>
            <Button variant="chapel" asChild>
              <a href={church.directions} target="_blank" rel="noreferrer">
                Get directions <ArrowUpRight />
              </a>
            </Button>
          </div>
          <div className="visit-details">
            <div className="visit-row reveal" data-delay="0">
              <Clock3 />
              <div>
                <h3>Sunday worship</h3>
                <p>
                  Every Sunday at {church.sundayService}
                  <br />
                  Accra, Ghana · GMT
                </p>
              </div>
            </div>
            <div className="visit-row reveal" data-delay="100">
              <MapPin />
              <div>
                <h3>Achimota Mile 7</h3>
                <p>
                  {church.venue}
                  <br />
                  Accra, Ghana
                </p>
              </div>
            </div>
            <div className="visit-row reveal" data-delay="200">
              <GraduationCap />
              <div>
                <h3>A place to grow</h3>
                <p>Home of The Father’s Heart School of Ministry</p>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer reveal" data-reveal="fade">
          <div className="footer-top">
            <Brand />
            <p className="footer-mission">Pleasing God, Serving Our Generation.</p>
            <a href="#home" className="text-link">
              Back to top <ArrowRight size={15} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Pleasant Springs Chapel. All rights reserved.</span>
            <span>Achimota Mile 7 · Accra, Ghana</span>
            <span>Built on faith. Bound by love.</span>
          </div>
        </footer>
      </div>
      {watch && (
        <div
          className="film-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="film-title"
          onClick={() => setWatch(false)}
        >
          <div className="film-inner" onClick={(e) => e.stopPropagation()}>
            <Button
              className="film-close"
              variant="chapelIcon"
              size="icon"
              aria-label="Close video"
              onClick={() => setWatch(false)}
            >
              <X />
            </Button>
            <h2 id="film-title" className="film-title">
              Pleasant Springs Chapel
            </h2>
            <video controls autoPlay playsInline tabIndex={0}>
              <source src={film.url} type="video/webm" />
              <source src={filmMp4.url} type="video/mp4" />
              <source src={localFilm} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
