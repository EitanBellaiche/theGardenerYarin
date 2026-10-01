import { type CSSProperties, type FormEvent, useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { INTENTS, PHONE_INT, PHONE_LOCAL, type IntentItem, whatsappLink } from "../siteData";

import ctaBackdrop from "../assets/media/hero-poster.webp";

export default function ContactSection({
  defaultIntentId,
  whatsappHref,
}: {
  defaultIntentId: string;
  whatsappHref: string;
}) {
  const initialIntent = INTENTS.find((intent) => intent.id === defaultIntentId) ?? INTENTS[0];
  const [activeIntent, setActiveIntent] = useState(initialIntent.id);
  const [lead, setLead] = useState({
    name: "",
    organization: "",
    phone: "",
    message: initialIntent.template,
  });
  const isInstitutional = activeIntent === "institutional";

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

  function sendToWhatsapp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = [
      "היי ירין, הגעתי מהאתר.",
      lead.name ? `שם: ${lead.name}` : null,
      isInstitutional && lead.organization ? `גוף / חברה: ${lead.organization}` : null,
      lead.phone ? `טלפון: ${lead.phone}` : null,
      lead.message ? `פרטים: ${lead.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(text), "_blank", "noreferrer");
  }

  return (
    <section
      id="contact"
      className="finalCta"
      aria-labelledby="contact-title"
      style={{ "--cta-image": `url(${ctaBackdrop})` } as CSSProperties}
    >
      <div className="container finalCtaLayout">
        <Reveal className="finalCtaText">
          <p className="eyebrow eyebrowLight">צור קשר</p>
          <h2 id="contact-title" className="finalCtaTitle">
            הגינה שאתם מדמיינים מתחילה כאן.
          </h2>
          <p className="finalCtaSub">ספרו לנו על השטח ועל הפרויקט, ונחזור אליכם עם הצעה.</p>

          <div className="finalCtaActions">
            <a className="btn btnLarge finalCtaWhatsapp" href={whatsappHref} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" size={20} /> שלחו הודעה בוואטסאפ
            </a>
            <a className="btn btnLarge finalCtaPhone" href={`tel:${PHONE_INT}`}>
              <Icon name="phone" size={18} /> {PHONE_LOCAL}
            </a>
          </div>
        </Reveal>

        <Reveal className="leadPanel" delay={120}>
          <form onSubmit={sendToWhatsapp} aria-labelledby="lead-title">
            <p id="lead-title" className="leadTitle">
              או כתבו כאן, וההודעה תיפתח מוכנה בוואטסאפ
            </p>

            <div className="intentRow" role="group" aria-label="סוג הפרויקט">
              {INTENTS.map((intent) => (
                <button
                  key={intent.id}
                  type="button"
                  className="intentChip"
                  aria-pressed={activeIntent === intent.id}
                  onClick={() => applyIntent(intent)}
                >
                  {intent.label}
                </button>
              ))}
            </div>

            <div className="fieldRow">
              <label className="field">
                <span>שם</span>
                <input
                  name="name"
                  autoComplete="name"
                  value={lead.name}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, name: event.target.value }))
                  }
                />
              </label>
              <label className="field">
                <span>טלפון</span>
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  dir="ltr"
                  value={lead.phone}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, phone: event.target.value }))
                  }
                />
              </label>
            </div>

            {isInstitutional && (
              <label className="field">
                <span>שם הגוף / החברה</span>
                <input
                  name="organization"
                  autoComplete="organization"
                  value={lead.organization}
                  onChange={(event) =>
                    setLead((current) => ({ ...current, organization: event.target.value }))
                  }
                />
              </label>
            )}

            <label className="field">
              <span>מה צריך לעשות?</span>
              <textarea
                name="message"
                rows={3}
                value={lead.message}
                onChange={(event) =>
                  setLead((current) => ({ ...current, message: event.target.value }))
                }
              />
            </label>

            <button className="btn btnWood btnBlock" type="submit">
              <Icon name="whatsapp" /> פתיחה בוואטסאפ
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
