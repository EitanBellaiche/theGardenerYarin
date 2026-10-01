import { SERVICES } from "../siteData";

/** Shown for any URL without a page; Cloudflare Pages serves it from 404.html with HTTP 404. */
export default function NotFoundPage() {
  return (
    <section className="a11yStatement" aria-labelledby="not-found-title">
      <div className="container a11yStatementInner">
        <p className="eyebrow eyebrowLight">404</p>
        <h1 id="not-found-title" className="displayHeading">
          העמוד לא נמצא
        </h1>

        <div className="a11yProse">
          <p>
            ייתכן שהקישור שגוי או שהעמוד הועבר. אפשר לחזור <a href="/">לעמוד הבית</a> או לעבור
            לאחד מתחומי העבודה:
          </p>
          <ul>
            {SERVICES.map((service) => (
              <li key={service.href}>
                <a href={service.href}>{service.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
