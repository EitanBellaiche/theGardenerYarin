import React, { useEffect, useMemo, useRef, useState } from "react";
import "./LandingPageYarin.css";

// התמונות אצלך נמצאות: src/assets/yarin/*.jpeg
import heroImg from "./assets/yarin/hero.jpeg";
import imgCurveHouse from "./assets/yarin/curve-house.jpeg";
import imgSmallIsland from "./assets/yarin/small-island.jpeg";
import imgRooftop from "./assets/yarin/rooftop.jpeg";
import imgBigTree from "./assets/yarin/big-tree.jpeg";
import imgYardStepping from "./assets/yarin/yard-stepping.jpeg";

// ✅ לוגו: שים קובץ כאן: src/assets/yarin/logo.png
// אם זה jpeg אז תשנה ל: "./assets/yarin/logo.jpeg"
import logoImg from "./assets/yarin/logo.jpeg";

const PHONE_INT = "+972527090776";
const PHONE_LOCAL = "052-7090776";

const WHATSAPP_NUMBER = "972527090776";
const WHATSAPP_TEXT = encodeURIComponent(
  "היי ירין, ראיתי את העבודות שלך ואני רוצה הצעת מחיר לדשא סינטטי/גינון. אפשר לדבר?"
);
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

const SOCIALS = {
  instagram:
    "https://www.instagram.com/yarin_adler_gardening?igsh=dHR4NHJrZTVxamc3",
  facebook:
    "https://www.facebook.com/share/1HRqKQyGcX/?mibextid=wwXIfr",
};

type IconName =
  | "spark"
  | "leaf"
  | "water"
  | "tool"
  | "phone"
  | "menu"
  | "close"
  | "whatsapp";
type GalleryItem = { cat: string; src: string; title: string; tag: string };
type ServiceItem = { icon: IconName; title: string; desc: string };
type ReviewItem = { name: string; text: string };

const STATS = [
  { v: "נהריה והסביבה", k: "אזור שירות" },
  { v: "מענה מהיר", k: "בוואטסאפ" },
  { v: "גימור פרימיום", k: "כמו בתמונות" },
];

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
    case "spark":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M20 4c-9 1-14 6-16 16 10-2 15-7 16-16z" />
          <path d="M4 20c6-6 10-8 16-16" />
        </svg>
      );
    case "water":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 2s7 8 7 13a7 7 0 1 1-14 0c0-5 7-13 7-13z" />
        </svg>
      );
    case "tool":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M14 7l3-3 3 3-3 3" />
          <path d="M2 22l9-9" />
          <path d="M11 13l-2-2" />
          <path d="M16 8l-3 3" />
        </svg>
      );
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
    default:
      return null;
  }
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Reveal-on-scroll component
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );

    obs.observe(node);
    return () => obs.disconnect();
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightboxCard" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.title} />
        <div className="lightboxBar">
          <div>
            <b>{item.title}</b>
            <div className="lightboxSub">{item.tag}</div>
          </div>
          <button className="btn btnGhost" onClick={onClose} type="button">
            סגור <span aria-hidden>✕</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LandingPageYarin() {
  const services: ServiceItem[] = useMemo(
    () => [
      {
        icon: "spark",
        title: "דשא סינטטי פרימיום",
        desc: "מדידות, הכנת תשתית, ניקוז וגימור קצוות מדויק – תוצאה שנראית מיליון דולר.",
      },
      {
        icon: "water",
        title: "מערכות השקיה",
        desc: "התקנה/תיקון טפטפות, ממטרות ומחשב השקיה – כדי שהגינה תעבוד לבד.",
      },
      {
        icon: "leaf",
        title: "גיזום, ניקוי ותחזוקה",
        desc: "גיזום ועיצוב, ניקוי עשבייה, פינוי גזם ותחזוקה שוטפת לגינות ובניינים.",
      },
      {
        icon: "tool",
        title: "עיצוב גינה וחיפויים",
        desc: "שילוב אבנים/טוף/חלוקי נחל, מסגרות, שבילי דריכה ועיצוב לפי השטח.",
      },
      {
        icon: "leaf",
        title: "שתילות ועונתיות",
        desc: "בחירת צמחים חכמה + שתילות שיעשו צבע ופריחה שמתאימים לאקלים.",
      },
      {
        icon: "spark",
        title: "גינות פרטיות / בניינים / עסקים",
        desc: "עבודה נקייה, הקפדה על פרטים ומראה מסודר בסוף כל עבודה.",
      },
    ],
    []
  );

  const galleryItems: GalleryItem[] = useMemo(
    () => [
      {
        cat: "רופטופ",
        src: imgRooftop,
        title: "רופטופ פרימיום",
        tag: "דשא סינטטי נקי + אווירה",
      },
      {
        cat: "עיקולים",
        src: imgCurveHouse,
        title: "עיקולים מושלמים",
        tag: "גימור צמוד לקיר / קווים נקיים",
      },
      {
        cat: "דקור",
        src: imgSmallIsland,
        title: "אי דשא בתוך חיפוי",
        tag: "מסגרת אבנים + נראות מטופחת",
      },
      {
        cat: "חצרות",
        src: imgBigTree,
        title: "חצר גדולה ומרווחת",
        tag: "מראה טבעי ומסודר",
      },
      {
        cat: "דקור",
        src: imgYardStepping,
        title: "שביל דריכה",
        tag: "עיצוב + שימושיות",
      },
    ],
    []
  );

  const categories = useMemo(
    () => ["הכל", ...Array.from(new Set(galleryItems.map((g) => g.cat)))],
    [galleryItems]
  );

  const [cat, setCat] = useState<string>("הכל");
  const filtered = useMemo(
    () => (cat === "הכל" ? galleryItems : galleryItems.filter((g) => g.cat === cat)),
    [cat, galleryItems]
  );

  const [lightbox, setLightbox] = useState<{ open: boolean; item: GalleryItem | null }>({
    open: false,
    item: null,
  });

  const reviews: ReviewItem[] = useMemo(
    () => [
      { name: "לקוח/ה – נהריה", text: "עבודה נקייה ומדויקת. הגינה נראית כמו חדשה." },
      { name: "לקוח/ה – קריות", text: "מענה מהיר, מקצועיות וגימור ברמה גבוהה." },
      { name: "לקוח/ה – עכו", text: "הגיע בזמן, הסביר הכול ועשה עבודה יפה." },
    ],
    []
  );

  const [lead, setLead] = useState<{ name: string; phone: string; message: string }>({
    name: "",
    phone: "",
    message: "",
  });

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  function sendToWhatsapp() {
    const txt = [
      "היי ירין 👋",
      lead.name ? `שם: ${lead.name}` : null,
      lead.phone ? `טלפון: ${lead.phone}` : null,
      lead.message ? `פרטים: ${lead.message}` : null,
      "",
      "רוצה הצעת מחיר 🙂",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(txt)}`;
    window.open(url, "_blank", "noreferrer");
  }

  function go(id: string) {
    setMobileNavOpen(false);
    scrollToId(id);
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container headerInner">
          <a
            className="brand"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("top");
            }}
          >
            {/* ✅ הלוגו במקום הריבוע */}
            <img className="brandLogo" src={logoImg} alt="ירין אדלר – גינון" />
            <div className="brandText">
              <b>ירין אדלר – גינון</b>
              <span>נהריה והסביבה • דשא סינטטי • תחזוקה • השקיה</span>
            </div>
          </a>

          <div className="nav desktopNav">
            <button className="btn btnGhost" type="button" onClick={() => go("services")}>
              שירותים
            </button>
            <button className="btn btnGhost" type="button" onClick={() => go("gallery")}>
              עבודות
            </button>
            <button className="btn btnPrimary" type="button" onClick={() => go("contact")}>
              הצעת מחיר
            </button>
          </div>

          <button className="btn btnGhost mobileMenuBtn" type="button" onClick={() => setMobileNavOpen(true)}>
            <Icon name="menu" /> תפריט
          </button>
        </div>

        {mobileNavOpen && (
          <div className="mobileNavBackdrop" onClick={() => setMobileNavOpen(false)} role="dialog" aria-modal="true">
            <div className="mobileNavSheet" onClick={(e) => e.stopPropagation()}>
              <div className="mobileNavTop">
                <div className="mobileNavTitle">
                  <b>תפריט</b>
                  <span>בחר יעד</span>
                </div>
                <button className="btn btnGhost" type="button" onClick={() => setMobileNavOpen(false)}>
                  <Icon name="close" /> סגור
                </button>
              </div>

              <div className="mobileNavList">
                <button className="mobileNavItem" type="button" onClick={() => go("services")}>
                  שירותים
                </button>
                <button className="mobileNavItem" type="button" onClick={() => go("gallery")}>
                  עבודות
                </button>
                <button className="mobileNavItem" type="button" onClick={() => go("contact")}>
                  הצעת מחיר
                </button>
                <a className="mobileNavItem" href={SOCIALS.instagram} target="_blank" rel="noreferrer">
                  אינסטגרם
                </a>
                <a className="mobileNavItem" href={SOCIALS.facebook} target="_blank" rel="noreferrer">
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

      <section className="hero" id="top">
        <div className="heroBg" style={{ backgroundImage: `url(${heroImg})` }} aria-hidden />
        <div className="heroOverlay" aria-hidden />
        <div className="heroNoise" aria-hidden />
        <div className="container heroInner">
          <div className="pillsRow">
            <span className="pill">
              <span className="dot" /> זמינות מהירה
            </span>
            <span className="pill">
              <span className="dot" /> גימור נקי ומדויק
            </span>
            <span className="pill">
              <span className="dot" /> נהריה והסביבה
            </span>
          </div>

          <div className="heroGrid">
            <div>
              <Reveal>
                <h1 className="h1">
                  דשא סינטטי <span className="accent">פרימיום</span> וגינון מקצועי - תוצאה שנראית “וואו”.
                </h1>
              </Reveal>

              <Reveal className="delay1">
                <p className="sub">
                  התקנה נקייה, חיתוכים ועיקולים מדויקים, שילוב חיפויים ועיצוב לפי השטח.
                  שולחים תמונה בוואטסאפ ומקבלים מענה מהיר.
                </p>
              </Reveal>

              <Reveal className="delay2">
                <div className="ctaRow">
                  <a className="btn btnPrimary" href={WHATSAPP} target="_blank" rel="noreferrer">
                    וואטסאפ להצעת מחיר <span aria-hidden>→</span>
                  </a>
                  <a className="btn btnGhost" href={`tel:${PHONE_INT}`}>
                    <Icon name="phone" /> שיחה מהירה <span aria-hidden>→</span>
                  </a>
                </div>
              </Reveal>

              <Reveal className="delay3">
                <div className="ctaRow ctaRowSmall">
                  <a className="btn btnGhost" href={SOCIALS.instagram} target="_blank" rel="noreferrer">
                    אינסטגרם <span aria-hidden>→</span>
                  </a>
                  <a className="btn btnGhost" href={SOCIALS.facebook} target="_blank" rel="noreferrer">
                    פייסבוק <span aria-hidden>→</span>
                  </a>
                </div>
              </Reveal>

              <Reveal className="delay4">
                <div className="statsRow">
                  {STATS.map((s) => (
                    <div key={s.k} className="statCard">
                      <b className="statValue">{s.v}</b>
                      <span className="statKey">{s.k}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal>
              <div className="glass heroCard">
                <p className="heroCardTitle">מה תקבלו בעבודה של ירין</p>
                <div className="heroCardList">
                  {[
                    { title: "תכנון לפי השטח", desc: "התאמה לבית/בניין/רופטופ + פתרונות יפים לפינות ועיקולים." },
                    { title: "גימור קצוות מקצועי", desc: "חיתוכים מדויקים, מסגרות/אבנים וחיבור נקי לריצוף/קירות." },
                    { title: "ניקיון ופינוי בסוף עבודה", desc: "משאירים מסודר — שקט בראש, גינה יפה בעיניים." },
                  ].map((b) => (
                    <div key={b.title} className="bullet">
                      <div className="check" aria-hidden>✓</div>
                      <div>
                        <b>{b.title}</b>
                        <div className="bulletDesc">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ctaRow">
                  <button className="btn btnPrimary" type="button" onClick={() => go("contact")}>
                    אני רוצה הצעת מחיר <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <Reveal>
            <div className="sectionTitle">
              <div className="eyebrow">שירותים</div>
              <h2 className="h2">כל מה שהגינה צריכה — במקום אחד</h2>
              <p className="p">דשא סינטטי, השקיה, תחזוקה, גיזום ועיצוב — עם הקפדה על פרטים וגימור נקי.</p>
            </div>
          </Reveal>

          <div className="cards3">
            {services.map((s, i) => (
              <Reveal key={s.title} className={i % 3 === 1 ? "delay1" : i % 3 === 2 ? "delay2" : ""}>
                <div className="glass card">
                  <div className="cardHead">
                    <div className="icon" aria-hidden>
                      <Icon name={s.icon} />
                    </div>
                    <h3 className="cardTitle">{s.title}</h3>
                  </div>
                  <div className="small">{s.desc}</div>
                  <div className="ctaRow">
                    <a className="btn btnGhost" href={WHATSAPP} target="_blank" rel="noreferrer">
                      קבל הצעת מחיר <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="gallery">
        <div className="container">
          <Reveal>
            <div className="sectionTitle">
              <div className="eyebrow">עבודות</div>
              <h2 className="h2">תוצאות שמדברות בעד עצמן</h2>
              <p className="p">לחצו על תמונה כדי לפתוח במסך מלא.</p>
            </div>
          </Reveal>

          <div className="galleryTop">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`chip ${cat === c ? "chipActive" : ""}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="gallery">
            {filtered.map((item, idx) => (
              <Reveal key={`${item.title}-${idx}`}>
                <div
                  className="tile"
                  onClick={() => setLightbox({ open: true, item })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setLightbox({ open: true, item })}
                >
                  <img className="tileImg" src={item.src} alt={item.title} loading="lazy" />
                  <div className="tileOverlay" aria-hidden />
                  <div className="tileMeta">
                    <b>{item.title}</b>
                    <span>{item.tag}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="sectionTitle">
              <div className="eyebrow">איך זה עובד</div>
              <h2 className="h2">מהפנייה הראשונה ועד גינה מושלמת</h2>
              <p className="p">תהליך פשוט שמביא תוצאה יפה בלי כאב ראש.</p>
            </div>
          </Reveal>

          <div className="split">
            <Reveal>
              <div className="glass card">
                <div className="steps">
                  {[
                    { n: "1", t: "שולחים תמונה בוואטסאפ", d: "תמונה + מיקום + מה בדיוק רוצים." },
                    { n: "2", t: "מקבלים הערכה/תיאום", d: "מענה מהיר, ובמידת הצורך הגעה למדידה." },
                    { n: "3", t: "ביצוע נקי ומדויק", d: "עבודה מסודרת, גימור מקצועי ופינוי בסוף." },
                  ].map((s) => (
                    <div key={s.n} className="step">
                      <div className="stepNum" aria-hidden>{s.n}</div>
                      <div>
                        <b>{s.t}</b>
                        <div className="small">{s.d}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ctaRow">
                  <a className="btn btnPrimary" href={WHATSAPP} target="_blank" rel="noreferrer">
                    שלח הודעה עכשיו <span aria-hidden>→</span>
                  </a>
                  <a className="btn btnGhost" href={`tel:${PHONE_INT}`}>
                    שיחה מהירה <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal className="delay1">
              <div className="glass card">
                <b className="reviewsTitle">מה אומרים לקוחות</b>
                <div className="reviews">
                  {reviews.map((r) => (
                    <div key={r.name} className="review">
                      <b>{r.name}</b>
                      <p>“{r.text}”</p>
                    </div>
                  ))}
                </div>
                <div className="small" style={{ marginTop: 10 }}>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <Reveal>
            <div className="sectionTitle">
              <div className="eyebrow">הצעת מחיר</div>
              <h2 className="h2">שולחים פרטים וזה יוצא לוואטסאפ</h2>
              <p className="p">מומלץ לצרף: תמונה של השטח + מיקום + מה רוצים לעשות.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass card">
              <div className="form">
                <div className="row2">
                  <input
                    className="input"
                    placeholder="שם"
                    value={lead.name}
                    onChange={(e) => setLead((p) => ({ ...p, name: e.target.value }))}
                  />
                  <input
                    className="input"
                    placeholder="טלפון לחזרה"
                    value={lead.phone}
                    onChange={(e) => setLead((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>

                <textarea
                  className="textarea"
                  placeholder="מה צריך לעשות? (דשא סינטטי / השקיה / גיזום / תחזוקה וכו') + כתובת/אזור"
                  value={lead.message}
                  onChange={(e) => setLead((p) => ({ ...p, message: e.target.value }))}
                />

                <div className="formActions">
                  <button className="btn btnPrimary" type="button" onClick={sendToWhatsapp}>
                    שלח לוואטסאפ <span aria-hidden>→</span>
                  </button>
                  <a className="btn btnGhost" href={`tel:${PHONE_INT}`}>
                    <Icon name="phone" /> התקשר עכשיו <span aria-hidden>→</span>
                  </a>
                </div>

                <div className="small" style={{ textAlign: "center" }}>
                  טלפון: <b className="phoneStrong">{PHONE_LOCAL}</b> •{" "}
                  <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="socialLink">
                    אינסטגרם
                  </a>{" "}
                  •{" "}
                  <a href={SOCIALS.facebook} target="_blank" rel="noreferrer" className="socialLink">
                    פייסבוק
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="container footerInner">
          <div>© {new Date().getFullYear()} ירין אדלר - גינון בנהריה והסביבה</div>
          <div className="footerLinks">
            <a href={WHATSAPP} target="_blank" rel="noreferrer">וואטסאפ</a>
            <a href={`tel:${PHONE_INT}`}>{PHONE_LOCAL}</a>
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer">אינסטגרם</a>
            <a href={SOCIALS.facebook} target="_blank" rel="noreferrer">פייסבוק</a>
          </div>
        </div>
      </footer>

      <a className="waFloat" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="שלח הודעה בוואטסאפ">
        <span className="waPulse" aria-hidden />
        <Icon name="whatsapp" />
      </a>

      <div className="stickyCta">
        <div className="stickyCtaInner">
          <a className="btn btnPrimary" href={WHATSAPP} target="_blank" rel="noreferrer">
            וואטסאפ להצעת מחיר <span aria-hidden>→</span>
          </a>
          <a className="btn btnGhost" href={`tel:${PHONE_INT}`}>
            שיחה <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <Lightbox open={lightbox.open} item={lightbox.item} onClose={() => setLightbox({ open: false, item: null })} />
    </div>
  );
}
