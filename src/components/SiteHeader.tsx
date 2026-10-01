import { type CSSProperties, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import {
  BRAND,
  BRAND_SHORT,
  PHONE_INT,
  PHONE_LOCAL,
  MORE_PAGES,
  SERVICES,
  SOCIALS,
  TESTIMONIALS,
} from "../siteData";

import logoMark from "../assets/media/logo-mark-white.png";

// Section links point at the home page so they work from every page;
// "#contact" is local because every page ends with the contact section.
const LINKS_BEFORE_SERVICES = [
  { href: "/", label: "ראשי" },
  { href: "/#about", label: "אודות" },
];
const LINKS_AFTER_SERVICES = [
  { href: "/#projects", label: "פרויקטים" },
  ...(TESTIMONIALS.length > 0 ? [{ href: "/#testimonials", label: "המלצות" }] : []),
  { href: "#contact", label: "צור קשר" },
];

export default function SiteHeader({
  scrolled,
  menuOpen,
  onMenuChange,
  whatsappHref,
}: {
  scrolled: boolean;
  menuOpen: boolean;
  onMenuChange: (open: boolean) => void;
  whatsappHref: string;
}) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Desktop services dropdown: close on outside click or Escape.
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  // Mobile menu: lock scroll, move focus in, Escape closes, focus returns.
  useEffect(() => {
    if (!menuOpen) return;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    firstMenuLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onMenuChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      menuButton?.focus({ preventScroll: true });
    };
  }, [menuOpen, onMenuChange]);

  const closeMenu = () => onMenuChange(false);
  let menuIndex = 0;

  return (
    <>
      <header className={`siteHeader ${scrolled ? "isScrolled" : ""}`}>
        <div className="container headerInner">
          <a className="brand" href="/" aria-label={`${BRAND} - לעמוד הבית`}>
            <img className="brandMark" src={logoMark} alt="" width={40} height={40} />
            <span className="brandName">{BRAND_SHORT}</span>
          </a>

          <nav className="desktopNav" aria-label="ניווט ראשי">
            {LINKS_BEFORE_SERVICES.map((link) => (
              <a key={link.href} className="navLink" href={link.href}>
                {link.label}
              </a>
            ))}

            <div
              ref={servicesRef}
              className={`navGroup ${servicesOpen ? "isOpen" : ""}`}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="navLink navToggle"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((open) => !open)}
              >
                שירותים
                <span className="navCaret" aria-hidden />
              </button>
              <div id="services-menu" className="navPanel">
                <div className="navPanelGroup">
                  <p className="navPanelTitle">שירותים</p>
                  <ol className="navServices">
                    {SERVICES.map((service) => (
                      <li key={service.href}>
                        <a href={service.href} onClick={() => setServicesOpen(false)}>
                          {service.navLabel}
                          <small>{service.area ?? service.audience}</small>
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="navPanelGroup navPanelMore">
                  <p className="navPanelTitle">עוד באתר</p>
                  <ul>
                    {MORE_PAGES.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} onClick={() => setServicesOpen(false)}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {LINKS_AFTER_SERVICES.map((link) => (
              <a key={link.href} className="navLink" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a className="headerCta" href={whatsappHref} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" /> וואטסאפ
          </a>

          <button
            ref={menuButtonRef}
            className="menuButton"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => onMenuChange(true)}
          >
            <span>תפריט</span>
            <Icon name="menu" size={22} />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobileMenu ${menuOpen ? "isOpen" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="תפריט"
        inert={!menuOpen}
      >
        <div className="mobileMenuTop">
          <img className="brandMark" src={logoMark} alt="" width={40} height={40} />
          <button className="menuClose" type="button" onClick={closeMenu}>
            <span>סגירה</span>
            <Icon name="close" size={22} />
          </button>
        </div>

        <nav className="mobileMenuNav" aria-label="ניווט ראשי">
          {LINKS_BEFORE_SERVICES.map((link) => {
            const index = menuIndex++;
            return (
              <a
                key={link.href}
                ref={index === 0 ? firstMenuLinkRef : undefined}
                href={link.href}
                onClick={closeMenu}
                style={{ "--i": index } as CSSProperties}
              >
                {link.label}
              </a>
            );
          })}

          <div className="mobileMenuServices" style={{ "--i": menuIndex++ } as CSSProperties}>
            <a href="/#services" onClick={closeMenu}>
              שירותים
            </a>
            <ol className="mobileMenuList">
              {SERVICES.map((service) => (
                <li key={service.href}>
                  <a href={service.href} onClick={closeMenu}>
                    {service.navLabel}
                  </a>
                </li>
              ))}
            </ol>
            <ul className="mobileMenuMore" aria-label="עוד באתר">
              {MORE_PAGES.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={closeMenu}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {LINKS_AFTER_SERVICES.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{ "--i": menuIndex++ } as CSSProperties}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mobileMenuFoot">
          <a className="btn btnLight btnBlock" href={whatsappHref} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" /> שלחו הודעה בוואטסאפ
          </a>
          <a className="btn btnOutlineLight btnBlock" href={`tel:${PHONE_INT}`}>
            <Icon name="phone" /> {PHONE_LOCAL}
          </a>
          <div className="mobileMenuSocial">
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer">
              אינסטגרם
            </a>
            <a href={SOCIALS.facebook} target="_blank" rel="noreferrer">
              פייסבוק
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
