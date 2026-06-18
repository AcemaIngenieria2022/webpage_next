"use client";

import React, { useEffect } from 'react';
import styles from './ImageLightbox.module.css';

export default function ImageLightbox({ visible, src, alt, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, onClose, onPrev, onNext]);

  if (!visible) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

          {/* Hotspots: large left/right click areas to navigate quickly */}
          {onPrev && (
            <div
              className={styles.hotspotLeft}
              role="button"
              tabIndex={0}
              aria-label="Anterior imagen"
              onClick={onPrev}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onPrev(); }}
            />
          )}
          {onNext && (
            <div
              className={styles.hotspotRight}
              role="button"
              tabIndex={0}
              aria-label="Siguiente imagen"
              onClick={onNext}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNext(); }}
            />
          )}
  // 👇 Manejar clics en la imagen para navegar
  const handleImageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Si está en la mitad izquierda → anterior, derecha → siguiente
    if (x < width / 2) {
      if (onPrev) onPrev();
    } else {
      if (onNext) onNext();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className={styles.inner}>
        <button className={styles.close} onClick={onClose} aria-label="Cerrar imagen">×</button>
        
        <button 
          className={styles.navPrev} 
          onClick={onPrev} 
          aria-label="Anterior"
        >
          <svg viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          className={styles.navNext} 
          onClick={onNext} 
          aria-label="Siguiente"
        >
          <svg viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 👇 Imagen con click handler */}
        <div 
          className={styles.imageWrapper} 
          onClick={handleImageClick}
        >
          <img 
            src={src} 
            alt={alt} 
            className={styles.image} 
            draggable={false}
          />
        </div>

        {/* Indicador de posición (opcional) */}
        <div className={styles.positionIndicator}>
          {/* Puedes pasar index y total como props */}
        </div>
      </div>
    </div>
  );
}