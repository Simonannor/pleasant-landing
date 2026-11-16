import { useEffect, useRef, useState } from "react";
import { church } from "@/lib/church";
import logoCutout from "@/assets/logo/chapel-frame-134-cutout.svg";

// The 6 s chapel film, exported at 30 fps as 182 numbered frames (560×560
// JPEG, ~2 MB total). Bundled imports per project convention; the eager glob
// yields stable, hashed URLs that are sorted into play order.
const frameModules = import.meta.glob<{ default: string }>("../assets/logo/*.jpg", {
  eager: true,
});

const FRAMES = Object.entries(frameModules)
  .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
  .map(([, mod]) => mod.default);

const FRAME_COUNT = FRAMES.length;
// The first scroll beat is drawn instantly; the rest stream in behind it.
const PRIORITY_COUNT = Math.min(24, FRAME_COUNT);
// Matches SacredScene's dpr cap — beyond this the difference is invisible.
const DPR_CAP = 1.5;
const BATCH_SIZE = 6;
export default function ScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduced, setReduced] = useState(false);
  const [staticFrame, setStaticFrame] = useState<string | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas || FRAME_COUNT === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      // No 2D canvas (very old browsers): degrade to a still emblem.
      setStaticFrame(logoCutout);
      return;
    }

    const images: Array<HTMLImageElement | null> = new Array<HTMLImageElement | null>(
      FRAME_COUNT,
    ).fill(null);
    const loaded = new Set<number>();
    const loading = new Set<number>();
    const failed = new Set<number>();
    let disposed = false;
    let drawn = -1;
    let raf = 0;
    let target = 0;

    // Frames arrive out of order, so the nearest loaded frame is drawn until
    // the exact one lands — the canvas never blanks mid-scroll.
    const draw = (index: number) => {
      let idx = index;
      if (!loaded.has(idx)) {
        for (let step = 1; step < FRAME_COUNT; step++) {
          if (loaded.has(idx - step)) {
            idx -= step;
            break;
          }
          if (loaded.has(idx + step)) {
            idx += step;
            break;
          }
        }
      }
      if (!loaded.has(idx) || idx === drawn) return;
      const img = images[idx];
      if (!img) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
      drawn = idx;
    };

    const render = () => draw(target);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        drawn = -1;
        render();
      }
    };

    const progress = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return rect.top < 0 ? 1 : 0;
      return Math.min(1, Math.max(0, -rect.top / scrollable));
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        target = Math.round(progress() * (FRAME_COUNT - 1));
        // Keep frames around the live scroll position ahead of the coarse
        // background sweep so fast scrolls cannot outrun image decoding.
        for (let offset = -3; offset <= 3; offset++) {
          const index = target + offset;
          if (index >= 0 && index < FRAME_COUNT) load(index, false);
        }
        render();
      });
    };

    const load = (index: number, lowPriority: boolean) => {
      if (images[index] || loading.has(index) || failed.has(index)) return;
      const src = FRAMES[index];
      if (!src) return;
      const img = new Image();
      loading.add(index);
      img.decoding = "async";
      if (lowPriority && "fetchPriority" in img) img.fetchPriority = "low";
      img.onload = () => {
        loading.delete(index);
        if (disposed) return;
        images[index] = img;
        loaded.add(index);
        render(); // sharpen whatever scroll position is live right now
      };
      img.onerror = () => {
        loading.delete(index);
        failed.add(index);
      };
      img.src = src;
    };

    // Coarse-to-fine: every 16th frame, then 8th, 4th, 2nd, finally each one,
    // so early scrolling has full coverage that sharpens as the rest arrive.
    const queue: number[] = [];
    const queued = new Set<number>();
    for (let stride = 16; stride >= 1; stride = stride === 16 ? 8 : stride >> 1) {
      for (let i = PRIORITY_COUNT; i < FRAME_COUNT; i += stride) {
        if (!queued.has(i)) {
          queued.add(i);
          queue.push(i);
        }
      }
    }

    const drain = () => {
      if (disposed) return;
      queue.splice(0, BATCH_SIZE).forEach((i) => load(i, true));
      if (queue.length > 0) {
        if (typeof window.requestIdleCallback === "function") {
          window.requestIdleCallback(drain, { timeout: 200 });
        } else {
          window.setTimeout(drain, 80);
        }
      }
    };

    const onResize = () => {
      resize();
      schedule();
    };

    if (reduced) {
      // No pinning, no scrubbing: settle on the completed emblem.
      setStaticFrame(logoCutout);
      return () => {
        disposed = true;
      };
    }

    // Priority beat first, then the background sweep once the section is near.
    for (let i = 0; i < PRIORITY_COUNT; i++) load(i, false);

    resize();
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            io?.disconnect();
            drain();
          }
        },
        { rootMargin: "800px 0px" },
      );
      io.observe(section);
    } else {
      // Without IO the background frame queue would never start, leaving the
      // sequence stuck near its opening frames as the user scrolls.
      drain();
    }

    return () => {
      disposed = true;
      io?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className={reduced || staticFrame ? "film-section film-static" : "film-section"}
      aria-label="Pleasant Springs Chapel emblem, revealed as you scroll"
    >
      <div className="film-sticky">
        {staticFrame ? (
          <img
            className="film-canvas film-still"
            src={staticFrame}
            alt=""
            width={560}
            height={560}
          />
        ) : (
          <div className="film-visual">
            <img className="film-canvas-underlay" src={logoCutout} alt="" aria-hidden="true" />
            <canvas
              ref={canvasRef}
              className="film-canvas"
              role="img"
              aria-label="Animated Pleasant Springs Chapel emblem"
            />
          </div>
        )}
        <p className="film-caption">{church.mission}</p>
      </div>
    </section>
  );
}
