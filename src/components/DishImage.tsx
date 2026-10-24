import { useState } from "react";
import { cn } from "@/lib/utils";

// Dish photo with a graceful "Photo coming soon" fallback when the image fails to load
// or is missing. Never substitutes an unrelated photo.
export default function DishImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-[#FBF5EE] text-xs font-semibold text-[#6E6259]",
          className,
        )}
      >
        Photo coming soon
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
