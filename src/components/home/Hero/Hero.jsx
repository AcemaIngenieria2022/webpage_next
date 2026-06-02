"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
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
   SLIDER (Animado con Framer Motion)
========================= */

function HeroSlider({ currentIndex, isMobile }) {
  const currentImg = HERO_IMAGES[currentIndex];

  return (
    <div className={styles.heroSlider}>
      {/* AnimatePresence permite que la imagen que sale mantenga su animación 
        de fade-out mientras entra la nueva.
      */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${currentIndex}-${isMobile ? "mobile" : "desktop"}`}
          className={styles.imageWrapper}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image
            src={isMobile && currentImg.srcMobile ? currentImg.srcMobile : currentImg.src}
            alt={currentImg.alt}
            fill
            className={styles.heroImage}
            priority
            quality={75}
            sizes="(max-width: 768px) 100vw, 100vw"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* =========================
   CONTENIDO (Con entrada animada y hover dinámico)
========================= */

function HeroContent() {
  const handleScroll = () => {
    document
      .getElementById("about")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div 
      className={styles.heroContent}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <motion.button
        className={styles.scrollDown}
        type="button"
        aria-label="Ir a la sección About"
        onClick={handleScroll}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowIcon />
      </motion.button>
    </motion.div>
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