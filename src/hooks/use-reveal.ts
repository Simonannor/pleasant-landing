import { useEffect } from "react";

// Reveals .reveal elements as they enter the viewport. Shared by the landing
// route and every dedicated page shell so sections animate identically.
export function useRevealOnScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
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
    return () => observer.disconnect();
  }, [enabled]);
}
