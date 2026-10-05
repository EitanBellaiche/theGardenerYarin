import BeforeAfter from "../components/BeforeAfter";
import HeroVideo from "../components/HeroVideo";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import ProjectsSection from "../components/ProjectsSection";
import {
  BEFORE_AFTER,
  BRAND,
  SERVICE_PAGES,
  SERVICES,
  STRENGTHS,
  TESTIMONIALS,
  WHATSAPP,
  type WorkItem,
} from "../siteData";

import gishaAvif720 from "../assets/media/gisha-720.avif";
import gishaAvif941 from "../assets/media/gisha-941.avif";
import gishaWebp720 from "../assets/media/gisha-720.webp";
import gishaWebp941 from "../assets/media/gisha-941.webp";
import instAvif720 from "../assets/media/institutional-720.avif";
import instAvif950 from "../assets/media/institutional-950.avif";
import instWebp720 from "../assets/media/institutional-720.webp";
import instWebp950 from "../assets/media/institutional-950.webp";

const STAGES = ["תכנון", "פיתוח", "הקמה", "תחזוקה"];

const INSTITUTIONAL = SERVICE_PAGES["development-infrastructure"];
const INSTITUTIONAL_MAINTENANCE_PAGE = SERVICE_PAGES["institutional-maintenance"];
// High-level summary for the home page; the full lists live on the institutional pages.
const INSTITUTIONAL_CAPABILITIES = ["פיתוח שטח", "הכנת תשתיות", "פינוי מפגעים", "אחזקה ארוכת טווח"];

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export default function HomePage({
  onOpenPhoto,
}: {
  onOpenPhoto: (items: WorkItem[], index: number) => void;
}) {
  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <HeroVideo />
        <div className="heroShade" aria-hidden />

        <div className="container heroInner">
          <div className="heroContent">
            <h1 id="hero-title" className="heroEyebrow heroBrandTitle">
              {BRAND}
            </h1>
            <p className="heroTitleMain">
              <span className="heroWord">מתכננים.</span>{" "}
              <span className="heroWord">מפתחים.</span>{" "}
              <em className="heroWord">מטפחים.</em>
            </p>

            <p className="heroSub">לבתים פרטיים, לעסקים, למוסדות ולמגזר הציבורי.</p>

            <a className="heroChevron" href="#intro" aria-label="גלילה לתוכן">
              <Icon name="chevronDown" size={26} />
            </a>

            <div className="heroActions">
              <a className="btn btnLight" href={WHATSAPP} target="_blank" rel="noreferrer">
                <Icon name="whatsapp" /> קבלו הצעה
              </a>
              <a className="btn btnGhostLight" href="#projects">
                לפרויקטים <Icon name="arrow" />
              </a>
            </div>
          </div>
        </div>

        <a className="scrollCue" href="#intro" aria-label="גלילה לתוכן">
          <span aria-hidden />
        </a>
      </section>

      {/* --------------------------------------------------------- Approach */}
      {/* Typography lives in the sky of the "gisha" photograph; the photo's
          top dissolves into the section cream so the two read as one. */}
      <section id="intro" className="approach" aria-labelledby="intro-title">
        <div className="container approachContent">
          <Reveal>
            <p className="eyebrow">הגישה</p>
            {/* Lines are explicit so the headline never wraps by accident. */}
            <h2 id="intro-title" className="approachTitle">
              <span>מהרעיון</span> <span>ועד לגינה.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="approachText">
              <span>תכנון, פיתוח, הקמה ותחזוקה</span> <span>לפרטי, לעסקי ולמוסדי.</span>
            </p>
            <ul className="approachIndex" aria-label="שלבי העבודה">
              {STAGES.map((stage) => (
                <li key={stage}>{stage}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="approachMedia">
          <picture>
            <source
              type="image/avif"
              srcSet={`${gishaAvif720} 720w, ${gishaAvif941} 941w`}
              sizes="(max-width: 899px) 100vw, 64vw"
            />
            <img
              src={gishaWebp941}
              srcSet={`${gishaWebp720} 720w, ${gishaWebp941} 941w`}
              sizes="(max-width: 899px) 100vw, 64vw"
              width={941}
              height={1672}
              alt="גינה מעוצבת עם עץ זית, צמחייה ים־תיכונית ומרפסת אבן, מול נוף פתוח לים בשעת שקיעה"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <span className="approachVeil" aria-hidden />
        </div>
      </section>

      {/* --------------------------------------------------------- Services */}
      {/* One ruled index of the five services; details live on each page. */}
      <section id="services" className="hServices" aria-labelledby="services-title">
        <div className="container">
          <Reveal className="servicesHead">
            <p className="eyebrow">שירותים</p>
            <h2 id="services-title" className="displayHeading">
              תחומי עבודה:
            </h2>
          </Reveal>

          <ol className="serviceIndex">
            {SERVICES.map((service, index) => (
              <li key={service.href}>
                <Reveal delay={index * 60}>
                  <a className="serviceRow" href={service.href}>
                    <span className="serviceNum" aria-hidden>
                      {pad(index)}
                    </span>
                    <div className="serviceName">
                      <h3>{service.title}</h3>
                      <p className="serviceMeta">
                        {service.audience}
                        {service.area && <b>{service.area}</b>}
                      </p>
                    </div>
                    <p className="serviceSummary">{service.summary}</p>
                    <Icon name="arrow" />
                  </a>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------- Institutional */}
      {/* Typography sits in the photograph's dark negative space; the lit
          landscaping emerges beneath it and its dark top dissolves into the
          section's forest green. */}
      <section className="hInstitutional" aria-labelledby="institutional-title">
        <div className="container instContent">
          <Reveal>
            <p className="instEyebrow">
              למוסדות ולמגזר הציבורי
              <span>פריסה ארצית</span>
            </p>
            {/* Lines are explicit so the headline never wraps by accident. */}
            <h2 id="institutional-title" className="instTitle">
              <span>פיתוח, תשתיות</span> <span>ועבודות שטח.</span>
            </h2>
            <p className="instText">
              <span>פיתוח, הקמה ואחזקה לעיריות,</span>{" "}
              <span>מוסדות חינוך, מפעלים וחברות.</span>
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="instActions">
              <a className="btn btnLight" href={INSTITUTIONAL.path}>
                פיתוח ותשתיות <Icon name="arrow" />
              </a>
              <a className="instSecondary" href={INSTITUTIONAL_MAINTENANCE_PAGE.path}>
                אחזקה למוסדות ולשטחים ציבוריים
              </a>
            </div>

            <ul className="instCapabilities" aria-label="יכולות ביצוע">
              {INSTITUTIONAL_CAPABILITIES.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="instMedia" aria-hidden>
          <picture>
            <source
              type="image/avif"
              srcSet={`${instAvif720} 720w, ${instAvif950} 950w`}
              sizes="(max-width: 899px) 100vw, 62vw"
            />
            <img
              src={instWebp950}
              srcSet={`${instWebp720} 720w, ${instWebp950} 950w`}
              sizes="(max-width: 899px) 100vw, 62vw"
              width={950}
              height={1656}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </picture>
          <span className="instVeil" />
        </div>
      </section>

      {/* -------------------------------------------------------- Portfolio */}
      <ProjectsSection onOpenPhoto={onOpenPhoto} />

      {/* ----------------------------------------------------- Before/after */}
      {BEFORE_AFTER.length > 0 && (
        <section className="section beforeAfter" aria-labelledby="ba-title">
          <div className="container">
            <Reveal className="sectionHead">
              <p className="eyebrow">לפני ואחרי</p>
              <h2 id="ba-title" className="h2">
                ההבדל נמצא בפרטים
              </h2>
            </Reveal>
            <div className="baGrid">
              {BEFORE_AFTER.map((pair) => (
                <Reveal key={pair.id}>
                  <BeforeAfter pair={pair} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------ About */}
      <section id="about" className="hAbout" aria-labelledby="about-title">
        <div className="container hAboutLayout">
          <Reveal className="hAboutHead">
            <p className="eyebrow">אודות</p>
            <h2 id="about-title" className="displayHeading">
              מגינה פרטית ועד מתחם ציבורי.
            </h2>
          </Reveal>

          <ol className="strengthList">
            {STRENGTHS.map((strength, index) => (
              <li key={strength.title}>
                <Reveal delay={index * 80}>
                  <span className="strengthNum" aria-hidden>
                    {pad(index)}
                  </span>
                  <h3>{strength.title}</h3>
                  <p>{strength.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>

        </div>
      </section>

      {/* ----------------------------------------------------- Testimonials */}
      {TESTIMONIALS.length > 0 && (
        <section id="testimonials" className="section testimonials" aria-labelledby="testimonials-title">
          <div className="container">
            <Reveal className="sectionHead">
              <p className="eyebrow">המלצות</p>
              <h2 id="testimonials-title" className="h2">
                מה אומרים הלקוחות
              </h2>
            </Reveal>
            <div className="testimonialGrid">
              {TESTIMONIALS.map((testimonial, index) => (
                <Reveal key={`${testimonial.name}-${index}`} delay={index * 80}>
                  <figure className="testimonial">
                    <blockquote>{testimonial.quote}</blockquote>
                    <figcaption>
                      <b>{testimonial.name}</b>
                      {testimonial.context && <span>{testimonial.context}</span>}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
