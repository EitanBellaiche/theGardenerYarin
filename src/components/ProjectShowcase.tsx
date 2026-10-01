import { type CSSProperties, type TouchEvent, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import useReducedMotion from "./useReducedMotion";
import { PROJECT_CATEGORY_LABELS, type Project, type WorkItem } from "../siteData";

const INTERVAL_MS = 3200;

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

/**
 * One project: its photos cross-fade automatically in order (1 → last, then
 * again from 1), with small arrows, swipe on touch, and stage labels.
 * Autoplay pauses on hover/focus, while off-screen, and for reduced motion.
 * A video slide holds the slideshow and plays muted while it is showing.
 */
export default function ProjectShowcase({
  project,
  number,
  onOpenPhoto,
}: {
  project: Project;
  number: number;
  onOpenPhoto: (items: WorkItem[], index: number) => void;
}) {
  const slides = project.slides;
  const count = slides.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useReducedMotion();
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  // "auto" follows motion preferences; the visitor's button press overrides it.
  const [videoChoice, setVideoChoice] = useState<"auto" | "play" | "pause">("auto");

  const onVideo = Boolean(slides[current].video);
  const playing = count > 1 && !paused && inView && !reducedMotion && !onVideo;
  const videoPlaying =
    onVideo && inView && (videoChoice === "play" || (videoChoice === "auto" && !reducedMotion));

  useEffect(() => {
    const node = mediaRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Restarts on every slide change, so manual navigation resets the timer.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setCurrent((index) => (index + 1) % count), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [playing, current, count]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (videoPlaying) {
      video.muted = true;
      video.play()?.catch(() => {});
    } else {
      video.pause();
    }
  }, [videoPlaying]);

  const go = (delta: number) => setCurrent((index) => (index + delta + count) % count);

  // In RTL a leftward swipe moves forward.
  function onTouchEnd(event: TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  }

  // The lightbox shows photos only; video slides stay in the frame.
  const photoSlides = slides.filter((slide) => !slide.video);
  const lightboxItems: WorkItem[] = photoSlides.map((slide, index) => ({
    id: `${project.id}-${index}`,
    category: project.category,
    photo: slide.photo,
    kind: slide.label,
    title: project.title,
    tag: "",
  }));

  const titleId = `${project.id}-title`;

  return (
    <article
      className="projectShow"
      aria-labelledby={titleId}
      style={{ "--show-interval": `${INTERVAL_MS}ms` } as CSSProperties}
    >
      <div
        ref={mediaRef}
        className="showMedia"
        role="group"
        aria-roledescription="מצגת תמונות"
        aria-label={project.title}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
        }}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, index) =>
          slide.video ? (
            <div
              key={slide.label}
              className={`showSlide showSlideVideo ${index === current ? "isActive" : ""}`}
              aria-hidden={index !== current}
            >
              <img className="showVideoBackdrop" src={slide.photo.small} alt="" aria-hidden />
              <video
                ref={videoRef}
                className="showVideo"
                src={slide.video}
                poster={slide.photo.small}
                muted
                loop
                playsInline
                preload="none"
                aria-label={slide.photo.alt}
              />
              <button
                type="button"
                className="showVideoToggle"
                tabIndex={index === current ? 0 : -1}
                onClick={() => setVideoChoice(videoPlaying ? "pause" : "play")}
                aria-label={videoPlaying ? "השהיית הסרטון" : "הפעלת הסרטון"}
              >
                <Icon name={videoPlaying ? "pause" : "play"} size={16} />
              </button>
            </div>
          ) : (
            <button
              key={slide.label}
              type="button"
              className={`showSlide ${index === current ? "isActive" : ""}`}
              aria-hidden={index !== current}
              tabIndex={index === current ? 0 : -1}
              onClick={() => onOpenPhoto(lightboxItems, photoSlides.indexOf(slide))}
              aria-label={`הגדלת התמונה: ${slide.label}`}
            >
              <picture>
                <source
                  type="image/avif"
                  srcSet={`${slide.avifSmall} 800w, ${slide.avifLarge} 1400w`}
                  sizes="(max-width: 899px) 100vw, 58vw"
                />
                <img
                  src={slide.photo.small}
                  srcSet={`${slide.photo.small} 800w, ${slide.photo.large} 1400w`}
                  sizes="(max-width: 899px) 100vw, 58vw"
                  width={slide.photo.width}
                  height={slide.photo.height}
                  alt={slide.photo.alt}
                  loading="lazy"
                  decoding="async"
                  style={slide.focus ? { objectPosition: slide.focus } : undefined}
                />
              </picture>
            </button>
          )
        )}

        {count > 1 && (
          <div className="showControls">
            <button type="button" className="showArrow" onClick={() => go(-1)}>
              <Icon name="chevronPrev" size={18} />
              <span className="srOnly">התמונה הקודמת</span>
            </button>
            <span className="showCount" dir="ltr" aria-live={playing ? "off" : "polite"}>
              {pad(current)} / {pad(count - 1)}
            </span>
            <button type="button" className="showArrow" onClick={() => go(1)}>
              <Icon name="chevronNext" size={18} />
              <span className="srOnly">התמונה הבאה</span>
            </button>
          </div>
        )}
      </div>

      <div className="showMeta">
        <p className="showKind">
          {pad(number)} · {PROJECT_CATEGORY_LABELS[project.category]}
        </p>
        <h3 id={titleId} className="showTitle">
          {project.title}
        </h3>
        <p className="showTags">{project.tags}</p>

        {count > 1 && (
          <ol className="showStages" aria-label="שלבי העבודה">
            {slides.map((slide, index) => (
              <li key={slide.label}>
                <button
                  type="button"
                  className={`showStage ${index === current ? "isActive" : ""} ${
                    index < current ? "isDone" : ""
                  } ${playing ? "isPlaying" : ""}`}
                  aria-current={index === current ? "step" : undefined}
                  onClick={() => setCurrent(index)}
                >
                  {slide.label}
                  <span className="showBar" aria-hidden key={index === current ? current : "idle"} />
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </article>
  );
}
