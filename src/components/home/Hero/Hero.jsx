"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

/**
 * Solo imagen base (Next se encarga del resto)
 */
const HERO_IMAGES = [
  {
    src: "/images/Hero/img1-hero.webp",
    alt: "Proyecto ACEMA 1",
  },
  {
    src: "/images/Hero/img2-hero.webp",
    alt: "Proyecto ACEMA 2",
  },
  {
    src: "/images/Hero/img3-hero.webp",
    alt: "Proyecto ACEMA 3",
  },
];

const AUTOPLAY_DELAY = 6000;

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <HeroSlider currentIndex={currentIndex} />
      <div className={styles.heroOverlay} />
      <HeroContent />
    </section>
  );
}

/* =========================
   Slider
========================= */

function HeroSlider({ currentIndex }) {
  return (
    <div className={styles.heroSlider}>
      {HERO_IMAGES.map((img, index) => (
        <div
          key={img.src}
          className={`${styles.imageWrapper} ${
            index === currentIndex ? styles.active : ""
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className={styles.heroImage}
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            quality={70}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
}

/* =========================
   Content
========================= */

function HeroContent() {
  const handleScroll = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
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
