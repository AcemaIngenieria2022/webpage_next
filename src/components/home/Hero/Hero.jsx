"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import OptimizedImage from '@/components/shared/OptimizedImage/OptimizedImage';
import styles from "./Hero.module.css";
import thumbs from '@/data/project-thumbs.json';

/* =========================
   IMÁGENES
========================= */
const HERO_IMAGES = [
  {
    src: "/images/hero/img1-hero.webp",
    srcMobile: "/images/hero/movile-img1.webp",
    alt: "Proyecto ACEMA 1",
  },
  {
    src: "/images/hero/img2-hero.webp",
    srcMobile: "/images/hero/movile-img2.webp",
    alt: "Proyecto ACEMA 2",
  },
  {
    src: "/images/hero/img3-hero.webp",
    srcMobile: "/images/hero/movile-img3.webp",
    alt: "Proyecto ACEMA 3",
  },
];

const AUTOPLAY_DELAY = 4000;

/* =========================
   COMPONENTE PRINCIPAL
========================= */
export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Render single static image (no autoplay/animations) to reduce main-thread work
  return (
    <section className={styles.hero}>
      <HeroSlider isMobile={isMobile} />
      <div className={styles.heroOverlay} />
      <HeroContent />
    </section>
  );
}

/* =========================
   SLIDER (Framer Motion)
========================= */
function HeroSlider({ isMobile }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, []);
  const len = HERO_IMAGES.length;

  const handlePrev = () => setIndex((i) => (i - 1 + len) % len);
  const handleNext = () => setIndex((i) => (i + 1) % len);

  return (
    <div className={styles.heroSlider}>
      {HERO_IMAGES.map((img, i) => {
        const src = isMobile && img.srcMobile ? img.srcMobile : img.src;
        const thumb = thumbs[src] || src;
        const cls = i === index ? `${styles.slide} ${styles.active}` : styles.slide;
        return (
          <div key={img.src} className={cls}>
              <div className={styles.imageWrapper} suppressHydrationWarning>
              <OptimizedImage
                src={src}
                thumb={thumb}
                alt={img.alt}
                priority={i === 0}
                quality={90}
                sizes="100vw"
                className={styles.heroImage}
              />
            </div>
          </div>
        );
      })}

      <button
        type="button"
        className={`${styles.navButton} ${styles.navPrev}`}
        aria-label="Imagen anterior"
        onClick={handlePrev}
      >
        <svg viewBox="0 0 24 24" className={styles.navIcon} aria-hidden="true">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
        </svg>
      </button>

      <button
        type="button"
        className={`${styles.navButton} ${styles.navNext}`}
        aria-label="Siguiente imagen"
        onClick={handleNext}
      >
        <svg viewBox="0 0 24 24" className={styles.navIcon} aria-hidden="true">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}

/* =========================
   CONTENIDO
========================= */
function HeroContent() {
  const handleScroll = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.heroContent}>
      <button
        className={styles.scrollDown}
        type="button"
        aria-label="Ir a la sección About"
        onClick={handleScroll}
      >
        <ArrowIcon />
      </button>
    </div>
  );
}

/* =========================
   ICONO
========================= */
function ArrowIcon() {
  return (
    <svg
      className={styles.arrowIcon}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 16.8L6 10.8l1.4-1.4L11 12.7V4h2v8.7l3.6-3.3L18 10.8l-6 6z"
        fill="currentColor"
      />
    </svg>
  );
}