 'use client';

import { useMemo, useState, useEffect } from 'react';
import styles from './ProjectMiniCarousel.module.css';
import OptimizedImage from '@/components/shared/OptimizedImage/OptimizedImage';
import thumbs from '@/data/project-thumbs.json';
import ImageLightbox from '@/components/shared/ImageLightbox/ImageLightbox';

const ProjectMiniCarousel = ({ images = [] }) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [lightbox, setLightbox] = useState({ visible: false, index: 0 });

  const carouselImages = useMemo(() => {
    if (!images || images.length === 0) return [];

    if (images.length >= visibleCount) {
      return images;
    }

    const padded = [...images];
    while (padded.length < visibleCount) {
      padded.push(images[images.length - 1]);
    }
    return padded;
  }, [images, visibleCount]);

  // Responsive visible count: 1 on small screens, otherwise 3
  useEffect(() => {
    const update = () => {
      try {
        const w = window.innerWidth;
        setVisibleCount(w <= 768 ? 1 : 3);
      } catch (e) {
        setVisibleCount(3);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, carouselImages.length - visibleCount);
  const canLoop = carouselImages.length > visibleCount;

  const extendedImages = useMemo(() => {
    if (!canLoop) return carouselImages;
    return [...carouselImages, ...carouselImages, ...carouselImages];
  }, [carouselImages, canLoop]);

  const baseLen = carouselImages.length;

  // Prepare arrays for lightbox navigation (use the carouselImages array)
  const allSrcs = carouselImages.map((image) => {
    const s = typeof image === 'string' ? image : image?.src;
    return thumbs[s] || s;
  });
  const allAlts = carouselImages.map((image, idx) => {
    return typeof image === 'string' ? `Proyecto imagen ${idx + 1}` : image?.alt || `Proyecto imagen ${idx + 1}`;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // initialize index to the middle copy when looping
  useEffect(() => {
    if (canLoop) {
      setCurrentIndex(baseLen);
    } else {
      setCurrentIndex(0);
    }
  }, [baseLen, canLoop]);

  // Autoplay: advance automatically unless paused or lightbox open
  useEffect(() => {
    const AUTOPLAY_MS = 2500;
    if (!canLoop) return;
    if (isPaused || lightbox.visible) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, canLoop, lightbox.visible]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // When looping, watch for boundary crossings and jump back to the middle copy without transition
  useEffect(() => {
    if (!canLoop) return;
    const TRANS_MS = 600; // must match CSS transition duration (0.6s)
    let t = null;
    if (currentIndex >= baseLen * 2) {
      t = setTimeout(() => {
        setDisableTransition(true);
        setCurrentIndex((ci) => ci - baseLen);
        requestAnimationFrame(() => requestAnimationFrame(() => setDisableTransition(false)));
      }, TRANS_MS + 20);
    } else if (currentIndex < baseLen) {
      t = setTimeout(() => {
        setDisableTransition(true);
        setCurrentIndex((ci) => ci + baseLen);
        requestAnimationFrame(() => requestAnimationFrame(() => setDisableTransition(false)));
      }, TRANS_MS + 20);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [currentIndex, baseLen, canLoop]);

  if (carouselImages.length === 0) {
    return null;
  }

  return (
    <>
    <div className={styles.carouselContainer} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <button
        type="button"
        className={`${styles.navButton} ${currentIndex === 0 ? styles.disabled : ''}`}
        onClick={handlePrevious}
        aria-label="Anterior"
        disabled={currentIndex === 0}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
          <path d="M15.5 19L9.5 12L15.5 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className={styles.trackViewport}>
        <div 
          className={`${styles.track} ${(!mounted || disableTransition) ? styles.noTransition : ''}`} 
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
        >
          {extendedImages.map((image, index) => {
            const imageSrc = typeof image === 'string' ? image : image?.src;
            const imageAlt = typeof image === 'string' ? `Proyecto imagen ${index + 1}` : image?.alt || `Proyecto imagen ${index + 1}`;
            
            const srcToUse = thumbs[imageSrc] || imageSrc;
            const logicalIndex = baseLen > 0 ? index % baseLen : index;
            return (
              <div key={`${imageSrc}-${index}`} className={styles.slide}>
                  <div
                    className={styles.imageCard}
                    role="button"
                    tabIndex={0}
                    onClick={() => setLightbox({ visible: true, index: logicalIndex })}
                    onKeyDown={(e) => { if (e.key === 'Enter') setLightbox({ visible: true, index: logicalIndex }); }}
                    onMouseEnter={() => setIsPaused(true)}
                  >
                    <img
                      src={thumbs[imageSrc] || imageSrc}
                      alt={imageAlt}
                      className={styles.carouselImage}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.navButton} ${(!canLoop && currentIndex === maxIndex) ? styles.disabled : ''}`}
        onClick={handleNext}
        aria-label="Siguiente"
        disabled={!canLoop && currentIndex === maxIndex}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
          <path d="M8.5 5L14.5 12L8.5 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
    <ImageLightbox
      visible={lightbox.visible}
      src={allSrcs[lightbox.index]}
      alt={allAlts[lightbox.index]}
      onClose={() => setLightbox({ visible: false, index: 0 })}
      onPrev={() => setLightbox((s) => ({ ...s, index: (s.index - 1 + allSrcs.length) % allSrcs.length }))}
      onNext={() => setLightbox((s) => ({ ...s, index: (s.index + 1) % allSrcs.length }))}
    />
    </>
  );
};

export default ProjectMiniCarousel;

// Lightbox state managed at the bottom to avoid changing existing layout logic above