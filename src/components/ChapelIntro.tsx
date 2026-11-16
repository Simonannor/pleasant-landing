import { useCallback, useEffect, useRef, useState } from "react";
import { church } from "@/lib/church";
import filmWebm from "@/assets/chapel-film.webm.asset.json";
import filmMp4 from "@/assets/chapel-film.mp4.asset.json";
import logo from "@/assets/chapel-logo.png.asset.json";
import localFilm from "@/assets/video_2026-10-10_16-07-52.mp4";
import localLogo from "@/assets/chuech logo.jpg";

const MIN_HOLD = 2200;
const MAX_HOLD = 7000;
const LEAVE_MS = 900;

// Source order: the bundled film leads everywhere. The Lovable Asset pointers
// only resolve inside Lovable previews, so on other hosts (Vercel, Netlify)
// listing them first would add two failed requests before play begins.
const SOURCES = [localFilm, filmWebm.url, filmMp4.url];

export default function ChapelIntro({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const doneRef = useRef(false);
  const leaveTimer = useRef<number | undefined>(undefined);
  const [leaving, setLeaving] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [srcIndex, setSrcIndex] = useState(0);
  const [videoDead, setVideoDead] = useState(false);
  const [progress, setProgress] = useState(0);
  const startedAt = useRef(Date.now());

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }, [onDone]);

  const beginLeave = useCallback(() => {
    if (doneRef.current) return;
    setLeaving(true);
    window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(finish, LEAVE_MS);
  }, [finish]);

  useEffect(() => {
    startedAt.current = Date.now();
    if (videoDead) {
      const t = window.setTimeout(beginLeave, 1400);
      return () => window.clearTimeout(t);
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const t = window.setTimeout(beginLeave, 900);
      return () => window.clearTimeout(t);
    }
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => setBlocked(true));
    }
    const failsafe = window.setTimeout(beginLeave, MAX_HOLD);
    return () => window.clearTimeout(failsafe);
  }, [beginLeave, srcIndex, videoDead]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(leaveTimer.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") beginLeave();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [beginLeave]);

  const handleEnded = () => {
    const elapsed = Date.now() - startedAt.current;
    const wait = Math.max(0, MIN_HOLD - elapsed);
    window.setTimeout(beginLeave, wait);
  };

  const handleTime = () => {
    const v = videoRef.current;
    if (v && v.duration) setProgress(Math.min(100, (v.currentTime / v.duration) * 100));
  };

  // Walk the source chain; if even the bundled copy fails, show the logo
  // image so the frame never sits as an empty black circle.
  const handleError = () => {
    if (srcIndex + 1 < SOURCES.length) {
      setSrcIndex((i) => i + 1);
    } else {
      setVideoDead(true);
    }
  };

  const handleEnter = async () => {
    try {
      await videoRef.current?.play();
      setBlocked(false);
    } catch {
      beginLeave();
    }
  };

  return (
    <div
      className={`intro${leaving ? " is-leaving" : ""}`}
      aria-label="Pleasant Springs Chapel cinematic introduction"
    >
      <div className="intro-veil" aria-hidden="true" />
      <div className="intro-core">
        <div className="intro-frame">
          {videoDead ? (
            <img
              className="intro-video"
              src={import.meta.env.DEV ? localLogo : logo.url}
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.dataset["fb"]) {
                  img.dataset["fb"] = "1";
                  img.src = localLogo;
                }
              }}
              alt="Pleasant Springs Chapel logo"
            />
          ) : (
            <video
              ref={videoRef}
              key={SOURCES[srcIndex]}
              className="intro-video"
              muted
              autoPlay
              playsInline
              preload="auto"
              src={SOURCES[srcIndex]}
              poster={localLogo}
              onEnded={handleEnded}
              onTimeUpdate={handleTime}
              onError={handleError}
            />
          )}
          <div className="intro-glow" aria-hidden="true" />
        </div>
        <div className="intro-eyebrow">A place of belonging</div>
        <div className="intro-title">{church.name}</div>
        <div className="intro-mission">{church.mission}</div>
        <div className="intro-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
      {blocked && !videoDead ? (
        <button type="button" className="intro-enter" onClick={handleEnter}>
          Tap to enter
        </button>
      ) : (
        <button type="button" className="intro-skip" onClick={beginLeave}>
          Skip intro
        </button>
      )}
    </div>
  );
}
