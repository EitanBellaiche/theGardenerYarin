import { type KeyboardEvent, useEffect, useRef } from "react";
import Icon from "./Icon";
import type { WorkItem } from "../siteData";

/** Image viewer built on the native <dialog> (focus trap, Escape and top layer for free). */
export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: WorkItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function step(delta: number) {
    if (index === null) return;
    onNavigate((index + delta + items.length) % items.length);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    // RTL: the next image sits to the left.
    if (event.key === "ArrowLeft") step(1);
    if (event.key === "ArrowRight") step(-1);
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={item ? item.title : "תמונה"}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {item && (
        <figure className="lightboxFigure">
          <img
            key={item.id}
            src={item.photo.large}
            alt={item.photo.alt}
            width={item.photo.width}
            height={item.photo.height}
          />
          <figcaption className="lightboxCaption">
            <span className="lightboxKind">{item.kind}</span>
            <b>{item.title}</b>
            <span>{item.tag}</span>
            <span className="lightboxCount" dir="ltr">
              {index! + 1} / {items.length}
            </span>
          </figcaption>
        </figure>
      )}

      <button className="lightboxClose" type="button" onClick={onClose} autoFocus>
        <Icon name="close" size={22} />
        <span className="srOnly">סגירה</span>
      </button>
      <button className="lightboxNav lightboxPrev" type="button" onClick={() => step(-1)}>
        <Icon name="chevronPrev" size={26} />
        <span className="srOnly">התמונה הקודמת</span>
      </button>
      <button className="lightboxNav lightboxNext" type="button" onClick={() => step(1)}>
        <Icon name="chevronNext" size={26} />
        <span className="srOnly">התמונה הבאה</span>
      </button>
    </dialog>
  );
}
