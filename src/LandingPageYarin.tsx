import { useEffect, useState, useSyncExternalStore } from "react";
import "./LandingPageYarin.css";

import AccessibilityMenu from "./components/AccessibilityMenu";
import ContactSection from "./components/ContactSection";
import Icon from "./components/Icon";
import Lightbox from "./components/Lightbox";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import AccessibilityPage from "./pages/AccessibilityPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ServicePage from "./pages/ServicePage";
import {
  PHONE_INT,
  PHONE_LOCAL,
  WHATSAPP,
  type WorkItem,
  getServicePage,
  isAccessibilityPage,
  isHomePage,
  whatsappLink,
} from "./siteData";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

function useScrolledPast(getThreshold: () => number) {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > getThreshold(),
    () => false
  );
}

const headerThreshold = () => 24;
const heroThreshold = () => window.innerHeight * 0.7;

/**
 * Site shell: one entry point renders the home page or a service page by URL.
 * `pathname` is a prop (not window.location) so the build can prerender each route.
 */
export default function LandingPageYarin({ pathname }: { pathname: string }) {
  const servicePage = getServicePage(pathname);
  const accessibilityPage = isAccessibilityPage(pathname);
  const homePage = isHomePage(pathname);
  const currentPath =
    servicePage?.path ?? (accessibilityPage ? "/accessibility/" : homePage ? "/" : "");
  const whatsappHref = servicePage ? whatsappLink(servicePage.whatsappText) : WHATSAPP;

  const scrolled = useScrolledPast(headerThreshold);
  const pastHero = useScrolledPast(heroThreshold);

  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ items: WorkItem[]; index: number } | null>(null);
  const [contactInView, setContactInView] = useState(false);

  // The contact section repeats the same actions, so the sticky CTAs step aside there.
  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(
      ([entry]) => setContactInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const openPhoto = (items: WorkItem[], index: number) => setLightbox({ items, index });
  const showStickyCta = pastHero && !contactInView;

  return (
    <div className="site">
      <a className="skipLink" href="#main">
        דילוג לתוכן
      </a>

      <SiteHeader
        scrolled={scrolled}
        menuOpen={menuOpen}
        onMenuChange={setMenuOpen}
        whatsappHref={whatsappHref}
      />

      <main id="main">
        {servicePage ? (
          <ServicePage page={servicePage} whatsappHref={whatsappHref} onOpenPhoto={openPhoto} />
        ) : accessibilityPage ? (
          <AccessibilityPage />
        ) : homePage ? (
          <HomePage onOpenPhoto={openPhoto} />
        ) : (
          <NotFoundPage />
        )}
        <ContactSection
          defaultIntentId={servicePage?.intentId ?? "garden"}
          whatsappHref={whatsappHref}
        />
      </main>

      <SiteFooter currentPath={currentPath} />

      <a
        className={`waFloat ${showStickyCta ? "isVisible" : ""}`}
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="שליחת הודעה בוואטסאפ"
      >
        <Icon name="whatsapp" size={24} />
      </a>

      <div className={`mobileBar ${showStickyCta && !menuOpen ? "isVisible" : ""}`}>
        <a className="btn btnWood" href={whatsappHref} target="_blank" rel="noreferrer">
          <Icon name="whatsapp" /> הצעת מחיר בוואטסאפ
        </a>
        <a
          className="btn btnOutlineDark mobileBarCall"
          href={`tel:${PHONE_INT}`}
          aria-label={`התקשרו: ${PHONE_LOCAL}`}
        >
          <Icon name="phone" />
        </a>
      </div>

      <AccessibilityMenu />

      <Lightbox
        items={lightbox?.items ?? []}
        index={lightbox?.index ?? null}
        onClose={() => setLightbox(null)}
        onNavigate={(index) => setLightbox((current) => (current ? { ...current, index } : null))}
      />
    </div>
  );
}
