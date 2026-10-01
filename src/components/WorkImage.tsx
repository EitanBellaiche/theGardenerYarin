import type { Photo } from "../siteData";

export default function WorkImage({
  photo,
  sizes,
  className,
  eager = false,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      className={className}
      src={photo.small}
      srcSet={`${photo.small} 720w, ${photo.large} ${photo.largeWidth}w`}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
    />
  );
}
