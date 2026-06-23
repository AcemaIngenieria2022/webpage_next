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
  // show blurred/thumb background only while the main image is loading
  const bgStyle = (!loaded && thumb) ? {
    backgroundImage: `url(${thumb})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {};

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", ...bgStyle }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={className}
        onLoad={() => setLoaded(true)}
        decoding={props.decoding ?? 'async'}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: loaded ? 1 : 0,
          transition: (priority || props.loading === 'eager' || props.fetchPriority === 'high') ? 'opacity 0ms' : 'opacity 360ms ease'
        }}
        {...props}
      />
    </div>
  );
}
