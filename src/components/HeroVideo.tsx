import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import useHydrated from "./useHydrated";
import useMediaQuery from "./useMediaQuery";
import useReducedMotion from "./useReducedMotion";

import av1Desktop from "../assets/media/hero-desktop-av1.mp4";
import av1Mobile from "../assets/media/hero-mobile-av1.mp4";
import h264Desktop from "../assets/media/hero-desktop.mp4";
import h264Mobile from "../assets/media/hero-mobile.mp4";
import posterDesktop from "../assets/media/hero-poster.webp";
import posterMobile from "../assets/media/hero-poster-mobile.webp";
import stillDesktop from "../assets/media/hero-still.webp";
import stillMobile from "../assets/media/hero-still-mobile.webp";

// Below this width the hero panel is taller than 16:9, so the square crop
// fits it better. Keep in sync with the hero rules in LandingPageYarin.css.
const MOBILE_MEDIA = "(max-width: 599px)";

type Candidate = { src: string; type: string };

// AV1 first: some GPU drivers (e.g. Chrome's VA-API path with Mesa on AMD
// Renoir) fail to decode every H.264/VP9 stream, while AV1 is decoded in
// software wherever the GPU lacks it. H.264 Main is the universal fallback
// (Safari and older devices skip AV1 via the codecs string).
const SOURCES: Record<"desktop" | "mobile", Candidate[]> = {
  desktop: [
    { src: av1Desktop, type: 'video/mp4; codecs="av01.0.05M.08"' },
    { src: h264Desktop, type: 'video/mp4; codecs="avc1.4D401F"' },
  ],
  mobile: [
    { src: av1Mobile, type: 'video/mp4; codecs="av01.0.04M.08"' },
    { src: h264Mobile, type: 'video/mp4; codecs="avc1.4D401F"' },
  ],
};

type NetworkInformationLike = { saveData?: boolean };

const subscribeToNothing = () => () => {};

function prefersSavingData() {
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike })
    .connection;
  return Boolean(connection?.saveData);
}

/**
 * Full-bleed hero background. If a source fails to decode after loading
 * (which browsers don't recover from on their own), the next source is tried;
 * the still image is shown only once every source has failed.
 * Reduced-motion and data-saver visitors get the final branded frame as a still.
 * The <video> is added only after hydration: the prerendered HTML can't know the
 * visitor's screen size or motion/data preferences, and must not start a download.
 */
export default function HeroVideo() {
  const reducedMotion = useReducedMotion();
  const isSmall = useMediaQuery(MOBILE_MEDIA);
  const hydrated = useHydrated();
  const saveData = useSyncExternalStore(subscribeToNothing, prefersSavingData, () => false);
  const [attempt, setAttempt] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const candidates = SOURCES[isSmall ? "mobile" : "desktop"].slice(attempt);
  const showVideo = !reducedMotion && !saveData && candidates.length > 0;

  function tryNextSource(reason: unknown) {
    console.warn("Hero video source failed, trying the next one.", reason);
    setPlaying(false);
    setAttempt((current) => current + 1);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React does not reflect `muted` as an attribute; mobile Safari needs the
    // property set before play() for autoplay to be allowed.
    video.muted = true;
    video.play()?.catch(() => {
      // Autoplay refused (e.g. Low Power Mode). The poster stays visible.
    });
  }, [showVideo, attempt, isSmall]);

  return (
    <div className="heroMedia" aria-hidden>
      <picture>
        <source media={MOBILE_MEDIA} srcSet={showVideo ? posterMobile : stillMobile} />
        <img
          className="heroPoster"
          src={showVideo ? posterDesktop : stillDesktop}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {hydrated && showVideo && (
        <video
          key={`${isSmall ? "m" : "d"}-${attempt}`}
          ref={videoRef}
          className={`heroVideo ${playing ? "isPlaying" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
          onError={(event) => {
            // <source> errors bubble here through React; only the element's
            // own error (e.g. MEDIA_ERR_DECODE mid-stream) means this source failed.
            if (event.target === event.currentTarget) tryNextSource(event.currentTarget.error);
          }}
        >
          {candidates.map((candidate, index) => (
            <source
              key={candidate.src}
              src={candidate.src}
              type={candidate.type}
              // The last candidate erroring means none of the remaining ones could load.
              onError={index === candidates.length - 1 ? () => tryNextSource("no playable source") : undefined}
            />
          ))}
        </video>
      )}
    </div>
  );
}
