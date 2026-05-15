"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

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

const AUTOPLAY_DELAY = 6000;

/* =========================
   COMPONENTE PRINCIPAL
========================= */

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    setMounted(true);

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!mounted || HERO_IMAGES.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) {
    return (
      <section className={styles.hero}>
        <div className={styles.heroSlider} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent} />
      </section>
    );
  }

  return (
    <section className={styles.hero}>
      <HeroSlider currentIndex={currentIndex} isMobile={isMobile} />

      <div className={styles.heroOverlay} />

      <HeroContent />
    </section>
  );
}

/* =========================
   SLIDER
========================= */

function HeroSlider({ currentIndex, isMobile }) {
  return (
    <div className={styles.heroSlider}>
      {HERO_IMAGES.map((img, index) => (
        <div
          key={`${index}-${isMobile ? "mobile" : "desktop"}`}
          className={`${styles.imageWrapper} ${
            index === currentIndex ? styles.active : ""
          }`}
        >
          <Image
            src={isMobile && img.srcMobile ? img.srcMobile : img.src}
            alt={img.alt}
            fill
            className={styles.heroImage}
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            quality={75}
            sizes="(max-width: 768px) 100vw, 100vw"
          />
        </div>
      ))}
    </div>
  );
}

/* =========================
   CONTENIDO
========================= */

function HeroContent() {
  const handleScroll = () => {
    document
      .getElementById("about")
      ?.scrollIntoView({ behavior: "smooth" });
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