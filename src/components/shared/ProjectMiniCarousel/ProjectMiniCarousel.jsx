'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import styles from './ProjectMiniCarousel.module.css';

const ProjectMiniCarousel = ({ images = [] }) => {
  const visibleCount = 3;
  const [currentIndex, setCurrentIndex] = useState(0);

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
  }, [images]);

  const maxIndex = Math.max(0, carouselImages.length - visibleCount);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  if (carouselImages.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselContainer}>
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
          className={styles.track} 
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
        >
          {carouselImages.map((image, index) => {
            const imageSrc = typeof image === 'string' ? image : image?.src;
            const imageAlt = typeof image === 'string' ? `Proyecto imagen ${index + 1}` : image?.alt || `Proyecto imagen ${index + 1}`;
            
            return (
              <div key={`${imageSrc}-${index}`} className={styles.slide}>
                <div className={styles.imageCard}>
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.carouselImage}
                    priority={index < visibleCount}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.navButton} ${currentIndex === maxIndex ? styles.disabled : ''}`}
        onClick={handleNext}
        aria-label="Siguiente"
        disabled={currentIndex === maxIndex}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
          <path d="M8.5 5L14.5 12L8.5 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default ProjectMiniCarousel;