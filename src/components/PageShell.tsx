import { useEffect, useRef, type ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { useRevealOnScroll } from "@/hooks/use-reveal";

// Shared chrome for every dedicated route: glassmorphic navbar, scroll
// progress bar, page content, and the editorial footer.
export default function PageShell({ children }: { children: ReactNode }) {
  const progressRef = useRef<HTMLSpanElement>(null);
  useRevealOnScroll();

  useEffect(() => {
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
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="page page-ready">
      <div className="scroll-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
