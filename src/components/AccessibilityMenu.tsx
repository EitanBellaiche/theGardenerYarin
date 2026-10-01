import { useEffect, useId, useRef, useState } from "react";
import Icon from "./Icon";

type Settings = {
  textSize: 0 | 1 | 2 | 3;
  contrast: boolean;
  grayscale: boolean;
  links: boolean;
  spacing: boolean;
  readableFont: boolean;
  stopMotion: boolean;
};

const DEFAULTS: Settings = {
  textSize: 0,
  contrast: false,
  grayscale: false,
  links: false,
  spacing: false,
  readableFont: false,
  stopMotion: false,
};

const STORAGE_KEY = "a11y-settings";
const TEXT_SIZE_LABELS = ["רגיל", "גדול", "גדול מאוד", "ענק"];

// Each setting maps to one class on <html>; the styles live in LandingPageYarin.css.
const TOGGLES: { key: Exclude<keyof Settings, "textSize">; label: string; className: string }[] = [
  { key: "contrast", label: "ניגודיות גבוהה", className: "a11y-contrast" },
  { key: "grayscale", label: "גווני אפור", className: "a11y-grayscale" },
  { key: "links", label: "הדגשת קישורים", className: "a11y-links" },
  { key: "spacing", label: "ריווח טקסט", className: "a11y-spacing" },
  { key: "readableFont", label: "גופן קריא", className: "a11y-font" },
  { key: "stopMotion", label: "עצירת אנימציות", className: "a11y-still" },
];

function loadSettings(): Settings {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS;
    return {
      ...parsed,
      textSize: Math.min(Math.max(Number(parsed.textSize) || 0, 0), 3) as Settings["textSize"],
    };
  } catch {
    return DEFAULTS;
  }
}

/** Floating accessibility menu: text size, contrast, grayscale, links, font and motion. */
export default function AccessibilityMenu() {
  const [settings, setSettings] = useState(loadSettings);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const panelId = useId();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("a11y-text-1", settings.textSize === 1);
    root.classList.toggle("a11y-text-2", settings.textSize === 2);
    root.classList.toggle("a11y-text-3", settings.textSize === 3);
    for (const toggle of TOGGLES) root.classList.toggle(toggle.className, settings[toggle.key]);

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Storage unavailable (private mode); settings still apply for this visit.
    }
  }, [settings]);

  useEffect(() => {
    if (!settings.stopMotion) return;
    document.querySelectorAll("video").forEach((video) => video.pause());
  }, [settings.stopMotion]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const isDefault = JSON.stringify(settings) === JSON.stringify(DEFAULTS);

  return (
    <div className="a11y">
      <button
        ref={buttonRef}
        type="button"
        className="a11yButton"
        aria-label="תפריט נגישות"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <Icon name="accessibility" size={24} />
        <span>נגישות</span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        className="a11yPanel"
        role="dialog"
        aria-labelledby={titleId}
        hidden={!open}
      >
        {/* Rendered only while open: saved settings are read on the client, so
            leaving these out keeps the prerendered markup identical to hydration. */}
        {open && (
          <>
            <div className="a11yPanelHead">
              <p id={titleId} className="a11yTitle">תפריט נגישות</p>
              <button
                type="button"
                className="a11yClose"
                aria-label="סגירת תפריט הנגישות"
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="a11yGroup" role="group" aria-label="גודל טקסט">
              <p className="a11yLabel">גודל טקסט</p>
              <div className="a11ySizes">
                {TEXT_SIZE_LABELS.map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    className="a11yOption"
                    aria-pressed={settings.textSize === index}
                    onClick={() =>
                      setSettings((current) => ({ ...current, textSize: index as Settings["textSize"] }))
                    }
                  >
                    <span style={{ fontSize: `${14 + index * 2}px` }}>א</span> {label}
                  </button>
                ))}
              </div>
            </div>

            <ul className="a11yToggles">
              {TOGGLES.map((toggle) => (
                <li key={toggle.key}>
                  <button
                    type="button"
                    className="a11yOption"
                    aria-pressed={settings[toggle.key]}
                    onClick={() =>
                      setSettings((current) => ({ ...current, [toggle.key]: !current[toggle.key] }))
                    }
                  >
                    {toggle.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="a11yFoot">
              <button
                type="button"
                className="a11yReset"
                disabled={isDefault}
                onClick={() => setSettings(DEFAULTS)}
              >
                איפוס הגדרות
              </button>
              <a className="a11yStatementLink" href="/accessibility/">
                הצהרת נגישות
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
