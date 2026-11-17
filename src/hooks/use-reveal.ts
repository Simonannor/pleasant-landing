import { useEffect } from "react";

// Reveals .reveal elements as they enter the viewport. Shared by the landing
// route and every dedicated page shell so sections animate identically.
export function useRevealOnScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const elements = document.querySelectorAll<HTMLElement>(".reveal");

    // Older browsers and embedded webviews may not implement IntersectionObserver.
    // Keep content visible there instead of leaving it at the CSS hidden state.
    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      // A small threshold also works for tall sections and short viewports.
      { threshold: 0.01 },
    );
    elements.forEach((el) => {
      const delay = (el as HTMLElement).dataset["delay"];
      if (delay) (el as HTMLElement).style.transitionDelay = `${delay}ms`;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [enabled]);
}
