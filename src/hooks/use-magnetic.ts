import { useEffect, useRef, useCallback } from "react";

// Magnetic hover — element gently follows the cursor while within range.
// Use on buttons, icons, or any interactive element for a premium feel.
export function useMagnetic(
  ref: React.RefObject<HTMLElement>,
  strength = 0.4,
  enabled = true,
) {
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const moveX = (e.clientX - centerX) * strength;
      const moveY = (e.clientY - centerY) * strength;
      ref.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    },
    [ref, strength, enabled],
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = `translate3d(0, 0, 0)`;
  }, [ref]);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, enabled]);
}
