import Icon from "./Icon";
import {
  BRAND,
  FOOTER_MORE_PAGES,
  PHONE_INT,
  PHONE_LOCAL,
  SERVICES,
  SOCIALS,
  WHATSAPP,
} from "../siteData";

import logoMark from "../assets/media/logo-mark-white.png";

export default function SiteFooter({ currentPath }: { currentPath: string }) {
  const current = (href: string) => (href === currentPath ? "page" : undefined);

  return (
    <footer className="siteFooter">
      <div className="container footerGrid">
        <div className="footerBrand">
          <img src={logoMark} alt="" width={48} height={48} loading="lazy" />
          <p className="footerName">{BRAND}</p>
        </div>

        <nav className="footerCol" aria-label="שירותים">
          <p className="footerLabel">שירותים</p>
          <ul>
            {SERVICES.map((service) => (
              <li key={service.href}>
                <a href={service.href} aria-current={current(service.href)}>
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footerCol" aria-label="עוד באתר">
          <p className="footerLabel">עוד באתר</p>
          <ul>
            {FOOTER_MORE_PAGES.map((link) => (
              <li key={link.href}>
                <a href={link.href} aria-current={current(link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footerCol">
          <p className="footerLabel">יצירת קשר</p>
          <ul>
            <li>
              <a href={`tel:${PHONE_INT}`}>
                <Icon name="phone" /> {PHONE_LOCAL}
              </a>
            </li>
            <li>
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                <Icon name="whatsapp" /> וואטסאפ
              </a>
            </li>
            <li>
              <a href={SOCIALS.instagram} target="_blank" rel="noreferrer">
                <Icon name="instagram" /> אינסטגרם
              </a>
            </li>
            <li>
              <a href={SOCIALS.facebook} target="_blank" rel="noreferrer">
                <Icon name="facebook" /> פייסבוק
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footerBottom">
        <p>
          © {new Date().getFullYear()} {BRAND}
        </p>
        <a href="/accessibility/" aria-current={current("/accessibility/")}>
          הצהרת נגישות
        </a>
      </div>
    </footer>
  );
}
