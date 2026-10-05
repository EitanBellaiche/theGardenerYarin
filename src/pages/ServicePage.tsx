import Icon from "../components/Icon";
import ProjectsSection from "../components/ProjectsSection";
import Reveal from "../components/Reveal";
import WorkImage from "../components/WorkImage";
import {
  INSTITUTIONAL_CLIENTS,
  INSTITUTIONAL_MAINTENANCE,
  INSTITUTIONAL_PROCESS,
  LOCAL_PAGES,
  PHONE_INT,
  PHONE_LOCAL,
  SERVICE_PAGES,
  STRENGTHS,
  type ServicePage as ServicePageData,
  type WorkItem,
} from "../siteData";

import logoMark from "../assets/media/logo-mark-white.png";

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

const AUDIENCE_LABELS: Record<ServicePageData["audience"], string> = {
  private: "לגינות פרטיות",
  institutional: "למוסדות ולמגזר הציבורי",
  general: "עבודות מורכבות",
};

export default function ServicePage({
  page,
  whatsappHref,
  onOpenPhoto,
}: {
  page: ServicePageData;
  whatsappHref: string;
  onOpenPhoto: (items: WorkItem[], index: number) => void;
}) {
  const isInstitutional = page.audience === "institutional";
  const related = page.related.map((key) => SERVICE_PAGES[key]);
  // The nationwide development page links to the local hub via `related` only.
  const localLinks =
    page.audience !== "private" || page.key === "garden-development"
      ? []
      : LOCAL_PAGES.filter(
          (link) => link.href !== page.path && !related.some((item) => item.path === link.href)
        );

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section
        className={`svcHero ${page.heroPhoto ? "" : "svcHeroInstitutional"}`}
        aria-labelledby="page-title"
      >
        {page.heroPhoto ? (
          <WorkImage className="svcHeroImg" photo={page.heroPhoto} sizes="100vw" eager />
        ) : (
          <img className="svcHeroMark" src={logoMark} alt="" width={192} height={192} aria-hidden />
        )}
        <div className="svcHeroShade" aria-hidden />

        <div className="container svcHeroInner">
          <nav className="crumbs" aria-label="מיקום באתר">
            <ol>
              <li>
                <a href="/">ראשי</a>
              </li>
              <li>
                <a href="/#services">שירותים</a>
              </li>
              <li aria-current="page">{page.label}</li>
            </ol>
          </nav>

          <h1 id="page-title" className="heroTitle">
            <span className="heroEyebrow">{page.eyebrow}</span>
            <span className="svcTitle">{page.h1}</span>
          </h1>
          <p className="svcIntro">{page.intro}</p>

          {isInstitutional && (
            <ul className="clientList" aria-label="סוגי לקוחות">
              {INSTITUTIONAL_CLIENTS.map((client) => (
                <li key={client}>{client}</li>
              ))}
            </ul>
          )}

          <div className="svcActions">
            <a className="btn btnLight" href={whatsappHref} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" /> {isInstitutional ? "פנייה לגבי פרויקט" : "קבלו הצעה"}
            </a>
            <a className="btn btnOutlineLight" href={`tel:${PHONE_INT}`}>
              <Icon name="phone" /> {PHONE_LOCAL}
            </a>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Scope */}
      <section className="section scope" aria-labelledby="scope-title">
        <div className="container">
          <Reveal className="sectionHead">
            <p className="eyebrow">{page.label}</p>
            <h2 id="scope-title" className="h2">
              {page.scopeTitle}
            </h2>
          </Reveal>

          <ol className="scopeGrid">
            {page.scope.map((item, index) => (
              <li key={item.title}>
                <Reveal className="scopeItem" delay={(index % 2) * 70}>
                  <span className="scopeNum" aria-hidden>
                    {pad(index)}
                  </span>
                  <div>
                    <h3>{item.href ? <a href={item.href}>{item.title}</a> : item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                  {item.href && (
                    <a className="serviceLink" href={item.href} tabIndex={-1} aria-hidden>
                      לפרטים <Icon name="arrow" />
                    </a>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------ Photos (private) */}
      {page.photos.length > 0 && (
        <section className="section gallery svcGallery" aria-labelledby="work-title">
          <div className="container">
            <Reveal className="sectionHead">
              <p className="eyebrow">פרויקטים פרטיים</p>
              <h2 id="work-title" className="h2 h2Compact">
                עבודות מהשטח
              </h2>
            </Reveal>
          </div>
          <ul className="galleryStrip galleryStripEven">
            {page.photos.map((item, index) => (
              <li key={item.id} className="galleryItem">
                <button
                  type="button"
                  className="galleryButton"
                  onClick={() => onOpenPhoto(page.photos, index)}
                  aria-label={`הגדלת התמונה: ${item.title}`}
                >
                  <WorkImage photo={item.photo} sizes="(max-width: 899px) 78vw, 25vw" />
                  <span className="galleryCaption" aria-hidden>
                    <small>{item.kind}</small>
                    {item.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ------------------------------------- Projects (same as home) */}
      <ProjectsSection onOpenPhoto={onOpenPhoto} />

      {/* ------------------------------ Institutional: maintenance + why */}
      {isInstitutional && (
        <>
          {/* Kept at #maintenance so older links still land on this pointer. */}
          {page.key === "development-infrastructure" && (
            <section id="maintenance" className="section svcBand" aria-labelledby="maintenance-title">
              <div className="container svcBandLayout">
                <Reveal>
                  <p className="eyebrow eyebrowLight">אחזקה</p>
                  <h2 id="maintenance-title" className="aboutStatement">
                    {INSTITUTIONAL_MAINTENANCE.title}
                  </h2>
                </Reveal>
                <Reveal delay={100}>
                  <p className="aboutLead">{INSTITUTIONAL_MAINTENANCE.body}</p>
                  <a
                    className="btn btnLight svcBandCta"
                    href={SERVICE_PAGES["institutional-maintenance"].path}
                  >
                    לאחזקה למוסדות <Icon name="arrow" />
                  </a>
                  <p className="svcBandNote">
                    מחפשים אחזקה לגינה פרטית?{" "}
                    <a href={SERVICE_PAGES["garden-maintenance-nahariya"].path}>
                      אחזקת גינות פרטיות בצפון
                    </a>
                  </p>
                </Reveal>
              </div>
            </section>
          )}

          <section className="section svcWhy" aria-labelledby="why-title">
            <div className="container svcWhyLayout">
              <div>
                <Reveal className="sectionHead">
                  <p className="eyebrow">למה לעבוד איתנו</p>
                  <h2 id="why-title" className="h2 h2Compact">
                    יכולת ביצוע, אחריות ותקשורת ישירה
                  </h2>
                </Reveal>
                <ol className="principles principlesDark">
                  {STRENGTHS.map((strength, index) => (
                    <li key={strength.title}>
                      <Reveal delay={index * 80}>
                        <span className="principleNum" aria-hidden>
                          {pad(index)}
                        </span>
                        <h3>{strength.title}</h3>
                        <p>{strength.body}</p>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <Reveal className="sectionHead">
                  <p className="eyebrow">תהליך העבודה</p>
                  <h2 className="h2 h2Compact">מהפנייה ועד הביצוע</h2>
                </Reveal>
                <ol className="processList">
                  {INSTITUTIONAL_PROCESS.map((step, index) => (
                    <li key={step.title}>
                      <Reveal delay={index * 80}>
                        <span className="processNum" aria-hidden>
                          {pad(index)}
                        </span>
                        <h3>{step.title}</h3>
                        <p>{step.body}</p>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ------------------------------------------------ Page SEO content */}
      <section className="section info" aria-labelledby="content-title">
        <div className="container">
          <Reveal className="sectionHead">
            <h2 id="content-title" className="h2 h2Compact">
              {page.sectionsTitle}
            </h2>
          </Reveal>
          <div className="infoGrid">
            {page.sections.map((section, index) => (
              <Reveal key={section.title} className="infoItem" delay={(index % 2) * 80}>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Area + related */}
      <section className="section svcMore" aria-labelledby="area-title">
        <div className="container svcMoreLayout">
          <Reveal className="svcArea">
            <p className="eyebrow">אזורי שירות</p>
            <h2 id="area-title" className="h2 h2Compact">
              {page.area.title}
            </h2>
            <p className="lead">{page.area.body}</p>
          </Reveal>

          <Reveal className="relatedLinks" delay={100}>
            <p className="infoLinksLabel">שירותים נוספים</p>
            <ul>
              {related.map((item) => (
                <li key={item.key}>
                  <a href={item.path}>
                    <span>
                      <small>{AUDIENCE_LABELS[item.audience]}</small>
                      {item.label}
                    </span>
                    <Icon name="arrow" />
                  </a>
                </li>
              ))}
              {localLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>
                    <span>
                      <small>אזורי</small>
                      {link.label}
                    </span>
                    <Icon name="arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
