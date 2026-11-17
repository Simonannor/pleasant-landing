import { useEffect, useCallback } from "react";

// Reveals elements as they enter the viewport. Supports several reveal
// styles via the data-reveal attribute:
//   fade-up (default)   — fades in while sliding up from the bottom
//   slide-left          — slides in from the left
//   slide-right         — slides in from the right
//   zoom                — scales up from 0.9
//   fade                — fades in without moving
//
// Stagger groups: add data-stagger="n" (ms) to a parent and data-reveal to
// each child — children reveal one after another with n ms between them.
//
// Parallax: add data-parallax="0.5" to any element — it moves at a fraction
// of the scroll speed as the user scrolls past it.
export function useRevealOnScroll(enabled = true) {
  const handleScroll = useCallback(() => {
    if (!enabled) return;

    // --- Parallax ---------------------------------------------------------
    const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax]");
    const scrolled = window.pageYOffset;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset["parallax"] ?? "0.3");
      const rect = el.getBoundingClientRect();
      const offset = rect.top + scrolled - window.innerHeight;
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.transform = `translate3d(0, ${(scrolled - offset) * speed}px, 0)`;
      }
    });

    // --- Reveal -----------------------------------------------------------
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal], .reveal");
    reveals.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 60 && rect.bottom > 0;
      if (isVisible && !el.classList.contains("is-visible")) {
        el.classList.add("is-visible");
      }
    });
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // run once on mount for above-fold elements
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [enabled, handleScroll]);
}

// Staggered reveal: call this on a parent element once it becomes visible so
// its children reveal sequentially with a delay between each.
export function useStaggerReveal(
  parentRef: React.RefObject<HTMLElement>,
  childSelector = "[data-reveal]",
  delayMs = 80,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled || !parentRef.current) return;
    const parent = parentRef.current;
    const children = Array.from(
      parent.querySelectorAll<HTMLElement>(childSelector),
    );
    if (children.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          children.forEach((child, i) => {
            setTimeout(() => {
              child.classList.add("is-visible");
            }, i * delayMs);
          });
          observer.disconnect();
        });
      },
      { threshold: 0.05 },
    );
    observer.observe(parent);
    return () => observer.disconnect();
  }, [parentRef, childSelector, delayMs, enabled]);
}
