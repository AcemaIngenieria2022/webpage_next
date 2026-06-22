"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './OptimizedImage.module.css';

export default function OptimizedImage({ src, thumb, alt, className = '', priority = false, sizes, quality = 80 }) {
  const [current, setCurrent] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const [loading, setLoading] = useState(false);
  const loaderStartRef = useRef(0);

  useEffect(() => {
    const mapped = thumb || null;
    if (mapped) {
      setCurrent(mapped);
      setIsBlurred(src && mapped !== src);
      // preload HQ
      if (src && mapped !== src && typeof globalThis !== 'undefined' && typeof globalThis.Image === 'function') {
        setLoading(true);
        loaderStartRef.current = Date.now();
        const hi = new globalThis.Image();
        hi.src = src;
        hi.onload = () => setCurrent(src);
      }
      return;
    }

    // fallback: no thumb
    if (src) {
      setLoading(true);
      loaderStartRef.current = Date.now();
      setCurrent(src);
    }
  }, [src, thumb]);

  if (!current) return <div className={styles.placeholder} />;

  return (
    <div className={styles.wrapper}>
      <Image
        src={current}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={quality}
        className={`${styles.image} ${isBlurred ? styles.blurred : ''} ${className}`}
        onLoadingComplete={() => {
          setIsBlurred(false);
          const min = 240;
          const elapsed = Date.now() - (loaderStartRef.current || 0);
          if (elapsed >= min) setLoading(false);
          else setTimeout(() => setLoading(false), min - elapsed);
        }}
      />

      {loading && (
        <div className={styles.loader} aria-hidden>
          <div className={styles.spinner} />
        </div>
      )}
    </div>
  );
}
