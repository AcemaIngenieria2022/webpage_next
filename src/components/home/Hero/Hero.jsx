"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const HERO_IMAGES = [
  { src: "/images/hero/hero-img1.webp", srcMobile: "/images/hero/movile-img1.webp", alt: "Proyecto ACEMA 1" },
  { src: "/images/hero/hero-img2.webp", srcMobile: "/images/hero/movile-img2.webp", alt: "Proyecto ACEMA 2" },
  { src: "/images/hero/hero-img3.webp", srcMobile: "/images/hero/movile-img3.webp", alt: "Proyecto ACEMA 3" },
];

const AUTOPLAY_DELAY = 7000;

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <section className={styles.hero}>
      <div className={styles.heroSlider}>
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img.src}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ""}`}
          >
            <Image
              src={isMobile ? img.srcMobile : img.src}
              alt={img.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className={styles.heroImage}
            />
          </div>
        ))}
      </div>

      {/* Navegación Manual */}
      <button 
        className={`${styles.navButton} ${styles.navPrev}`} 
        onClick={() => setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
      >
        &#10094;
      </button>
      <button 
        className={`${styles.navButton} ${styles.navNext}`} 
        onClick={() => setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)}
      >
        &#10095;
      </button>

      {/* Indicadores (Dots) */}
      <div className={styles.progressDots}>
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            className={`${styles.progressDot} ${index === currentIndex ? styles.activeDot : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <div className={styles.heroOverlay} />
      <HeroContent />
    </section>
  );
}

function HeroContent() {
  return (
    <div className={styles.heroContent}>
      <button
        className={styles.scrollDown}
        type="button"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <svg viewBox="0 0 24 24" className={styles.arrowIcon}>
          <path d="M12 16.8L6 10.8l1.4-1.4L11 12.7V4h2v8.7l3.6-3.3L18 10.8l-6 6z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}