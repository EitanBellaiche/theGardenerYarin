export type IconName =
  | "phone"
  | "menu"
  | "close"
  | "whatsapp"
  | "arrow"
  | "chevronPrev"
  | "chevronNext"
  | "chevronDown"
  | "instagram"
  | "facebook"
  | "accessibility"
  | "play"
  | "pause";

export default function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    className: `icon icon-${name}`,
  };

  switch (name) {
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7c.2 1.2.5 2.3.9 3.4a2 2 0 0 1-.5 2.1L9.9 11a16 16 0 0 0 3.1 3.1l.8-1.4a2 2 0 0 1 2.1-.5c1.1.4 2.2.7 3.4.9A2 2 0 0 1 22 16.9z" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 8h16" />
          <path d="M8 16h12" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M20 12a8 8 0 0 1-12.7 6.4L4 19l.8-3.2A8 8 0 1 1 20 12z" />
          <path d="M8.8 10.3c.2-.6.5-.7.9-.7h.3c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4 0 .6l-.3.4c-.1.2-.1.4 0 .6.4.7 1.1 1.4 1.9 1.8.2.1.4.1.6 0l.6-.3c.2-.1.4-.1.6 0l1.6.7c.3.1.4.3.4.5v.3c0 .4-.1.7-.7.9-.6.2-1.8.4-3.5-.4-1.7-.8-2.9-2-3.8-3.7-.8-1.6-.6-2.8-.4-3.4z" />
        </svg>
      );
    case "arrow":
      // Points toward the reading direction's end (left in RTL).
      return (
        <svg {...common}>
          <path d="M19 12H5" />
          <path d="M11 6l-6 6 6 6" />
        </svg>
      );
    case "chevronPrev":
      return (
        <svg {...common}>
          <path d="M9 6l6 6-6 6" />
        </svg>
      );
    case "chevronNext":
      return (
        <svg {...common}>
          <path d="M15 6l-6 6 6 6" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg {...common}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.6.4-1 1-1z" />
        </svg>
      );
    case "accessibility":
      return (
        <svg {...common}>
          <circle cx="12" cy="4.5" r="1.8" />
          <path d="M4.5 8.5 12 10l7.5-1.5" />
          <path d="M12 10v4.5" />
          <path d="m8.5 21 3.5-6.5 3.5 6.5" />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <path d="M7 5v14l12-7z" fill="currentColor" />
        </svg>
      );
    case "pause":
      return (
        <svg {...common}>
          <path d="M8 5v14M16 5v14" strokeWidth={2.4} />
        </svg>
      );
    default:
      return null;
  }
}
