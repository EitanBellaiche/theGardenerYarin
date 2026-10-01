import { type CSSProperties, useState } from "react";
import type { BeforeAfterPair } from "../siteData";

/**
 * Drag/keyboard comparison slider. "Before" is revealed from the right (reading
 * start in RTL); the range input handles pointer, touch and keyboard input.
 */
export default function BeforeAfter({ pair }: { pair: BeforeAfterPair }) {
  const [position, setPosition] = useState(50);

  return (
    <figure className="ba" style={{ "--ba-pos": `${position}%` } as CSSProperties}>
      <div
        className="baFrame"
        style={{ aspectRatio: `${pair.after.width} / ${pair.after.height}` }}
      >
        <img
          className="baImg"
          src={pair.after.large}
          alt={`אחרי: ${pair.after.alt}`}
          loading="lazy"
          decoding="async"
        />
        <div className="baBefore">
          <img
            className="baImg"
            src={pair.before.large}
            alt={`לפני: ${pair.before.alt}`}
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className="baLabel baLabelBefore" aria-hidden>
          לפני
        </span>
        <span className="baLabel baLabelAfter" aria-hidden>
          אחרי
        </span>
        <span className="baDivider" aria-hidden />
        <input
          className="baRange"
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`השוואת לפני ואחרי: ${pair.title}`}
        />
      </div>
      <figcaption className="baCaption">
        <b>{pair.title}</b>
        {pair.caption && <span>{pair.caption}</span>}
      </figcaption>
    </figure>
  );
}
