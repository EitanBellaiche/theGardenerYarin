// Google Ads conversion tracking. The gtag.js base tag itself is injected into
// every built page by vite.config.ts; this only sends events through it.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const WHATSAPP_LEAD_CONVERSION = "AW-18493632131/2syHCMz-kpIdEIPdufJE";
const WHATSAPP_HOSTS = new Set(["wa.me", "api.whatsapp.com"]);

// Never throws: a missing or blocked gtag must not get in the way of opening WhatsApp.
export function trackWhatsappLead() {
  try {
    window.gtag?.("event", "conversion", { send_to: WHATSAPP_LEAD_CONVERSION });
  } catch {
    // Tracking is best-effort.
  }
}

function isWhatsappLink(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  const link = target.closest("a[href]");
  if (!(link instanceof HTMLAnchorElement)) return false;
  try {
    return WHATSAPP_HOSTS.has(new URL(link.href).hostname);
  } catch {
    return false;
  }
}

// One document-level listener covers every WhatsApp link on the page, so a
// click is counted once however the link is nested. Only trusted (real user)
// clicks count; middle-click arrives as auxclick instead of click.
export function installWhatsappTracking() {
  const onClick = (event: MouseEvent) => {
    if (event.type === "auxclick" && event.button !== 1) return;
    if (event.isTrusted && isWhatsappLink(event.target)) trackWhatsappLead();
  };
  document.addEventListener("click", onClick, { capture: true });
  document.addEventListener("auxclick", onClick, { capture: true });
}
