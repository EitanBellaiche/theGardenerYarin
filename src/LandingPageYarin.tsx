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
  alt: string;
};

type IntentItem = { id: string; label: string; template: string };

type SeoSection = {
  title: string;
  body: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type InternalLink = {
  href: string;
  label: string;
};

type PageKey =
  | "home"
  | "ganan-nahariya"
  | "ginun-nahariya"
  | "synthetic-grass-nahariya"
  | "garden-maintenance-nahariya"
  | "ganan-north";

type PageContent = {
  key: PageKey;
  path: string;
  eyebrow: string;
  h1: string;
  intro: string;
  secondaryIntro: string;
  sections: SeoSection[];
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    cat: "רופטופ",
    src: imgRooftop,
    title: "רופטופ נקי ומדויק",
    tag: "דשא סינטטי פרימיום",
    alt: "התקנת דשא סינטטי בנהריה על גג מרוצף",
  },
  {
    cat: "עיקולים",
    src: imgCurveHouse,
    title: "עיקולים שיושבים בול",
    tag: "חיבור מושלם לקירות",
    alt: "שדרוג גינה עם דשא סינטטי בנהריה בקווים מעוגלים",
  },
  {
    cat: "דקור",
    src: imgSmallIsland,
    title: "אי דשא עם חיפוי",
    tag: "שילוב אבנים ודשא",
    alt: "עבודת גינון בנהריה עם דשא סינטטי וחיפוי דקורטיבי",
  },
  {
    cat: "חצרות",
    src: imgBigTree,
    title: "חצר רחבה ומטופחת",
    tag: "מראה פתוח ונקי",
    alt: "עבודת גינון בנהריה בחצר רחבה ומסודרת",
  },
  {
    cat: "שבילים",
    src: imgYardStepping,
    title: "שבילי דריכה",
    tag: "עיצוב ושימושיות",
    alt: "שדרוג גינה בנהריה עם שבילי דריכה ודשא סינטטי",
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

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "האם אתם מבצעים עבודות גינון בנהריה?",
    answer:
      "כן. ירין אדלר גינון מבצע עבודות גינון בנהריה והסביבה, כולל שדרוג גינות, ניקוי, שתילות, גיזום וסידור חצרות.",
  },
  {
    question: "האם אתם מתקינים דשא סינטטי?",
    answer:
      "כן. אנחנו מבצעים התקנת דשא סינטטי בנהריה ובאזור, עם הכנת שטח, גימור נקי והתאמה לגינות, גגות, חצרות ושבילים.",
  },
  {
    question: "האם אפשר לקבל הצעת מחיר בוואטסאפ?",
    answer:
      "כן. אפשר לשלוח תמונות, מיקום ותיאור קצר בוואטסאפ ולקבל מענה מהיר והכוונה ראשונית לגבי העבודה.",
  },
  {
    question: "האם אתם עושים תחזוקת גינות לבתים פרטיים ובניינים?",
    answer:
      "כן. אנחנו נותנים שירותי תחזוקת גינות, טיפול בהשקיה, גיזום, ניקיון ושדרוג גם לבתים פרטיים וגם לבניינים ועסקים.",
  },
  {
    question: "באילו אזורים אתם עובדים?",
    answer:
      "אנחנו עובדים בעיקר בנהריה, בגליל המערבי ובאזור הצפון, ומגיעים גם לאזורים נוספים בכל הארץ לפי סוג העבודה והיקף הפרויקט.",
  },
  {
    question: "האם אתם נותנים שירות גם למי שמחפש גנן בצפון?",
    answer:
      "כן. אם אתם מחפשים גנן בצפון, זה אזור הפעילות המרכזי של ירין אדלר גינון, אבל במידת הצורך אפשר לתת שירות גם באזורים נוספים בארץ.",
  },
];

const INTERNAL_LINKS: InternalLink[] = [
  { href: "/ganan-nahariya", label: "גנן בנהריה" },
  { href: "/ginun-nahariya", label: "גינון בנהריה" },
  { href: "/synthetic-grass-nahariya", label: "דשא סינטטי בנהריה" },
  { href: "/garden-maintenance-nahariya", label: "תחזוקת גינות בנהריה" },
  { href: "/ganan-north", label: "גנן בצפון" },
];

const PAGE_CONTENT: Record<PageKey, PageContent> = {
  home: {
    key: "home",
    path: "/",
    eyebrow: "גנן בנהריה והסביבה",
    h1: "גנן בנהריה לעבודות גינון ודשא סינטטי",
    intro:
      "ירין אדלר גינון מבצע עבודות גינון בנהריה, התקנת דשא סינטטי, שדרוג חצרות, תחזוקת גינות, גיזום וטיפול בהשקיה עם גימור נקי ומענה מהיר.",
    secondaryIntro:
      "השירות ניתן בעיקר בנהריה, עכו, הקריות, שלומי, מעלות ואזור הצפון, עם הגעה גם לאזורים נוספים בכל הארץ לפי סוג העבודה.",
    sections: [
      {
        title: "גינון בנהריה והסביבה",
        body:
          "אם אתם מחפשים גנן בנהריה לעבודות מסודרות, המטרה היא לא רק לבצע עבודה נקודתית אלא להשאיר גינה שנראית טוב גם אחרי שהעבודה נגמרת. השירות כולל שדרוג גינות, סידור חצרות, חיפויים, שבילי דריכה והתאמה לשטח הקיים.",
      },
      {
        title: "התקנת דשא סינטטי בנהריה",
        body:
          "דשא סינטטי בנהריה מתאים לגינות פרטיות, חצרות, גגות ואזורים שרוצים בהם מראה נקי ונוח לתחזוקה. העבודה כוללת הכנת שטח, התאמת חיבורים וגימור מדויק כדי שהתוצאה תיראה טבעית ומסודרת.",
      },
      {
        title: "תחזוקת גינות, השקיה וגיזום",
        body:
          "מעבר להקמות ושדרוגים, אנחנו מבצעים תחזוקת גינות בנהריה, טיפול במערכות השקיה, תיקונים, גיזום וניקוי עשבייה. זה מתאים ללקוחות שרוצים לשמור על גינה מטופחת לאורך זמן בלי לאבד שליטה על המראה והתפקוד שלה.",
      },
      {
        title: "למה לבחור בירין אדלר גינון",
        body:
          "הדגש הוא על עבודות אמיתיות, תקשורת ישירה, הגעה מסודרת וגימור נקי. במקום הבטחות כלליות, אפשר לראות דוגמאות לעבודות, לשלוח תמונות בוואטסאפ ולקבל כיוון מהיר לפי סוג השטח והצורך בפועל.",
      },
      {
        title: "גנן בצפון עם דגש על נהריה והסביבה",
        body:
          "מי שמחפש גנן בצפון בדרך כלל צריך זמינות והיכרות אמיתית עם האזור. לכן הדגש הוא על נהריה, עכו, הקריות, שלומי, מעלות והסביבה, לצד אפשרות להגיע גם לעבודות מתאימות באזורים נוספים בארץ.",
      },
    ],
  },
  "ganan-nahariya": {
    key: "ganan-nahariya",
    path: "/ganan-nahariya",
    eyebrow: "עמוד מידע מקומי",
    h1: "גנן בנהריה לעבודות גינון, השקיה ודשא סינטטי",
    intro:
      "אם אתם מחפשים גנן בנהריה, ירין אדלר גינון מבצע עבודות מסודרות לבתים פרטיים, בניינים וחצרות עם דגש על תוצאה נקייה ושירות ישיר.",
    secondaryIntro:
      "העבודה כוללת שדרוג גינות, מערכות השקיה, תחזוקה, גיזום והתקנת דשא סינטטי בנהריה והסביבה.",
    sections: [
      {
        title: "שירות גינון מקומי בנהריה",
        body:
          "כאשר מחפשים גנן בנהריה, חשוב לעבוד עם מי שמכיר את האזור ויודע לתת פתרון מהיר ומדויק. השירות מתאים לחצרות פרטיות, אזורי כניסה, גינות גג ושטחים משותפים.",
      },
      {
        title: "עבודות גינון לפי הצורך בשטח",
        body:
          "לא כל גינה צריכה אותו פתרון. לפעמים מדובר בשדרוג חזותי עם דשא סינטטי וחיפויים, ולפעמים צריך תחזוקת גינות, השקיה, גיזום או ניקוי יסודי. המטרה היא להתאים את העבודה למה שבאמת צריך.",
      },
      {
        title: "דרך נוחה לקבל הצעת מחיר",
        body:
          "אפשר לשלוח תמונות של השטח בוואטסאפ, לצרף מיקום ותיאור קצר, ולקבל כיוון ראשוני מהיר. כך אפשר להבין אם מדובר בעבודת גינון מלאה, תחזוקה שוטפת או התקנה נקודתית.",
      },
    ],
  },
  "ginun-nahariya": {
    key: "ginun-nahariya",
    path: "/ginun-nahariya",
    eyebrow: "עמוד מידע מקומי",
    h1: "גינון בנהריה לבתים פרטיים, בניינים וחצרות",
    intro:
      "שירותי גינון בנהריה צריכים להיות גם אסתטיים וגם פרקטיים. ירין אדלר גינון מבצע עבודות שמטרתן לשפר את המראה, השימושיות והתחזוקה של הגינה.",
    secondaryIntro:
      "זה כולל שדרוג חצרות, סידור שטח, חיפויים, שבילים, השקיה ופתרונות משלימים לפי מצב הגינה והתקציב.",
    sections: [
      {
        title: "תכנון עבודה לפי מצב הגינה",
        body:
          "במקום פתרון גנרי, העבודה מתחילה מהבנת השטח: מה כבר קיים, מה מפריע, ומה אפשר לשדרג כדי לקבל גינה נעימה וקלה יותר לתחזוקה.",
      },
      {
        title: "גינון בנהריה עם גימור נקי",
        body:
          "הדגש הוא על קווים מסודרים, שילוב חומרים נכון ועבודה שמשאירה את המקום מסודר ומוכן לשימוש. זה נכון גם לשדרוג קטן וגם לעבודה רחבה יותר.",
      },
      {
        title: "שילוב עם תחזוקה והשקיה",
        body:
          "במקרים רבים כדאי לשלב את עבודת הגינון עם בדיקת השקיה, גיזום או הכנת אזורים לדשא סינטטי, כדי שהתוצאה תחזיק לאורך זמן ולא תדרוש תיקונים מיידיים.",
      },
    ],
  },
  "synthetic-grass-nahariya": {
    key: "synthetic-grass-nahariya",
    path: "/synthetic-grass-nahariya",
    eyebrow: "עמוד מידע מקומי",
    h1: "התקנת דשא סינטטי בנהריה עם גימור נקי",
    intro:
      "מחפשים דשא סינטטי בנהריה? ירין אדלר גינון מבצע התקנת דשא סינטטי לגינות, חצרות, גגות ואזורים דקורטיביים עם הכנת שטח וגימור מדויק.",
    secondaryIntro:
      "המטרה היא לקבל מראה מסודר, נעים לעין וקל יותר לתחזוקה, בלי לוותר על התאמה נכונה לשטח הקיים.",
    sections: [
      {
        title: "מתי דשא סינטטי הוא פתרון נכון",
        body:
          "דשא סינטטי מתאים למי שרוצה אזור ירוק קבוע, גינה שנראית מסודרת לאורך השנה או פתרון נוח יותר לתחזוקה בחצרות פעילות ובגגות.",
      },
      {
        title: "התקנה טובה מתחילה בתשתית",
        body:
          "ההבדל בין עבודה שנראית טוב לזמן קצר לבין תוצאה איכותית הוא בהכנת השטח, חיבורים מדויקים וגימור מסודר בקצוות, בעיקולים ובמפגשים עם ריצוף וקירות.",
      },
      {
        title: "שילוב עם עבודות גינון נוספות",
        body:
          "לעיתים נכון לשלב את הדשא הסינטטי עם חיפויים, שבילי דריכה, ניקוי אזורים קיימים או התאמות השקיה. כך הגינה מקבלת מראה שלם ולא רק התקנה נקודתית.",
      },
    ],
  },
  "garden-maintenance-nahariya": {
    key: "garden-maintenance-nahariya",
    path: "/garden-maintenance-nahariya",
    eyebrow: "עמוד מידע מקומי",
    h1: "תחזוקת גינות בנהריה, השקיה וגיזום",
    intro:
      "שירותי תחזוקת גינות בנהריה מתאימים למי שרוצה לשמור על גינה מטופחת, נקייה ומתפקדת לאורך זמן בלי להמתין עד שהשטח יוצא משליטה.",
    secondaryIntro:
      "השירות כולל טיפול בהשקיה, גיזום, ניקוי עשבייה, סידור שטח ושמירה על מראה מסודר לבתים פרטיים, בניינים ושטחים משותפים.",
    sections: [
      {
        title: "תחזוקה שוטפת לפי קצב הגינה",
        body:
          "יש גינות שצריכות תחזוקה שוטפת, ויש מקומות שדורשים התערבות נקודתית אחרי תקופה ארוכה. העבודה מותאמת למצב הקיים ולסוג השימוש בגינה.",
      },
      {
        title: "מערכות השקיה ותיקונים",
        body:
          "בדיקה ותיקון של השקיה הם חלק חשוב מתחזוקה נכונה. מערכת שלא עובדת טוב גורמת לבזבוז מים, לפגיעה בצמחייה ולמראה לא אחיד של הגינה.",
      },
      {
        title: "גיזום, ניקיון ושיפור מראה",
        body:
          "גיזום נכון, פינוי עשבייה וסידור כללי של השטח יוצרים תחושה מטופחת יותר ומשפרים את השימוש היום־יומי בגינה, גם בלי להיכנס לשיפוץ מלא.",
      },
    ],
  },
  "ganan-north": {
    key: "ganan-north",
    path: "/ganan-north",
    eyebrow: "עמוד אזורי",
    h1: "גנן בצפון לעבודות גינון ודשא סינטטי",
    intro:
      "מחפשים גנן בצפון? ירין אדלר גינון מבצע עבודות גינון, דשא סינטטי, השקיה, גיזום ותחזוקת גינות בעיקר באזור הצפון, עם דגש חזק על נהריה והסביבה.",
    secondaryIntro:
      "השירות ניתן בעיקר בנהריה, עכו, הקריות, שלומי, מעלות והסביבה, ובמידת הצורך גם באזורים נוספים בכל הארץ.",
    sections: [
      {
        title: "עבודות גינון בצפון בלי לאבד מיקוד מקומי",
        body:
          "לא כל מי שמחפש גנן בצפון צריך פתרון רחב מדי. היתרון כאן הוא פעילות עיקרית בצפון עם דגש על נהריה והסביבה, כך שהשירות נשאר זמין, ישיר ומעשי, ועדיין אפשר לתת מענה גם לעוד אזורים בארץ כשצריך.",
      },
      {
        title: "דשא סינטטי, השקיה ותחזוקה",
        body:
          "השירות כולל התקנת דשא סינטטי בצפון, תחזוקת גינות, תיקוני השקיה, גיזום ושדרוג אזורים קיימים, לפי צורך נקודתי או פרויקט רחב יותר.",
      },
      {
        title: "אילו אזורים מקבלים שירות",
        body:
          "נהריה היא מוקד הפעילות העיקרי, ובנוסף ניתנים שירותים בעכו, בקריות, שלומי, מעלות ובאזורים קרובים נוספים לפי סוג העבודה והיקף הפרויקט.",
      },
    ],
  },
};

function normalizePath(pathname: string) {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized === "" ? "/" : normalized;
}

function getPageContent(pathname: string): PageContent {
  const normalized = normalizePath(pathname);
  return (
    Object.values(PAGE_CONTENT).find((page) => page.path === normalized) ?? PAGE_CONTENT.home
  );
}

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
        <img src={item.src} alt={item.alt} />
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

  const page = getPageContent(window.location.pathname);
  const isHomePage = page.key === "home";
  const filteredGallery =
    cat === "הכל" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.cat === cat);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page.key]);

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
          <span>גנן בנהריה, דשא סינטטי, השקיה ותחזוקת גינות עם מענה מהיר</span>
          <a href={`tel:${PHONE_INT}`}>{PHONE_LOCAL}</a>
        </div>
      </div>

      <header className="header">
        <div className="container headerInner">
          <a className="brand" href="/">
            <img className="brandLogo" src={LOGO_PATH} alt="לוגו ירין אדלר גינון" />
            <div className="brandText">
              <b>ירין אדלר גינון</b>
              <span>גינון, דשא סינטטי ותחזוקת גינות בעיקר בצפון וגם בכל הארץ</span>
            </div>
          </a>

          <nav className="nav desktopNav" aria-label="ניווט ראשי">
            {!isHomePage && (
              <a className="navLink navLinkAnchor" href="/">
                לעמוד הבית
              </a>
            )}
            <button className="navLink" type="button" onClick={() => go("gallery")}>
              עבודות
            </button>
            <button className="navLink" type="button" onClick={() => go("contact")}>
              יצירת קשר
            </button>
            {isHomePage && (
              <a className="navLink navLinkAnchor" href="/ganan-north">
                גנן בצפון
              </a>
            )}
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
                {!isHomePage && (
                  <a className="mobileNavItem" href="/">
                    לעמוד הבית
                  </a>
                )}
                <button className="mobileNavItem" type="button" onClick={() => go("gallery")}>
                  עבודות
                </button>
                <button className="mobileNavItem" type="button" onClick={() => go("contact")}>
                  יצירת קשר
                </button>
                {isHomePage && (
                  <a className="mobileNavItem" href="/ganan-north">
                    גנן בצפון
                  </a>
                )}
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
                <div className="heroLeadCard">
                  <span className="heroBadge">{page.eyebrow}</span>
                  <h1 className="h1">{page.h1}</h1>
                  <p className="sub">{page.intro}</p>
                  <p className="sub heroSubSecondary">{page.secondaryIntro}</p>

                  <div className="heroActionRow">
                    <a
                      className="btn btnPrimary"
                      href={WHATSAPP}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="whatsapp" /> הצעת מחיר בוואטסאפ
                    </a>
                    <button className="btn btnGhost" type="button" onClick={() => go("gallery")}>
                      <Icon name="camera" /> עבודות אחרונות
                    </button>
                    <a className="btn btnGhost" href={`tel:${PHONE_INT}`}>
                      <Icon name="phone" /> התקשר
                    </a>
                  </div>

                  <div className="heroQuickLinks" aria-label="קישורים פנימיים">
                    {INTERNAL_LINKS.map((link) => (
                      <a key={link.href} className="heroQuickLink" href={link.href}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="heroStartGallery">
                  {GALLERY_ITEMS.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      className={`heroStartTile ${index === 0 ? "heroStartTileLarge" : ""}`}
                      onClick={() => setLightbox({ open: true, item })}
                      style={{ backgroundImage: `url(${item.src})` }}
                      aria-label={item.alt}
                    >
                      <span className="heroMiniTileOverlay" aria-hidden />
                      <span className="heroMiniTileLabel">{item.title}</span>
                    </button>
                  ))}
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

        <section className="section seoSection">
          <div className="container">
            <div className="seoGrid">
              {page.sections.map((section, index) => (
                <Reveal key={section.title} className={index > 0 ? "delay1" : ""}>
                  <article className="seoCard">
                    <h2 className="seoH2">{section.title}</h2>
                    <p className="seoText">{section.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section serviceAreaSection">
          <div className="container">
            <Reveal>
              <div className="serviceAreaCard">
                <div>
                  <div className="eyebrow">אזורי שירות</div>
                  <h2 className="h2">בעיקר בצפון, עם הגעה גם לכל הארץ</h2>
                  <p className="sub serviceAreaSub">
                    השירות מתאים למי שמחפש גינון בנהריה, עבודות גינון בצפון, התקנת דשא
                    סינטטי בצפון או תחזוקת גינות באזור נהריה, הגליל המערבי והצפון, עם
                    אפשרות להגיע גם לאזורים נוספים בארץ לפי סוג העבודה.
                  </p>
                </div>
                <div className="servicesInline">
                  <span className="serviceChip">גנן בנהריה</span>
                  <span className="serviceChip">גינון בנהריה</span>
                  <span className="serviceChip">דשא סינטטי בנהריה</span>
                  <span className="serviceChip">השקיה ותחזוקה</span>
                  <span className="serviceChip">גנן בצפון</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section gallerySection" id="gallery">
          <div className="container">
            <Reveal>
              <div className="sectionTitleCompact">
                <div>
                  <div className="eyebrow">עבודות</div>
                  <h2 className="h2">עבודות גינון, דשא סינטטי ושדרוג גינות</h2>
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

            <div
              className={`gallery galleryFeatured ${
                cat === "הכל" ? "galleryFeaturedAll" : "galleryFeaturedFiltered"
              }`}
            >
              {filteredGallery.map((item, index) => (
                <Reveal key={`${item.title}-${index}`} className={index > 1 ? "delay1" : ""}>
                  <button
                    type="button"
                    className={`tile ${index === 0 ? "tileLarge" : ""}`}
                    onClick={() => setLightbox({ open: true, item })}
                  >
                    <img className="tileImg" src={item.src} alt={item.alt} loading="lazy" />
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

        <section className="section internalLinksSection">
          <div className="container">
            <Reveal>
              <div className="internalLinksCard">
                <div>
                  <div className="eyebrow">עמודי מידע</div>
                  <h2 className="h2">מידע נוסף על שירותי גינון ודשא סינטטי</h2>
                  <p className="sub internalLinksSub">
                    עמודי המידע האלו עוזרים להבין איזה שירות מתאים לכם ומחזקים את הקישור
                    הפנימי בין תחומי הפעילות העיקריים.
                  </p>
                </div>
                <div className="internalLinksGrid">
                  {INTERNAL_LINKS.map((link) => (
                    <a key={link.href} className="internalLinkItem" href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {isHomePage && (
          <section className="section faqSection" id="faq">
            <div className="container">
              <Reveal>
                <div className="faqHeader">
                  <div className="eyebrow">שאלות נפוצות</div>
                  <h2 className="h2">FAQ על גינון בנהריה, דשא סינטטי ותחזוקה</h2>
                </div>
              </Reveal>

              <div className="faqGrid">
                {FAQ_ITEMS.map((item, index) => (
                  <Reveal key={item.question} className={index > 1 ? "delay1" : ""}>
                    <article className="faqCard">
                      <h3 className="faqQuestion">{item.question}</h3>
                      <p className="faqAnswer">{item.answer}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section servicesSection">
          <div className="container">
            <Reveal>
              <div className="servicesInline">
                <span className="serviceChip">דשא סינטטי</span>
                <span className="serviceChip">השקיה</span>
                <span className="serviceChip">תחזוקת גינות</span>
                <span className="serviceChip">גיזום</span>
                <span className="serviceChip">חיפויים</span>
                <span className="serviceChip">שבילי דריכה</span>
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
                  <h2 className="h2">מוכנים לדבר על העבודה?</h2>
                  <p className="sub contactSub">
                    שלחו תמונה של השטח, כתבו אם מדובר בגינון, דשא סינטטי, השקיה או תחזוקת
                    גינות, ותקבלו מענה מהיר.
                  </p>
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
          <div>© {new Date().getFullYear()} ירין אדלר גינון • בעיקר בצפון, עם הגעה גם לכל הארץ</div>
          <div className="footerLinks">
            <a href="/" aria-label="חזרה לעמוד הבית">
              עמוד הבית
            </a>
            <a href="/ganan-north">גנן בצפון</a>
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
