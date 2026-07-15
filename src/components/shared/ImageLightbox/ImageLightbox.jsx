"use client";

import React, { useEffect, useCallback } from 'react';
import styles from './ImageLightbox.module.css';

export default function ImageLightbox({ 
  visible, 
  src, 
  alt, 
  onClose, 
  onPrev, 
  onNext,
  currentIndex,
  totalImages 
}) {
  
  // Manejador de teclado
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

  // Prevenir scroll cuando el lightbox está abierto
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [visible]);

  if (!visible) return null;

  // Manejador para cerrar al hacer clic en el overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Manejador para navegación por clic en la imagen
  const handleImageClick = (e) => {
    if (!onPrev && !onNext) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Mitad izquierda → anterior, mitad derecha → siguiente
    if (x < width / 2) {
      if (onPrev) onPrev();
    } else {
      if (onNext) onNext();
    }
  };

  // Prevenir que los clics en hotspots se propaguen
  const handleHotspotClick = (e, callback) => {
    e.stopPropagation();
    if (callback) callback();
  };

  return (
    <div 
      className={styles.overlay} 
      onClick={handleOverlayClick} 
      role="dialog" 
      aria-modal="true"
      aria-label={`Visor de imagen: ${alt}`}
    >
      <div className={styles.inner}>
        {/* Botón cerrar */}
        <button 
          className={styles.close} 
          onClick={onClose} 
          aria-label="Cerrar imagen"
        >
          ✕
        </button>

        {/* Botón anterior */}
        {onPrev && (
          <button 
            className={`${styles.navButton} ${styles.navPrev}`} 
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }} 
            aria-label="Imagen anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Botón siguiente */}
        {onNext && (
          <button 
            className={`${styles.navButton} ${styles.navNext}`} 
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }} 
            aria-label="Imagen siguiente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Hotspots: áreas grandes para navegación táctil */}
        {onPrev && (
          <div
            className={styles.hotspotLeft}
            role="button"
            tabIndex={0}
            aria-label="Anterior imagen"
            onClick={(e) => handleHotspotClick(e, onPrev)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPrev();
              }
            }}
          />
        )}
        
        {onNext && (
          <div
            className={styles.hotspotRight}
            role="button"
            tabIndex={0}
            aria-label="Siguiente imagen"
            onClick={(e) => handleHotspotClick(e, onNext)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNext();
              }
            }}
          />
        )}

        {/* Imagen */}
        <div 
          className={styles.imageWrapper} 
          onClick={handleImageClick}
        >
          <img 
            src={src} 
            alt={alt} 
            className={styles.image} 
            draggable={false}
            loading="lazy"
          />
        </div>

        {/* Indicador de posición */}
        {currentIndex !== undefined && totalImages !== undefined && (
          <div className={styles.positionIndicator}>
            <span className={styles.positionText}>
              {currentIndex + 1} / {totalImages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}