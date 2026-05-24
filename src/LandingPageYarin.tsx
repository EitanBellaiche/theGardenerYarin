import { type ReactNode, useEffect, useRef, useState } from "react";
import "./LandingPageYarin.css";

import imgCurveHouse from "./assets/yarin/curve-house.jpeg";
import imgSmallIsland from "./assets/yarin/small-island.jpeg";
import imgRooftop from "./assets/yarin/rooftop.jpeg";
import imgBigTree from "./assets/yarin/big-tree.jpeg";
import imgYardStepping from "./assets/yarin/yard-stepping.jpeg";

const PHONE_INT = "+972527090776";
const PHONE_LOCAL = "052-7090776";
const LOGO_PATH = "/logo.jpeg";

const WHATSAPP_NUMBER = "972527090776";
const DEFAULT_WHATSAPP_TEXT =
  "היי ירין, ראיתי את העבודות באתר ואני רוצה הצעת מחיר. אפשר לדבר?";
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  DEFAULT_WHATSAPP_TEXT
)}`;

const SOCIALS = {
  instagram:
    "https://www.instagram.com/yarin_adler_gardening?igsh=dHR4NHJrZTVxamc3",
  facebook:
    "https://www.facebook.com/share/1HRqKQyGcX/?mibextid=wwXIfr",
};

type IconName =
  | "phone"
  | "menu"
  | "close"
  | "whatsapp"
  | "arrow"
  | "camera"
  | "instagram"
  | "facebook";

type GalleryItem = {
  cat: string;
  src: string;
  title: string;
  tag: string;
};

type IntentItem = { id: string; label: string; template: string };

const GALLERY_ITEMS: GalleryItem[] = [
  {
    cat: "רופטופ",
    src: imgRooftop,
    title: "רופטופ נקי ומדויק",
    tag: "דשא סינטטי פרימיום",
  },
  {
    cat: "עיקולים",
    src: imgCurveHouse,
    title: "עיקולים שיושבים בול",
    tag: "חיבור מושלם לקירות",
  },
  {
    cat: "דקור",
    src: imgSmallIsland,
    title: "אי דשא עם חיפוי",
    tag: "שילוב אבנים ודשא",
  },
  {
    cat: "חצרות",
    src: imgBigTree,
    title: "חצר רחבה ומטופחת",
    tag: "מראה פתוח ונקי",
  },
  {
    cat: "שבילים",
    src: imgYardStepping,
    title: "שבילי דריכה",
    tag: "עיצוב ושימושיות",
  },
];

const CATEGORIES = ["הכל", ...Array.from(new Set(GALLERY_ITEMS.map((item) => item.cat)))];

const INTENTS: IntentItem[] = [
  {
    id: "synthetic",
    label: "דשא סינטטי",
    template: "אני רוצה הצעת מחיר לדשא סינטטי. השטח נמצא ב...",
  },
  {
    id: "garden",
    label: "שדרוג גינה",
    template: "אני רוצה לשדרג את הגינה / החצר. אפשר לקבל כיוון?",
  },
  {
    id: "maintenance",
    label: "תחזוקה",
    template: "אני צריך/ה תחזוקה או גיזום. האזור הוא...",
  },
  {
    id: "irrigation",
    label: "השקיה",
    template: "אני צריך/ה התקנה או תיקון השקיה. אפשר לדבר?",
  },
];

const SERVICE_LABELS = ["דשא סינטטי", "השקיה", "תחזוקה", "גיזום", "חיפויים", "שבילי דריכה"];

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 18,
    height: 18,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "phone":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7c.2 1.2.5 2.3.9 3.4a2 2 0 0 1-.5 2.1L9.9 11a16 16 0 0 0 3.1 3.1l.8-1.4a2 2 0 0 1 2.1-.5c1.1.4 2.2.7 3.4.9A2 2 0 0 1 22 16.9z" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      );
    case "close":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M20 12a8 8 0 0 1-12.7 6.4L4 19l.8-3.2A8 8 0 1 1 20 12z" />
          <path d="M8.8 10.3c.2-.6.5-.7.9-.7h.3c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4 0 .6l-.3.4c-.1.2-.1.4 0 .6.4.7 1.1 1.4 1.9 1.8.2.1.4.1.6 0l.6-.3c.2-.1.4-.1.6 0l1.6.7c.3.1.4.3.4.5v.3c0 .4-.1.7-.7.9-.6.2-1.8.4-3.5-.4-1.7-.8-2.9-2-3.8-3.7-.8-1.6-.6-2.8-.4-3.4z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M5 12h14" />
          <path d="M13 5l7 7-7 7" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4 7h4l2-2h4l2 2h4v12H4z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.6.4-1 1-1z" />
        </svg>
      );
    default:
      return null;
  }
}

function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "revealIn" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function Lightbox({
  open,
  item,
  onClose,
}: {
  open: boolean;
  item: GalleryItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightboxCard" onClick={(event) => event.stopPropagation()}>
        <img src={item.src} alt={item.title} />
        <div className="lightboxBar">
          <div>
            <b>{item.title}</b>
            <div className="lightboxSub">{item.tag}</div>
          </div>
          <button className="btn btnGhost" type="button" onClick={onClose}>
            סגור <span aria-hidden>✕</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LandingPageYarin() {
  const [cat, setCat] = useState("הכל");
  const [lightbox, setLightbox] = useState<{ open: boolean; item: GalleryItem | null }>({
    open: false,
    item: null,
  });
  const [lead, setLead] = useState({
    name: "",
    phone: "",
    message: INTENTS[0].template,
  });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeIntent, setActiveIntent] = useState(INTENTS[0].id);

  const filteredGallery =
    cat === "הכל" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.cat === cat);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  function go(id: string) {
    setMobileNavOpen(false);
    scrollToId(id);
  }

  function applyIntent(intent: IntentItem) {
    setActiveIntent(intent.id);
    setLead((current) => ({
      ...current,
      message:
        current.message.trim() === "" || INTENTS.some((item) => item.template === current.message)
          ? intent.template
          : current.message,
    }));
  }

  function sendToWhatsapp() {
    const text = [
      "היי ירין, הגעתי מהאתר.",
      lead.name ? `שם: ${lead.name}` : null,
      lead.phone ? `טלפון: ${lead.phone}` : null,
      lead.message ? `פרטים: ${lead.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noreferrer"
    );
  }

  return (
    <div className="page">
      <div className="worksBackdrop" aria-hidden>
        {GALLERY_ITEMS.slice(0, 4).map((item, index) => (
          <div
            key={item.title}
            className={`worksBackdropTile worksBackdropTile${index + 1}`}
            style={{ backgroundImage: `url(${item.src})` }}
          />
        ))}
        <div className="worksBackdropOverlay" />
      </div>

      <div className="topStrip">
        <div className="container topStripInner">
          <span>עבודות אמיתיות ברקע, וואטסאפ זמין בלחיצה</span>
          <a href={`tel:${PHONE_INT}`}>{PHONE_LOCAL}</a>
        </div>
      </div>

      <header className="header">
        <div className="container headerInner">
          <a
            className="brand"
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              go("top");
            }}
          >
            <img className="brandLogo" src={LOGO_PATH} alt="ירין אדלר גינון" />
            <div className="brandText">
              <b>ירין אדלר גינון</b>
              <span>עבודות, דשא סינטטי ויצירת קשר מהירה</span>
            </div>
          </a>

          <nav className="nav desktopNav" aria-label="ניווט ראשי">
            <button className="navLink" type="button" onClick={() => go("gallery")}>
              עבודות
            </button>
            <button className="navLink" type="button" onClick={() => go("contact")}>
              יצירת קשר
            </button>
            <a className="btn btnPrimary" href={WHATSAPP} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" /> שלח הודעה
            </a>
          </nav>

          <button
            className="btn btnGhost mobileMenuBtn"
            type="button"
            onClick={() => setMobileNavOpen(true)}
          >
            <Icon name="menu" /> תפריט
          </button>
        </div>

        {mobileNavOpen && (
          <div
            className="mobileNavBackdrop"
            onClick={() => setMobileNavOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <div className="mobileNavSheet" onClick={(event) => event.stopPropagation()}>
              <div className="mobileNavTop">
                <div className="mobileNavTitle">
                  <b>תפריט</b>
                  <span>מעבר מהיר</span>
                </div>
                <button
                  className="btn btnGhost"
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <Icon name="close" /> סגור
                </button>
              </div>

              <div className="mobileNavList">
                <button className="mobileNavItem" type="button" onClick={() => go("gallery")}>
                  עבודות
                </button>
                <button className="mobileNavItem" type="button" onClick={() => go("contact")}>
                  יצירת קשר
                </button>
                <a
                  className="mobileNavItem"
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  אינסטגרם
                </a>
                <a
                  className="mobileNavItem"
                  href={SOCIALS.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  פייסבוק
                </a>
              </div>

              <div className="mobileNavActions">
                <a className="btn btnPrimary" href={WHATSAPP} target="_blank" rel="noreferrer">
                  <Icon name="whatsapp" /> שלח וואטסאפ
                </a>
                <a className="btn btnGhost" href={`tel:${PHONE_INT}`}>
                  <Icon name="phone" /> התקשר
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="hero" id="top">
          <div className="container heroInner">
            <div className="heroLayout">
              <Reveal className="heroStart">
                <div className="heroStartGallery">
                  {GALLERY_ITEMS.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      className={`heroStartTile ${index === 0 ? "heroStartTileLarge" : ""}`}
                      onClick={() => setLightbox({ open: true, item })}
                      style={{ backgroundImage: `url(${item.src})` }}
                    >
                      <span className="heroMiniTileOverlay" aria-hidden />
                      <span className="heroMiniTileLabel">{item.title}</span>
                    </button>
                  ))}
                </div>

                <div className="heroActionRow heroActionRowTight">
                  <a className="btn btnPrimary" href={WHATSAPP} target="_blank" rel="noreferrer">
                    <Icon name="whatsapp" /> וואטסאפ
                  </a>
                  <button className="btn btnGhost" type="button" onClick={() => go("gallery")}>
                    <Icon name="camera" /> עבודות
                  </button>
                  <a className="btn btnGhost" href={`tel:${PHONE_INT}`}>
                    <Icon name="phone" /> התקשר
                  </a>
                </div>
              </Reveal>

              <Reveal className="delay2">
                <div className="contactPanel">
                  <div className="contactPanelHead">
                    <span className="panelEyebrow">יצירת קשר</span>
                    <h2>שלחו פרטים</h2>
                  </div>

                  <div className="intentGrid">
                    {INTENTS.map((intent) => (
                      <button
                        key={intent.id}
                        type="button"
                        className={`intentButton ${
                          activeIntent === intent.id ? "intentButtonActive" : ""
                        }`}
                        onClick={() => applyIntent(intent)}
                      >
                        {intent.label}
                      </button>
                    ))}
                  </div>

                  <div className="quickLeadForm">
                    <input
                      className="input"
                      placeholder="שם"
                      value={lead.name}
                      onChange={(event) =>
                        setLead((current) => ({ ...current, name: event.target.value }))
                      }
                    />
                    <input
                      className="input"
                      placeholder="טלפון"
                      value={lead.phone}
                      onChange={(event) =>
                        setLead((current) => ({ ...current, phone: event.target.value }))
                      }
                    />
                    <textarea
                      className="textarea textareaCompact"
                      placeholder="מה צריך לעשות?"
                      value={lead.message}
                      onChange={(event) =>
                        setLead((current) => ({ ...current, message: event.target.value }))
                      }
                    />
                  </div>

                  <div className="quickLeadActions">
                    <button className="btn btnPrimary" type="button" onClick={sendToWhatsapp}>
                      <Icon name="whatsapp" /> שלח
                    </button>
                    <a className="btn btnGhost" href={`tel:${PHONE_INT}`}>
                      <Icon name="phone" /> {PHONE_LOCAL}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section gallerySection" id="gallery">
          <div className="container">
            <Reveal>
              <div className="sectionTitleCompact">
                <div>
                  <div className="eyebrow">עבודות</div>
                  <h2 className="h2">העבודות שלנו</h2>
                </div>
                <a className="miniLink" href={WHATSAPP} target="_blank" rel="noreferrer">
                  שלח הודעה <Icon name="arrow" />
                </a>
              </div>
            </Reveal>

            <div className="galleryTop">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`chip ${cat === category ? "chipActive" : ""}`}
                  onClick={() => setCat(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="gallery galleryFeatured">
              {filteredGallery.map((item, index) => (
                <Reveal key={`${item.title}-${index}`} className={index > 1 ? "delay1" : ""}>
                  <button
                    type="button"
                    className={`tile ${index === 0 ? "tileLarge" : ""}`}
                    onClick={() => setLightbox({ open: true, item })}
                  >
                    <img className="tileImg" src={item.src} alt={item.title} loading="lazy" />
                    <span className="tileOverlay" aria-hidden />
                    <span className="tileMeta">
                      <small>{item.tag}</small>
                      <b>{item.title}</b>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section servicesSection">
          <div className="container">
            <Reveal>
              <div className="servicesInline">
                {SERVICE_LABELS.map((service) => (
                  <span key={service} className="serviceChip">
                    {service}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section sectionContact" id="contact">
          <div className="container">
            <Reveal>
              <div className="contactCardWide">
                <div className="contactCardText">
                  <div className="eyebrow">יצירת קשר</div>
                  <h2 className="h2">מוכנים לדבר?</h2>
                  <p className="sub contactSub">שלחו תמונה של השטח או תשאירו טלפון.</p>
                </div>

                <div className="contactCardActions">
                  <button className="btn btnPrimary" type="button" onClick={sendToWhatsapp}>
                    <Icon name="whatsapp" /> שלח לוואטסאפ
                  </button>
                  <a className="btn btnGhost" href={`tel:${PHONE_INT}`}>
                    <Icon name="phone" /> {PHONE_LOCAL}
                  </a>
                  <a
                    className="btn btnGhost"
                    href={SOCIALS.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    אינסטגרם
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <div>© {new Date().getFullYear()} ירין אדלר גינון • נהריה והסביבה</div>
          <div className="footerLinks">
            <a href={WHATSAPP} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" /> וואטסאפ
            </a>
            <a href={`tel:${PHONE_INT}`}>
              <Icon name="phone" /> {PHONE_LOCAL}
            </a>
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer">
              <Icon name="instagram" /> אינסטגרם
            </a>
            <a href={SOCIALS.facebook} target="_blank" rel="noreferrer">
              <Icon name="facebook" /> פייסבוק
            </a>
          </div>
        </div>
      </footer>

      <a
        className="waFloat"
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="שלח הודעה בוואטסאפ"
      >
        <span className="waPulse" aria-hidden />
        <Icon name="whatsapp" />
      </a>

      <div className="stickyCta">
        <div className="stickyCtaInner">
          <a className="btn btnPrimary" href={WHATSAPP} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" /> הצעת מחיר
          </a>
          <a className="btn btnGhost" href={`tel:${PHONE_INT}`}>
            <Icon name="phone" /> שיחה
          </a>
        </div>
      </div>

      <Lightbox
        open={lightbox.open}
        item={lightbox.item}
        onClose={() => setLightbox({ open: false, item: null })}
      />
    </div>
  );
}
