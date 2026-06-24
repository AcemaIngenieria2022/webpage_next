"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

/* =========================
   IMÁGENES CON PLACEHOLDERS
========================= */
const HERO_IMAGES = [
  {
    src: "/images/hero/hero-img1.webp",
    srcMobile: "/images/hero/movile-img1.webp",
    placeholder: "/images/hero/hero-img1-placeholder.webp",
    alt: "Proyecto ACEMA 1",
  },
  {
    src: "/images/hero/hero-img2.webp",
    srcMobile: "/images/hero/movile-img2.webp",
    placeholder: "/images/hero/hero-img2-placeholder.webp",
    alt: "Proyecto ACEMA 2",
  },
  {
    src: "/images/hero/hero-img3.webp",
    srcMobile: "/images/hero/movile-img3.webp",
    placeholder: "/images/hero/hero-img3-placeholder.webp",
    alt: "Proyecto ACEMA 3",
  },
];

const AUTOPLAY_DELAY = 4000;

/* =========================
   COMPONENTE PRINCIPAL
========================= */
export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    setMounted(true);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Renderizar solo después de montaje para evitar hidratación
  if (!mounted) {
    return (
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.scrollDown}>
            <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none">
              <path d="M12 16.8L6 10.8l1.4-1.4L11 12.7V4h2v8.7l3.6-3.3L18 10.8l-6 6z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.hero}>
      <HeroSlider isMobile={isMobile} />
      <div className={styles.heroOverlay} />
      <HeroContent />
    </section>
  );
}

/* =========================
   SLIDER OPTIMIZADO CON CARGA PROGRESIVA
========================= */
function HeroSlider({ isMobile }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));
  const loadedImagesRef = useRef(new Set([0]));
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const autoplayRef = useRef(null);
  const isFirstLoad = useRef(true);

  const len = HERO_IMAGES.length;

  const markImageAsLoaded = useCallback((index) => {
    if (loadedImagesRef.current.has(index)) return;
    loadedImagesRef.current.add(index);
    setLoadedImages(new Set(loadedImagesRef.current));
  }, []);

  const goToSlide = useCallback((newIndex) => {
    if (newIndex === currentIndex) return;
    setPrevIndex(currentIndex);
    setCurrentIndex(newIndex);

    // Precargar la imagen si no está cargada
    if (!loadedImagesRef.current.has(newIndex)) {
      const img = new window.Image();
      const src = isMobile && HERO_IMAGES[newIndex].srcMobile 
        ? HERO_IMAGES[newIndex].srcMobile 
        : HERO_IMAGES[newIndex].src;
      img.src = src;
      img.onload = () => {
        markImageAsLoaded(newIndex);
      };
    }
  }, [currentIndex, isMobile, markImageAsLoaded]);

  // Control de autoplay y precarga progresiva de las siguientes imágenes
  useEffect(() => {
    if (!isAutoplayActive) return;

    const startAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      
      autoplayRef.current = setInterval(() => {
        goToSlide((currentIndex + 1) % len);
      }, AUTOPLAY_DELAY);
    };

    startAutoplay();

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoplayActive, currentIndex, len, goToSlide]);

  // Pausar autoplay al pasar el ratón por encima
  const handleMouseEnter = useCallback(() => {
    setIsAutoplayActive(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoplayActive(true);
  }, []);

  const handlePrev = () => {
    goToSlide((currentIndex - 1 + len) % len);
  };

  const handleNext = () => {
    goToSlide((currentIndex + 1) % len);
  };

  return (
    <div 
      className={styles.heroSlider}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {HERO_IMAGES.map((img, index) => {
        const src = isMobile && img.srcMobile ? img.srcMobile : img.src;
        const isActive = index === currentIndex;
        const isPrev = index === prevIndex;
        const isLoaded = loadedImages.has(index);

        let opacity = 0;
        let zIndex = 1;
        let transition = 'none';

        if (isActive) {
          zIndex = 3;
          opacity = isLoaded ? 1 : 0;
          transition = isFirstLoad.current && index === 0 
            ? 'none' 
            : 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
        } else if (isPrev) {
          zIndex = 2;
          opacity = 1; // Mantener visible el slide anterior para que no se vea el fondo blanco
          transition = 'none';
        }

        return (
          <div
            key={img.src}
            className={`${styles.slide} ${isActive ? styles.active : ''}`}
            style={{
              opacity,
              transition,
              zIndex,
            }}
          >
            <div className={styles.imageWrapper}>
              {isActive || isPrev ? (
                // Mostrar la imagen real cuando está activa o cuando es la previa
                <Image
                  src={src}
                  alt={img.alt}
                  priority={index === 0 || index === currentIndex}
                  unoptimized
                  className={styles.heroImage}
                  fill
                  onLoad={() => {
                    markImageAsLoaded(index);
                    if (isFirstLoad.current && index === 0) {
                      isFirstLoad.current = false;
                    }
                  }}
                  placeholder="blur"
                  blurDataURL={img.placeholder}
                  style={{ 
                    objectFit: 'cover',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                />
              ) : (
                // Placeholder para imágenes inactivas
                <div className={styles.placeholderWrapper}>
                  <div 
                    className={styles.placeholderImage}
                    style={{
                      backgroundImage: `url(${img.placeholder})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(20px)',
                      transform: 'scale(1.1)',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Mostrar navegación solo después de cargar la primera imagen */}
      {loadedImages.size > 0 && (
        <>
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

          <div className={styles.progressDots} role="tablist" aria-label="Selector de slides">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.progressDot} ${i === currentIndex ? styles.activeDot : ''}`}
                onClick={() => goToSlide(i)}
                aria-label={`Ir a la imagen ${i + 1}`}
                aria-current={i === currentIndex}
              />
            ))}
          </div>
        </>
      )}
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
      </button>
    </div>
  );
}