import rooftop720 from "./assets/yarin/rooftop-720.webp";
import rooftop1400 from "./assets/yarin/rooftop-1400.webp";
import curveHouse720 from "./assets/yarin/curve-house-720.webp";
import curveHouse1400 from "./assets/yarin/curve-house-1400.webp";
import smallIsland720 from "./assets/yarin/small-island-720.webp";
import smallIsland1400 from "./assets/yarin/small-island-1400.webp";
import bigTree720 from "./assets/yarin/big-tree-720.webp";
import bigTree1400 from "./assets/yarin/big-tree-1400.webp";
import yardStepping720 from "./assets/yarin/yard-stepping-720.webp";
import yardStepping1400 from "./assets/yarin/yard-stepping-1400.webp";
import narrowYard720 from "./assets/yarin/hero-720.webp";
import narrowYard1400 from "./assets/yarin/hero-1400.webp";
import project1a800 from "./assets/projects/project1-1-800.webp";
import project1a1400 from "./assets/projects/project1-1-1400.webp";
import project1aAvif800 from "./assets/projects/project1-1-800.avif";
import project1aAvif1400 from "./assets/projects/project1-1-1400.avif";
import project1b800 from "./assets/projects/project1-2-800.webp";
import project1b1400 from "./assets/projects/project1-2-1400.webp";
import project1bAvif800 from "./assets/projects/project1-2-800.avif";
import project1bAvif1400 from "./assets/projects/project1-2-1400.avif";
import project1c800 from "./assets/projects/project1-3-800.webp";
import project1c1400 from "./assets/projects/project1-3-1400.webp";
import project1cAvif800 from "./assets/projects/project1-3-800.avif";
import project1cAvif1400 from "./assets/projects/project1-3-1400.avif";

/* ------------------------------------------------------------------ */
/* Business + contact details                                          */
/* ------------------------------------------------------------------ */

/** Full business name: the primary identity (H1, footer, metadata, structured data). */
export const BRAND = "ירין אדלר – עבודות גינון, פיתוח ואחזקה";
/** Short form for compact visual contexts (header wordmark, running copy). */
export const BRAND_SHORT = "ירין אדלר";
export const PHONE_INT = "+972527090776";
export const PHONE_LOCAL = "052-7090776";
export const WHATSAPP_NUMBER = "972527090776";

const DEFAULT_WHATSAPP_TEXT =
  "היי ירין, ראיתי את העבודות באתר ואני רוצה הצעת מחיר. אפשר לדבר?";

export function whatsappLink(text = DEFAULT_WHATSAPP_TEXT) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP = whatsappLink();

export const SOCIALS = {
  instagram:
    "https://www.instagram.com/yarin_adler_gardening?igsh=dHR4NHJrZTVxamc3",
  facebook:
    "https://www.facebook.com/share/1HRqKQyGcX/?mibextid=wwXIfr",
};

/** Routine private garden maintenance covers these areas. Large private garden projects and institutional work are nationwide. */
export const PRIVATE_AREAS = ["נהריה", "הגליל המערבי", "הקריות", "חיפה והסביבה"];
export const PRIVATE_AREAS_TEXT = "נהריה, הגליל המערבי, הקריות, חיפה והסביבה";

export const INSTITUTIONAL_CLIENTS = [
  "חברות",
  "מפעלים",
  "רשויות מקומיות",
  "מוסדות חינוך",
  "גופים ציבוריים ומוסדיים",
];

/** Client-provided claims (approved for use). */
export const STRENGTHS = [
  {
    title: "ציוד מכני ומקצועי מתקדם",
    body: "ציוד שמאפשר לבצע גם עבודות פיתוח והכנת שטח בהיקף גדול.",
  },
  {
    title: "עבודה עברית",
    body: "עבודה עברית בשטח, ותקשורת ישירה מהפנייה הראשונה ועד סיום העבודה.",
  },
  {
    title: "אחריות מלאה",
    body: "אחריות מלאה על העבודה שבוצעה.",
  },
];

/* ------------------------------------------------------------------ */
/* Photography                                                         */
/* ------------------------------------------------------------------ */

export type Photo = {
  small: string;
  large: string;
  largeWidth: number;
  width: number;
  height: number;
  alt: string;
};

export type ProjectCategory = "private" | "institutional";

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  private: "פרויקטים פרטיים",
  institutional: "פרויקטים מוסדיים וציבוריים",
};

export type WorkItem = {
  id: string;
  category: ProjectCategory;
  photo: Photo;
  kind: string;
  title: string;
  tag: string;
};

// Alt text describes what is visible. Locations are not stated because the
// photos carry no evidence of where each job was done.
const PHOTOS = {
  rooftop: {
    small: rooftop720,
    large: rooftop1400,
    largeWidth: 1200,
    width: 720,
    height: 960,
    alt: "גג מרוצף עם דשא סינטטי, ספסלי עץ ונוף פתוח",
  },
  curveHouse: {
    small: curveHouse720,
    large: curveHouse1400,
    largeWidth: 1400,
    width: 720,
    height: 720,
    alt: "חצר צדדית מעוגלת עם דשא סינטטי וערוגת שתילים לאורך הקיר",
  },
  smallIsland: {
    small: smallIsland720,
    large: smallIsland1400,
    largeWidth: 1400,
    width: 720,
    height: 540,
    alt: "אי דשא סינטטי עם תיחום אבן בתוך חיפוי חצץ אדום",
  },
  bigTree: {
    small: bigTree720,
    large: bigTree1400,
    largeWidth: 1200,
    width: 720,
    height: 960,
    alt: "חצר רחבה עם דשא סינטטי ועץ בוגר במרכזה",
  },
  yardStepping: {
    small: yardStepping720,
    large: yardStepping1400,
    largeWidth: 1200,
    width: 720,
    height: 960,
    alt: "חצר עם דשא סינטטי ושביל אבני דריכה",
  },
  narrowYard: {
    small: narrowYard720,
    large: narrowYard1400,
    largeWidth: 1200,
    width: 720,
    height: 960,
    alt: "חצר צרה עם דשא סינטטי וערוגות בחיפוי אבן",
  },
} satisfies Record<string, Photo>;

// Every existing photo is a private/residential job. Institutional projects
// go here with category "institutional" once real photos are supplied.
export const FEATURED_PROJECTS: WorkItem[] = [
  {
    id: "rooftop",
    category: "private",
    photo: PHOTOS.rooftop,
    kind: "רופטופ",
    title: "רופטופ נקי ומדויק",
    tag: "דשא סינטטי פרימיום",
  },
  {
    id: "curve-house",
    category: "private",
    photo: PHOTOS.curveHouse,
    kind: "עיקולים",
    title: "עיקולים שיושבים בול",
    tag: "חיבור מושלם לקירות",
  },
  {
    id: "big-tree",
    category: "private",
    photo: PHOTOS.bigTree,
    kind: "חצרות",
    title: "חצר רחבה ומטופחת",
    tag: "מראה פתוח ונקי",
  },
];

export const GALLERY_WORK: WorkItem[] = [
  {
    id: "small-island",
    category: "private",
    photo: PHOTOS.smallIsland,
    kind: "דקור",
    title: "אי דשא עם חיפוי",
    tag: "שילוב אבנים ודשא",
  },
  {
    id: "yard-stepping",
    category: "private",
    photo: PHOTOS.yardStepping,
    kind: "שבילים",
    title: "שבילי דריכה",
    tag: "עיצוב ושימושיות",
  },
  {
    id: "narrow-yard",
    category: "private",
    photo: PHOTOS.narrowYard,
    kind: "חצרות",
    title: "חצר צרה ומסודרת",
    tag: "דשא סינטטי וחיפוי אבן",
  },
];

export const ALL_WORK: WorkItem[] = [...FEATURED_PROJECTS, ...GALLERY_WORK];

const workById = (id: string) => ALL_WORK.find((item) => item.id === id)!;

/* ------------------------------------------------------------------ */
/* Home page projects (added one at a time)                            */
/* ------------------------------------------------------------------ */

export type ProjectSlide = {
  label: string;
  photo: Photo;
  avifSmall: string;
  avifLarge: string;
  /** object-position for the 4:3 frame */
  focus?: string;
  /** Muted MP4 shown in place of the photo; the photo is its poster. */
  video?: string;
};

export type Project = {
  id: string;
  category: ProjectCategory;
  title: string;
  tags: string;
  slides: ProjectSlide[];
};

// Project photos live in assets/projects as project<N>-<K>-{800,1400}.{webp,avif}.
const PROJECT_IMAGES = import.meta.glob<string>("./assets/projects/*.{webp,avif,mp4}", {
  eager: true,
  import: "default",
});

function projectImage(file: string) {
  const url = PROJECT_IMAGES[`./assets/projects/${file}`];
  if (!url) throw new Error(`Missing project image: ${file}`);
  return url;
}

/** A video slide; the poster frame doubles as its photo. */
function videoSlide(file: string, poster: string, label: string, alt: string): ProjectSlide {
  const posterUrl = projectImage(poster);
  return {
    label,
    photo: { small: posterUrl, large: posterUrl, largeWidth: 540, width: 540, height: 960, alt },
    avifSmall: posterUrl,
    avifLarge: posterUrl,
    video: projectImage(file),
  };
}

/** One slide from project<N>-<K>; `height` is the 800px-wide height. */
function slide(key: string, label: string, alt: string, height: number, focus?: string): ProjectSlide {
  return {
    label,
    photo: {
      small: projectImage(`${key}-800.webp`),
      large: projectImage(`${key}-1400.webp`),
      largeWidth: 1400,
      width: 800,
      height,
      alt,
    },
    avifSmall: projectImage(`${key}-800.avif`),
    avifLarge: projectImage(`${key}-1400.avif`),
    focus,
  };
}

// Captions describe only what the photos show; no location or client details.
export const PROJECTS: Project[] = [
  {
    id: "project-1",
    category: "private",
    title: "אי דשא סינטטי",
    tags: "הכנת שטח · תיחום · דשא סינטטי · חיפוי חצץ",
    slides: [
      {
        label: "לפני",
        photo: {
          small: project1a800,
          large: project1a1400,
          largeWidth: 1400,
          width: 800,
          height: 1066,
          alt: "החצר לפני העבודה: שטח עפר עם צמחייה ועצים, בתחילת פינוי השטח",
        },
        avifSmall: project1aAvif800,
        avifLarge: project1aAvif1400,
        focus: "50% 62%",
      },
      {
        label: "הכנת תשתית",
        photo: {
          small: project1b800,
          large: project1b1400,
          largeWidth: 1400,
          width: 800,
          height: 450,
          alt: "תשתית מהודקת בתוך תיחום אבן, מוכנה להנחת דשא סינטטי, בין עצים וחיפוי חצץ אדום",
        },
        avifSmall: project1bAvif800,
        avifLarge: project1bAvif1400,
      },
      {
        label: "בסיום",
        photo: {
          small: project1c800,
          large: project1c1400,
          largeWidth: 1400,
          width: 800,
          height: 600,
          alt: "אי דשא סינטטי מוגמר בתיחום אבן, בתוך חיפוי חצץ אדום בין עצים",
        },
        avifSmall: project1cAvif800,
        avifLarge: project1cAvif1400,
      },
    ],
  },
  {
    id: "project-4",
    category: "private",
    title: "דשא סינטטי בחצר ארוכה",
    tags: "עבודות עפר · מצע · דשא סינטטי · חיפוי חצץ",
    slides: [
      slide(
        "project4-1",
        "עבודות עפר",
        "מחפר זעיר מיישר את השטח בחצר לפני פיזור המצע",
        1067,
        "50% 45%"
      ),
      slide(
        "project4-2",
        "פיזור מצע",
        "מחפר זעיר פורק מצע בחצר, לצד ערימת חומר מפוזרת",
        1067,
        "50% 55%"
      ),
      slide(
        "project4-3",
        "בסיום",
        "מדשאה סינטטית ארוכה לצד הבית, עם רצועת חצץ לבן ושתילים לאורך גדר במבוק",
        1000,
        "50% 65%"
      ),
    ],
  },
  {
    id: "project-6",
    category: "private",
    title: "שביל אבן פראית",
    tags: "פירוק ריצוף · אבן פראית · עציצים",
    slides: [
      slide(
        "project6-1",
        "לפני",
        "שביל צדדי מרוצף באריחים ישנים לאורך קיר הבית וגדר ירוקה",
        1067,
        "50% 60%"
      ),
      slide(
        "project6-2",
        "הנחת האבנים",
        "אבנים פראיות כהות מונחות לאורך השביל במהלך העבודה",
        1067,
        "50% 65%"
      ),
      slide(
        "project6-3",
        "בסיום",
        "שביל מוגמר מאבן פראית כהה, עם עציצים לאורך הגדר הירוקה",
        1067,
        "50% 60%"
      ),
    ],
  },
  {
    id: "project-2",
    category: "private",
    title: "מדשאה ועצים לאורך הבית",
    tags: "הכנת שטח · דשא טבעי · נטיעת עצים · תיחום",
    slides: [
      slide(
        "project2-1",
        "לפני",
        "רצועת עפר לאורך הבית, עץ צעיר בתוך תיחום ושיחים לאורך הגדר",
        800,
        "50% 60%"
      ),
      slide(
        "project2-2",
        "בסיום",
        "מדשאה ירוקה לאורך שביל מרוצף, עצים צעירים בתיחום עם חיפוי חצץ ושיחים לאורך הגדר",
        800
      ),
    ],
  },
  {
    id: "project-3",
    category: "private",
    title: "ערוגת חצץ בחצר צדדית",
    tags: "הכנת שטח · השקיה · שתילה · חיפוי חצץ",
    slides: [
      slide(
        "project3-1",
        "לפני",
        "חצר צדדית צרה בתחילת העבודה: ערימות אדמה וצנרת השקיה לאורך הקיר",
        800
      ),
      slide(
        "project3-2",
        "בסיום",
        "ערוגה מוגמרת עם חיפוי חצץ אפור, צמחייה טרופית ושיחים לאורך קיר לבן",
        800
      ),
    ],
  },
  {
    id: "project-7",
    category: "private",
    title: "מדשאה סינטטית סביב העצים",
    tags: "הכנת שטח · דשא סינטטי · תיחום עצים · חיפוי חצץ",
    slides: [
      slide(
        "project7-1",
        "לפני",
        "חצר עפר סביב דקל ועץ, בתחילת הכנת השטח",
        1067,
        "50% 60%"
      ),
      slide(
        "project7-2",
        "בסיום",
        "מדשאה סינטטית סביב הדקל, עם תיחום עץ וחצץ לבן לרגלי העצים",
        1067,
        "50% 65%"
      ),
      slide(
        "project7-3",
        "מבט נוסף",
        "המדשאה המוגמרת לאורך הגדר, עם עצים צעירים בתיחום חצץ לבן",
        1067,
        "50% 60%"
      ),
    ],
  },
  {
    id: "project-8",
    category: "private",
    title: "חצר צרה לצד הבית",
    tags: "פירוק ופינוי · דשא סינטטי · ערוגות · תאורה",
    slides: [
      slide(
        "project8-1",
        "לפני",
        "מעבר צר לצד הבית עם שברי אבן ופסולת בין קורות עץ",
        1067,
        "50% 60%"
      ),
      slide(
        "project8-2",
        "בסיום",
        "רצועת דשא סינטטי בין ערוגות עם חצץ כהה, צמחייה ותאורת גינה",
        1067,
        "50% 65%"
      ),
    ],
  },
  {
    id: "project-9",
    category: "private",
    title: "מדשאה עם אבני דריכה",
    tags: "הכנת שטח · מצע והידוק · דשא סינטטי · אבני דריכה",
    slides: [
      slide(
        "project9-1",
        "לפני",
        "חצר עפר בין שני עצים, עם שקי חומר לקראת העבודה",
        1067,
        "50% 60%"
      ),
      slide("project9-2", "פיזור מצע", "ערימות מצע מפוזרות על פני החצר", 800),
      slide(
        "project9-3",
        "יישור והידוק",
        "יישור המצע בחצר, לצד ערוגה עם חיפוי חצץ לבן",
        800
      ),
      slide(
        "project9-4",
        "בסיום",
        "מדשאה סינטטית עם שביל אבני דריכה, עץ וערוגה בחיפוי חצץ לבן",
        1067,
        "50% 55%"
      ),
      slide(
        "project9-5",
        "מבט נוסף",
        "מבט רחב על המדשאה המוגמרת ושביל אבני הדריכה",
        1067,
        "50% 55%"
      ),
    ],
  },
  {
    id: "project-nahariya",
    category: "institutional",
    title: "חידוש מדשאה ציבורית בנהריה",
    tags: "הכנת שטח · פרישת דשא טבעי · שטח ציבורי",
    slides: [
      slide(
        "nahariya-1",
        "לפני",
        "רצועת אדמה חשופה בגינה ציבורית, בין עצי דקל לגדר, לפני פרישת הדשא",
        1067,
        "50% 55%"
      ),
      slide(
        "nahariya-2",
        "בסיום",
        "מדשאה חדשה של דשא טבעי בגינה הציבורית, בין עצי הדקל לגדר",
        1067,
        "50% 60%"
      ),
      videoSlide(
        "nahariya-video.mp4",
        "nahariya-video-poster.webp",
        "סרטון",
        "סרטון מהמדשאה המחודשת בגינה הציבורית בנהריה"
      ),
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Before / after and testimonials                                     */
/* Both sections render only when these lists contain real content.   */
/* ------------------------------------------------------------------ */

export type BeforeAfterPair = {
  id: string;
  title: string;
  caption?: string;
  before: Photo;
  after: Photo;
};

// Add real pairs here (same framing, same aspect ratio) to show the section.
export const BEFORE_AFTER: BeforeAfterPair[] = [];

export type Testimonial = {
  quote: string;
  name: string;
  context?: string;
};

// Add real customer testimonials here to show the section and its nav link.
export const TESTIMONIALS: Testimonial[] = [];

/* ------------------------------------------------------------------ */
/* WhatsApp message builder                                            */
/* ------------------------------------------------------------------ */

export type IntentItem = { id: string; label: string; template: string };

export const INTENTS: IntentItem[] = [
  {
    id: "garden",
    label: "פיתוח והקמת גינה",
    template: "אני מעוניין/ת בתכנון והקמה של גינה פרטית. הגינה נמצאת ב...",
  },
  {
    id: "maintenance",
    label: "תחזוקת גינה",
    template: "אני צריך/ה תחזוקת גינה פרטית. האזור הוא...",
  },
  {
    id: "synthetic",
    label: "דשא סינטטי",
    template: "אני רוצה הצעת מחיר לדשא סינטטי. השטח נמצא ב...",
  },
  {
    id: "institutional",
    label: "פרויקט מוסדי / עסקי",
    template: "אני פונה בשם גוף מוסדי / עסקי בנושא פרויקט פיתוח או תחזוקה. מיקום הפרויקט: ...",
  },
  {
    id: "trees",
    label: "גיזום עצים בגובה",
    template: "אני צריך/ה גיזום עצים בגובה. מיקום העבודה: ...",
  },
];

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */

export type PageKey =
  | "home"
  | "garden-development"
  | "ginun-nahariya"
  | "garden-maintenance-nahariya"
  | "synthetic-grass-nahariya"
  | "ganan-nahariya"
  | "ganan-north"
  | "development-infrastructure"
  | "institutional-maintenance"
  | "tree-pruning";

export type ServicePageKey = Exclude<PageKey, "home">;

type TextBlock = { title: string; body: string };
type ScopeItem = TextBlock & { href?: string };

export type ServicePage = {
  key: ServicePageKey;
  path: string;
  /** "general": the audience isn't limited to private or institutional clients. */
  audience: "private" | "institutional" | "general";
  /** Short name used in navigation, breadcrumbs and related links. */
  label: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroPhoto?: Photo;
  scopeTitle: string;
  scope: ScopeItem[];
  sectionsTitle: string;
  sections: TextBlock[];
  area: TextBlock;
  photos: WorkItem[];
  intentId: string;
  whatsappText: string;
  related: ServicePageKey[];
};

export const SERVICE_PAGES: Record<ServicePageKey, ServicePage> = {
  // Nationwide: large private garden projects. The local north page is ginun-nahariya.
  "garden-development": {
    key: "garden-development",
    path: "/garden-development/",
    audience: "private",
    label: "עיצוב ופיתוח גינות פרטיות",
    eyebrow: "פרויקטים גדולים · פריסה ארצית",
    h1: "עיצוב ופיתוח גינות פרטיות",
    intro:
      "תכנון, הקמה ושיקום של גינות פרטיות לבתים ולווילות, בכל הארץ: עבודה ברצף אחד, מהכנת השטח ועד גינה מוכנה לשימוש.",
    heroPhoto: PHOTOS.bigTree,
    scopeTitle: "מה כולל פרויקט פיתוח",
    scope: [
      {
        title: "תכנון ועיצוב הגינה",
        body: "מבינים את השטח, את אופן השימוש ואת התקציב, ומתרגמים אותם לתוכנית עבודה אחת.",
      },
      {
        title: "עבודות עפר והכנת שטח",
        body: "פינוי, יישור והכנת תשתית עם ציוד מכני, כבסיס לכל מה שנבנה מעליה.",
      },
      {
        title: "שיקום גינה קיימת",
        body: "פירוק ופינוי של מה שכבר לא מתאים, ובנייה מחדש של הגינה על בסיס השטח הקיים.",
      },
      {
        title: "תשתית השקיה אוטומטית",
        body: "תכנון והתקנה של מערכת השקיה שמתאימה לצמחייה ולשטח.",
      },
      {
        title: "שבילים, תיחום ואבני שפה",
        body: "שבילי אבן, בזלת ואבני דריכה, וקווים ברורים בין דשא, ערוגות וחיפוי.",
      },
      {
        title: "דשא טבעי או סינטטי",
        body: "מדשאות שמתוכננות לאופן השימוש בחצר, עם הכנת שטח וגימור מדויק בקצוות.",
      },
      {
        title: "חיפוי, טוף וחלוקי נחל",
        body: "כיסוי ערוגות ומשטחים במראה נקי ומסודר.",
      },
      {
        title: "שתילה ונטיעת עצים",
        body: "בחירה ושתילה של צמחייה ועצים שמתאימים לשמש, לצל ולתחזוקה הרצויה.",
      },
    ],
    sectionsTitle: "פרויקט אחד, רצף עבודה אחד",
    sections: [
      {
        title: "מתכננים לפני שמתחילים לעבוד",
        body:
          "פרויקט פיתוח מתחיל בהבנת השטח: מה קיים, מה צריך לפנות, איך משתמשים בחצר, איפה יש שמש ואיפה צל. מכאן נבנית תוכנית שמחברת בין עבודות העפר, ההשקיה, השבילים והצמחייה, כך שכל שלב נשען על הקודם.",
      },
      {
        title: "הקמה מאפס או שיקום",
        body:
          "יש פרויקטים שמתחילים משטח עפר, ויש כאלה שמתחילים מגינה קיימת שצריך לפרק, לפנות ולבנות מחדש. בשני המקרים העבודה מתבצעת ברצף, עם ציוד מכני ועם גורם אחד שאחראי על כל השלבים.",
      },
      {
        title: "ואחרי ההקמה",
        body:
          "בנהריה, בגליל המערבי, בקריות ובחיפה והסביבה אפשר להמשיך לאחזקה שוטפת של הגינה. לפרויקטים של חברות, מפעלים, רשויות ומוסדות יש מסלול נפרד של פיתוח, תשתיות ועבודות שטח.",
      },
    ],
    area: {
      title: "אזור פעילות",
      body: `פרויקטים גדולים של עיצוב ופיתוח גינות פרטיות: פריסה ארצית. אחזקת גינות פרטיות שוטפת: ${PRIVATE_AREAS_TEXT}.`,
    },
    photos: ["big-tree", "yard-stepping", "curve-house", "small-island"].map(workById),
    intentId: "garden",
    whatsappText: "היי ירין, אני מעוניין/ת בפרויקט עיצוב ופיתוח של גינה פרטית. מיקום הגינה: ...",
    related: ["ginun-nahariya", "garden-maintenance-nahariya", "development-infrastructure"],
  },

  // Local: garden development in Nahariya and the north.
  "ginun-nahariya": {
    key: "ginun-nahariya",
    path: "/ginun-nahariya/",
    audience: "private",
    label: "פיתוח גינות בנהריה והצפון",
    eyebrow: "גינות פרטיות · נהריה והצפון",
    h1: "פיתוח, הקמה ושיקום גינות בנהריה ובצפון",
    intro:
      "לבתים פרטיים, וילות וגינות מגורים בנהריה, בגליל המערבי, בקריות ובחיפה: מתכנון ראשוני ועד גינה מוכנה לשימוש, עם השקיה, צמחייה וגימור מדויק.",
    heroPhoto: PHOTOS.yardStepping,
    scopeTitle: "מה כולל הפרויקט",
    scope: [
      {
        title: "תכנון מקצה לקצה",
        body: "מבינים את השטח, את אופן השימוש ואת התקציב, ובונים תוכנית עבודה אחת וברורה.",
      },
      {
        title: "פיתוח והכנת השטח",
        body: "הכנת התשתית וחלוקת הגינה לאזורים לפני שמתחילים לבנות ולשתול.",
      },
      {
        title: "הקמת הגינה",
        body: "ביצוע מלא של התוכנית, משלב התשתית ועד הצמחייה והגימור.",
      },
      {
        title: "תשתית השקיה אוטומטית",
        body: "תכנון והתקנה של מערכת השקיה שמתאימה לצמחייה ולשטח.",
      },
      {
        title: "דשא סינטטי",
        body: "הכנת שטח, חיבורים מדויקים וגימור נקי בקצוות ובעיקולים.",
        href: "/synthetic-grass-nahariya/",
      },
      {
        title: "שבילי אבן ובזלת",
        body: "שבילי דריכה שמחברים בין חלקי הגינה ונוחים להליכה.",
      },
      {
        title: "תיחום ואבני שפה",
        body: "קווים ברורים בין דשא, ערוגות וחיפוי, שנשמרים לאורך זמן.",
      },
      {
        title: "טוף, חלוקי נחל וחיפוי קרקע",
        body: "כיסוי ערוגות ומשטחים במראה נקי ומסודר.",
      },
      {
        title: "שתילה וצמחייה",
        body: "בחירה ושתילה של צמחייה שמתאימה לשמש, לצל ולתחזוקה הרצויה.",
      },
    ],
    sectionsTitle: "גינה שמתוכננת לשטח שלכם",
    sections: [
      {
        title: "מתחילים מהשטח",
        body:
          "כל גינה מתחילה בהבנת המקום: מה כבר קיים, איך משתמשים בחצר, איפה יש שמש ואיפה צל, וכמה תחזוקה אתם מוכנים להשקיע. מכאן נבנית תוכנית אחת שמחברת בין הפיתוח, ההשקיה, השבילים והצמחייה.",
      },
      {
        title: "הקמה מאל״ף ועד ת׳",
        body:
          "במקום לתאם כמה בעלי מקצוע, העבודה מתבצעת ברצף אחד: הכנת השטח, תשתית ההשקיה, תיחום, שבילים, דשא סינטטי או חיפוי, ולבסוף השתילה. כך כל שלב נשען על הקודם, והגימור נשאר אחיד.",
      },
      {
        title: "וילות, בתים פרטיים וגינות מגורים",
        body:
          "השירות מיועד לגינות פרטיות: מחצר קטנה או גינת גג ועד וילה עם שטח פתוח רחב. לפרויקטים של חברות, מפעלים, רשויות ומוסדות יש מסלול נפרד של פיתוח, תשתיות ועבודות שטח.",
      },
      {
        title: "מקימים בצפון, ממשיכים לתחזק",
        body:
          "נהריה, הגליל המערבי, הקריות וחיפה הם אזור העבודה הקבוע לגינות פרטיות. גינה שהוקמה כאן יכולה לעבור לאחזקה שוטפת אצל אותו גורם, שכבר מכיר את ההשקיה, את הצמחייה ואת השטח.",
      },
    ],
    area: {
      title: "אזורי שירות",
      body: `${PRIVATE_AREAS_TEXT}. פרויקטים גדולים של עיצוב ופיתוח גינות פרטיות מבוצעים גם מחוץ לצפון, בפריסה ארצית.`,
    },
    photos: ["rooftop", "curve-house", "yard-stepping", "small-island"].map(workById),
    intentId: "garden",
    whatsappText: "היי ירין, אני מעוניין/ת בתכנון והקמה של גינה פרטית. הגינה נמצאת ב...",
    related: ["garden-development", "garden-maintenance-nahariya", "synthetic-grass-nahariya"],
  },

  "garden-maintenance-nahariya": {
    key: "garden-maintenance-nahariya",
    path: "/garden-maintenance-nahariya/",
    audience: "private",
    label: "אחזקת גינות פרטיות",
    eyebrow: "גינות פרטיות · נהריה והצפון",
    h1: "תחזוקת גינות פרטיות בנהריה ובצפון",
    intro:
      "תחזוקה שוטפת או נקודתית לבתים פרטיים, פנטהאוזים וגינות מגורים: גיזום, טיפול במערכות ההשקיה ושמירה על הצמחייה לאורך השנה.",
    heroPhoto: PHOTOS.bigTree,
    scopeTitle: "מה כוללת התחזוקה",
    scope: [
      {
        title: "תחזוקה שוטפת",
        body: "ביקורים בתדירות שמתאימה לגינה ולעונה.",
      },
      {
        title: "גיזום ועיצוב",
        body: "גיזום עצים, שיחים וגדרות חיות, לשמירה על הצורה ועל בריאות הצמחייה.",
      },
      {
        title: "בדיקה ותיקון השקיה",
        body: "איתור תקלות, תיקונים וכיוון מערכת ההשקיה.",
      },
      {
        title: "ניקוי עשבייה וסידור",
        body: "פינוי עשבייה, ניקוי ערוגות וסידור כללי של השטח.",
      },
      {
        title: "חידוש ושדרוג",
        body: "החלפת צמחייה, חידוש חיפוי וטיפול באזורים שנשחקו.",
      },
    ],
    sectionsTitle: "גינה שנשארת מטופחת",
    sections: [
      {
        title: "תחזוקה לפי קצב הגינה",
        body:
          "יש גינות שצריכות תחזוקה שוטפת, ויש מקומות שדורשים טיפול נקודתי אחרי תקופה ארוכה. העבודה מותאמת למצב הקיים ולאופן השימוש בגינה, כדי שלא תצטרכו לחכות עד שהשטח יוצא משליטה.",
      },
      {
        title: "השקיה תקינה היא חצי מהעבודה",
        body:
          "מערכת השקיה שלא עובדת טוב גורמת לבזבוז מים, לפגיעה בצמחייה ולמראה לא אחיד. לכן בדיקה ותיקון של ההשקיה הם חלק קבוע מהתחזוקה.",
      },
      {
        title: "אחזקה למוסדות, מפעלים ושטחים ציבוריים",
        body:
          "אחזקה של שטחים ירוקים בחברות, מפעלים, רשויות ומוסדות ניתנת במסלול נפרד, בהתקשרות לטווח ארוך ובפריסה ארצית.",
      },
    ],
    area: {
      title: "אזורי שירות לתחזוקת גינות פרטיות",
      body: PRIVATE_AREAS_TEXT,
    },
    photos: ["big-tree", "narrow-yard", "curve-house"].map(workById),
    intentId: "maintenance",
    whatsappText: "היי ירין, אני צריך/ה תחזוקת גינה פרטית. האזור הוא...",
    related: ["ginun-nahariya", "tree-pruning", "institutional-maintenance"],
  },

  "synthetic-grass-nahariya": {
    key: "synthetic-grass-nahariya",
    path: "/synthetic-grass-nahariya/",
    audience: "private",
    label: "דשא סינטטי",
    eyebrow: "גינות פרטיות · נהריה והצפון",
    h1: "התקנת דשא סינטטי בנהריה ובצפון",
    intro:
      "לגינות, חצרות, גגות ומרפסות: הכנת שטח נכונה, חיבורים מדויקים וגימור נקי בקצוות.",
    heroPhoto: PHOTOS.rooftop,
    scopeTitle: "מה כוללת ההתקנה",
    scope: [
      {
        title: "הכנת שטח ותשתית",
        body: "תשתית נכונה היא ההבדל בין דשא שנראה טוב לזמן קצר לבין תוצאה שמחזיקה.",
      },
      {
        title: "חיבורים ועיקולים",
        body: "חיבורים מדויקים בין יריעות והתאמה לקווים מעוגלים.",
      },
      {
        title: "גימור בקצוות",
        body: "גימור נקי במפגש עם ריצוף, קירות, ערוגות ושבילים.",
      },
      {
        title: "שילוב עם הגינה",
        body: "חיבור הדשא לשבילי דריכה, תיחום, חיפוי והשקיה קיימת.",
      },
    ],
    sectionsTitle: "מתי דשא סינטטי הוא הפתרון הנכון",
    sections: [
      {
        title: "אזור ירוק קבוע",
        body:
          "דשא סינטטי מתאים למי שרוצה אזור ירוק שנראה מסודר לאורך כל השנה, ולפתרון נוח יותר לתחזוקה בחצרות פעילות, בגגות ובמרפסות.",
      },
      {
        title: "התקנה טובה מתחילה בתשתית",
        body:
          "הכנת השטח, החיבורים והגימור בקצוות, בעיקולים ובמפגשים עם ריצוף וקירות הם מה שקובע אם התוצאה תיראה טבעית ומסודרת גם אחרי זמן.",
      },
      {
        title: "התקנות בהיקף גדול",
        body:
          "התקנות דשא סינטטי בחצרות של מוסדות, בשטחים ציבוריים ובמתחמים עסקיים מבוצעות במסגרת עבודות הפיתוח למוסדות, לעסקים ולרשויות, בפריסה ארצית.",
      },
    ],
    area: {
      title: "אזורי שירות",
      body: PRIVATE_AREAS_TEXT,
    },
    photos: ["rooftop", "curve-house", "small-island", "yard-stepping"].map(workById),
    intentId: "synthetic",
    whatsappText: "היי ירין, אני רוצה הצעת מחיר לדשא סינטטי. השטח נמצא ב...",
    related: ["ginun-nahariya", "garden-maintenance-nahariya", "development-infrastructure"],
  },

  "ganan-nahariya": {
    key: "ganan-nahariya",
    path: "/ganan-nahariya/",
    audience: "private",
    label: "גנן בנהריה",
    eyebrow: "נהריה והגליל המערבי",
    h1: "גנן בנהריה ובגליל המערבי",
    intro:
      "תכנון, הקמה ותחזוקה של גינות פרטיות בנהריה ובגליל המערבי, עם מענה ישיר ועבודה מסודרת מההתחלה ועד הסוף.",
    heroPhoto: PHOTOS.curveHouse,
    scopeTitle: "מה אפשר לעשות בגינה",
    scope: [
      {
        title: "פיתוח והקמת גינות פרטיות",
        body: "תכנון והקמה מלאים: השקיה, שבילים, תיחום, חיפוי ושתילה.",
        href: "/ginun-nahariya/",
      },
      {
        title: "אחזקת גינות פרטיות",
        body: "גיזום, השקיה, ניקוי ושמירה על גינה מטופחת לאורך השנה.",
        href: "/garden-maintenance-nahariya/",
      },
      {
        title: "דשא סינטטי",
        body: "התקנה לגינות, חצרות וגגות, עם גימור נקי בקצוות.",
        href: "/synthetic-grass-nahariya/",
      },
    ],
    sectionsTitle: "גנן מקומי בנהריה",
    sections: [
      {
        title: "עבודה מקומית, מענה ישיר",
        body:
          "נהריה והגליל המערבי הם אזור העבודה המרכזי לגינות פרטיות. היכרות עם האזור, עם תנאי השטח ועם האקלים הקרוב לים עוזרת להתאים את הצמחייה, ההשקיה והחומרים למה שבאמת מחזיק כאן.",
      },
      {
        title: "הצעת מחיר בלי סיבוכים",
        body:
          "אפשר לשלוח תמונות של השטח בוואטסאפ, לצרף מיקום ותיאור קצר, ולקבל כיוון ראשוני: האם מדובר בהקמה מלאה, בשדרוג, בתחזוקה או בהתקנה נקודתית.",
      },
    ],
    area: {
      title: "אזורי שירות",
      body: `${PRIVATE_AREAS_TEXT}. הדגש המרכזי הוא על נהריה והגליל המערבי.`,
    },
    photos: ["curve-house", "big-tree", "narrow-yard"].map(workById),
    intentId: "garden",
    whatsappText: "היי ירין, אני מחפש/ת גנן בנהריה. הגינה נמצאת ב...",
    related: ["ginun-nahariya", "garden-maintenance-nahariya", "ganan-north"],
  },

  "ganan-north": {
    key: "ganan-north",
    path: "/ganan-north/",
    audience: "private",
    label: "גנן בצפון",
    eyebrow: "הקריות, חיפה והצפון",
    h1: "גנן בצפון: מנהריה ועד חיפה",
    intro:
      "פיתוח, הקמה ותחזוקה של גינות פרטיות לאורך הצפון: נהריה, הגליל המערבי, הקריות, חיפה והסביבה.",
    heroPhoto: PHOTOS.bigTree,
    scopeTitle: "השירותים לגינות פרטיות",
    scope: [
      {
        title: "פיתוח והקמת גינות פרטיות",
        body: "מתכנון ראשוני ועד גינה מוכנה לשימוש.",
        href: "/ginun-nahariya/",
      },
      {
        title: "אחזקת גינות פרטיות",
        body: "תחזוקה שוטפת או נקודתית לאורך השנה.",
        href: "/garden-maintenance-nahariya/",
      },
      {
        title: "דשא סינטטי",
        body: "התקנה עם הכנת שטח וגימור מדויק.",
        href: "/synthetic-grass-nahariya/",
      },
    ],
    sectionsTitle: "גינון פרטי לאורך הצפון",
    sections: [
      {
        title: "הקריות, חיפה והסביבה",
        body:
          "לצד נהריה והגליל המערבי, עבודות לגינות פרטיות מתבצעות גם בקריות ובחיפה והסביבה: גינות בתים ווילות, חצרות וגינות גג, מהקמה מלאה ועד תחזוקה שוטפת.",
      },
      {
        title: "אחזקה בצפון, פרויקטים גדולים בכל הארץ",
        body:
          "אחזקה שוטפת של גינות פרטיות מתבצעת בצפון. פרויקטים גדולים של עיצוב ופיתוח גינות פרטיות, וכן פרויקטים של חברות, מפעלים, רשויות ומוסדות חינוך, מבוצעים בפריסה ארצית.",
      },
    ],
    area: {
      title: "אזורי שירות",
      body: PRIVATE_AREAS_TEXT,
    },
    photos: ["rooftop", "yard-stepping", "big-tree"].map(workById),
    intentId: "garden",
    whatsappText: "היי ירין, אני מחפש/ת גנן בצפון. הגינה נמצאת ב...",
    related: ["ginun-nahariya", "garden-maintenance-nahariya", "garden-development"],
  },

  "development-infrastructure": {
    key: "development-infrastructure",
    path: "/development-infrastructure/",
    audience: "institutional",
    label: "פיתוח, תשתיות ועבודות שטח",
    eyebrow: "למוסדות ולמגזר הציבורי · פריסה ארצית",
    h1: "פיתוח, תשתיות ועבודות שטח",
    intro:
      "עבודות פיתוח, תשתיות והקמה לעיריות, מוסדות חינוך, מפעלים וחברות, בפריסה ארצית ובהתאם להיקף הפרויקט.",
    scopeTitle: "יכולות ביצוע",
    scope: [
      {
        title: "עבודות פיתוח ותשתית",
        body: "הכנת תשתיות לפיתוח נופי ולעבודות גינון בהיקף גדול.",
      },
      {
        title: "הכנת שטח",
        body: "הכנת השטח לקראת ביצוע, בהתאם לדרישות הפרויקט.",
      },
      {
        title: "עקירות ופינוי",
        body: "עקירת צמחייה ופינוי השטח, היכן שנדרש.",
      },
      {
        title: "פינוי מפגעים וניקוי שטחים",
        body: "ניקוי שטחים מוזנחים ופינוי מפגעים לקבלת שטח בטוח ומסודר.",
      },
      {
        title: "דשא סינטטי בהיקף גדול",
        body: "התקנה בחצרות מוסדות, בשטחים ציבוריים ובמתחמים עסקיים.",
      },
      {
        title: "פתרונות הצללה",
        body: "הצללה לשטחים פתוחים, לחצרות ולאזורי שהייה.",
      },
      {
        title: "פתרונות גידור",
        body: "גידור שטחים ומתחמים בהתאם לדרישות הפרויקט.",
      },
      {
        title: "פיתוח נופי וגינון",
        body: "הקמת שטחים ירוקים, השקיה ושתילה במתחמים ציבוריים ועסקיים.",
      },
    ],
    sectionsTitle: "שותף ביצוע לפרויקטים מוסדיים",
    sections: [
      {
        title: "מהכנת השטח ועד שטח ירוק מתוחזק",
        body:
          "פרויקט מוסדי דורש רצף אחד של עבודה: הכנת השטח, תשתיות, פיתוח, התקנות והקמה, ובהמשך תחזוקה שוטפת. ריכוז כל השלבים אצל גורם ביצוע אחד מקצר את התיאום ושומר על אחידות.",
      },
      {
        title: "פריסה ארצית לפי היקף הפרויקט",
        body:
          "פרויקטים של חברות, מפעלים, רשויות ומוסדות חינוך מבוצעים בכל הארץ, בהתאם להיקף העבודה ולאופי הפרויקט.",
      },
    ],
    area: {
      title: "אזור פעילות",
      body: "פרויקטים מוסדיים, ציבוריים ועסקיים בכל הארץ, בהתאם להיקף הפרויקט.",
    },
    photos: ALL_WORK.filter((item) => item.category === "institutional"),
    intentId: "institutional",
    whatsappText:
      "שלום, אני פונה בשם גוף מוסדי / עסקי בנושא פרויקט פיתוח או תחזוקה. מיקום הפרויקט: ...",
    related: ["institutional-maintenance", "synthetic-grass-nahariya", "tree-pruning"],
  },

  "institutional-maintenance": {
    key: "institutional-maintenance",
    path: "/institutional-maintenance/",
    audience: "institutional",
    label: "אחזקה למוסדות ולשטחים ציבוריים",
    eyebrow: "למוסדות, מפעלים ושטחים ציבוריים · פריסה ארצית",
    h1: "אחזקת גינות למוסדות, מפעלים ושטחים ציבוריים",
    intro:
      "אחזקה תקופתית וארוכת טווח של שטחים ירוקים בחברות, במפעלים, ברשויות, במוסדות חינוך ובשטחים ציבוריים, בפריסה ארצית.",
    scopeTitle: "מה כוללת האחזקה",
    scope: [
      {
        title: "אחזקה תקופתית",
        body: "ביקורי אחזקה בתדירות שנקבעת מול הגוף, בהתאם למתחם ולעונה.",
      },
      {
        title: "תחזוקת שטחים ירוקים",
        body: "גיזום, השקיה וטיפול בצמחייה בשטחי המתחם.",
      },
      {
        title: "שמירה על נראות המתחם",
        body: "ניקיון וסידור של השטחים הירוקים, כך שהמתחם נשאר מסודר לאורך השנה.",
      },
      {
        title: "טיפול במפגעים",
        body: "טיפול במפגעים בשטח ופינויים, היכן שנדרש.",
      },
      {
        title: "תחזוקה ארוכת טווח",
        body: "התקשרות לטווח ארוך, עם גורם אחד שמכיר את השטח.",
      },
    ],
    sectionsTitle: "אחזקה שנשענת על היכרות עם השטח",
    sections: [
      {
        title: "מהפיתוח ועד האחזקה",
        body:
          "כשאותו גורם מבצע גם את עבודות הפיתוח וגם את האחזקה השוטפת, ההיכרות עם השטח, עם מערכת ההשקיה ועם הצמחייה נשמרת לאורך זמן, והתיאום מול הגוף נשאר פשוט.",
      },
      {
        title: "מותאם לאופי המתחם",
        body:
          "חצר של מוסד חינוך, שטח ירוק במפעל ושטח ציבורי פתוח דורשים קצב עבודה שונה. תדירות הביקורים והיקף העבודה נקבעים לפי המתחם ולפי דרישות הגוף.",
      },
      {
        title: "אחזקה לגינה פרטית",
        body:
          "לבתים פרטיים ולפנטהאוזים בנהריה, בגליל המערבי, בקריות, בחיפה והסביבה יש מסלול נפרד של אחזקת גינות פרטיות.",
      },
    ],
    area: {
      title: "אזור פעילות",
      body: "פריסה ארצית, בהתאם להיקף ולמיקום המתחם.",
    },
    photos: ALL_WORK.filter((item) => item.category === "institutional"),
    intentId: "institutional",
    whatsappText:
      "שלום, אני פונה בשם גוף מוסדי / עסקי בנושא אחזקת שטחים ירוקים. מיקום המתחם: ...",
    related: ["development-infrastructure", "garden-maintenance-nahariya", "tree-pruning"],
  },

  // Tree work: only what the owner has stated (pruning at height, complex
  // access). No equipment, certifications, felling or service area until confirmed.
  "tree-pruning": {
    key: "tree-pruning",
    path: "/tree-pruning/",
    audience: "general",
    label: "גיזום עצים בגובה",
    eyebrow: "עצים גבוהים · גישה מורכבת",
    h1: "גיזום עצים בגובה ועבודות מורכבות",
    intro:
      "גיזום עצים גבוהים ועבודות גיזום במקומות שהגישה אליהם מורכבת. שלחו תמונה של העץ ושל הסביבה שלו, ונחזור אליכם לגבי הביצוע.",
    scopeTitle: "סוגי עבודות",
    scope: [
      {
        title: "גיזום עצים בגובה",
        body: "גיזום ענפים בחלקים הגבוהים של העץ.",
      },
      {
        title: "עבודות בגישה מורכבת",
        body: "גיזום עצים במקומות שקשה להגיע אליהם.",
      },
      {
        title: "גיזום במסגרת אחזקת הגינה",
        body: "גיזום שוטף של עצים ושיחים הוא חלק מאחזקת גינות פרטיות.",
        href: "/garden-maintenance-nahariya/",
      },
    ],
    sectionsTitle: "לפני שמתחילים",
    sections: [
      {
        title: "כל עץ הוא עבודה אחרת",
        body:
          "גובה העץ, המיקום שלו והגישה אליו קובעים איך העבודה מתבצעת. תמונות של העץ ושל מה שסביבו עוזרות להבין מראש את היקף העבודה.",
      },
      {
        title: "פנייה פשוטה",
        body:
          "שלחו בוואטסאפ תמונה של העץ, את מיקום העבודה ותיאור קצר של מה שצריך, ונחזור אליכם.",
      },
    ],
    area: {
      title: "מיקום העבודה",
      body: "ציינו בפנייה את מיקום העבודה, ונבדוק אותו מולכם.",
    },
    photos: [],
    intentId: "trees",
    whatsappText: "היי ירין, אני צריך/ה גיזום עצים בגובה. מיקום העבודה: ...",
    related: ["garden-maintenance-nahariya", "institutional-maintenance", "ginun-nahariya"],
  },
};

/** Pointer from the development page to the institutional maintenance page. */
export const INSTITUTIONAL_MAINTENANCE = {
  title: "אחזקה למוסדות, מפעלים ושטחים ציבוריים",
  body:
    "התקשרות לטווח ארוך לאחזקת השטחים הירוקים של חברות, מפעלים, רשויות ומוסדות: גיזום, השקיה, ניקיון ושמירה על נראות המתחם לאורך השנה, בפריסה ארצית.",
};

// Proposed working process for institutional clients. Generic wording; confirm with the client.
export const INSTITUTIONAL_PROCESS = [
  { title: "פנייה ותיאום", body: "ספרו לנו על הגוף, על מיקום הפרויקט ועל היקף העבודה." },
  { title: "בחינת השטח", body: "בדיקת השטח והדרישות לפני התמחור." },
  { title: "הצעת מחיר", body: "הצעה מסודרת בהתאם להיקף העבודה." },
  { title: "ביצוע ותחזוקה", body: "ביצוע העבודה, ובהתאם לצורך גם תחזוקה שוטפת." },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavLink = { href: string; label: string };

export type ServiceSummary = {
  href: string;
  /** Name on the home page service index and in the footer. */
  title: string;
  /** Name in the header menus. */
  navLabel: string;
  audience: string;
  /** Only where the owner has stated a service area. */
  area?: string;
  summary: string;
};

/** The five primary services, in the owner's order. */
export const SERVICES: ServiceSummary[] = [
  {
    href: "/garden-development/",
    title: "עיצוב ופיתוח גינות פרטיות",
    navLabel: "עיצוב ופיתוח גינות פרטיות",
    audience: "(פרויקטים גדולים)",
    area: "פריסה ארצית",
    summary:
      "תכנון והקמה מאפס: תשתיות, השקיה אוטומטית, דשא סינטטי, שבילי מדרך, תיחום, טוף ושתילה.",
  },
  {
    href: "/garden-maintenance-nahariya/",
    title: "אחזקת גינות פרטיות",
    navLabel: "אחזקת גינות פרטיות בצפון",
    audience: "לבתים ולפנטהאוזים",
    area: PRIVATE_AREAS_TEXT,
    summary: "תחזוקה שוטפת, גיזום, טיפול במערכות ההשקיה ושמירה על הצמחייה.",
  },
  {
    href: "/development-infrastructure/",
    title: "פיתוח, תשתיות ועבודות שטח",
    navLabel: "פיתוח ותשתיות למוסדות",
    audience: "לעיריות, מוסדות חינוך, מפעלים וחברות",
    area: "פריסה ארצית",
    summary: "פיתוח שטח, הכנת תשתיות, פינוי מפגעים ודשא סינטטי בהיקפים גדולים.",
  },
  {
    href: "/institutional-maintenance/",
    title: "אחזקה למוסדות ולשטחים ציבוריים",
    navLabel: "אחזקה למוסדות ולשטחים ציבוריים",
    audience: "למוסדות, מפעלים ושטחים ציבוריים",
    area: "פריסה ארצית",
    summary: "אחזקה תקופתית וארוכת טווח של שטחים ירוקים ושמירה על נראות המתחם.",
  },
  {
    href: "/tree-pruning/",
    title: "גיזום עצים בגובה",
    navLabel: "גיזום עצים בגובה",
    audience: "ועבודות גיזום מורכבות",
    summary: "גיזום עצים גבוהים ועבודות במקומות שהגישה אליהם מורכבת.",
  },
];

/** Supporting pages: a capability page and local landing pages. */
export const MORE_PAGES: NavLink[] = [
  { href: "/synthetic-grass-nahariya/", label: "דשא סינטטי" },
  { href: "/ginun-nahariya/", label: "פיתוח גינות בנהריה והצפון" },
  { href: "/ganan-nahariya/", label: "גנן בנהריה והגליל המערבי" },
  { href: "/ganan-north/", label: "גנן בצפון: הקריות וחיפה" },
];

export const LOCAL_PAGES: NavLink[] = MORE_PAGES.slice(1);

/* ------------------------------------------------------------------ */
/* Routing                                                             */
/* ------------------------------------------------------------------ */

function normalizePath(pathname: string) {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized === "" ? "/" : normalized;
}

export function isHomePage(pathname: string) {
  const normalized = normalizePath(pathname);
  return normalized === "/" || normalized === "/index.html";
}

export function isAccessibilityPage(pathname: string) {
  return normalizePath(pathname) === "/accessibility";
}

/** Returns the service page for the current URL, or null if the URL isn't one. */
export function getServicePage(pathname: string): ServicePage | null {
  const normalized = normalizePath(pathname);
  return (
    Object.values(SERVICE_PAGES).find((page) => normalizePath(page.path) === normalized) ?? null
  );
}
