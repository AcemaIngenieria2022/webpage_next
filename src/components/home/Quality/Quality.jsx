'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Quality.module.css';

const qualityImages = [
  {
    src: '/images/quality/calidad%20ISO9001.png',
    alt: 'Certificación ISO 9001',
  },
  {
    src: '/images/quality/calidad%20ISO14001.png',
    alt: 'Certificación ISO 14001',
  },
  {
    src: '/images/quality/calidad%20ISO45001.png',
    alt: 'Certificación ISO 45001',
  },
];

export default function Quality() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isVisible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              Política Integral de Seguridad, Salud, Ambiente y Calidad
            </h2>
            
            <div className={styles.descriptionWrapper}>
              <p className={styles.description}>
                Acema Ingeniería orienta su gestión hacia la calidad del servicio 
                y la prevención de accidentes y enfermedades laborales, a través 
                de la correcta identificación de riesgos, evaluación de peligros 
                y establecimiento de controles asociados a la eliminación de los 
                peligros y la reducción de los riesgos.
              </p>
              <p className={styles.description}>
                Dirige sus esfuerzos en proveer condiciones de trabajo óptimas y 
                seguras, fomentando una cultura de autocuidado, bienestar, 
                comunicación y participación de sus colaboradores y sus 
                representantes. Además, protege y cuida el medio ambiente, 
                previniendo la contaminación y asegurando el cumplimiento de los 
                requisitos legales y otros aplicables.
              </p>
            </div>
          </div>

          <div className={styles.imageGallery}>
            {qualityImages.map((image, index) => (
              <div className={styles.imageCard} key={index}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={240}
                    height={160}
                    className={styles.image}
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}