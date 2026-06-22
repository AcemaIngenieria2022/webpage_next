"use client";

import { useState } from "react";
import Image from "next/image";

export default function OptimizedImage({
  src,
  thumb,
  alt = "",
  priority = false,
  quality = 75,
  sizes,
  className,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {thumb && !loaded && (
        <img
          src={thumb}
          alt={alt}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(16px)",
            transform: "scale(1.04)",
          }}
        />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={className}
        onLoadingComplete={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
}
