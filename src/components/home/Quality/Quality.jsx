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
               Acema Ingeniería orienta su gestión hacia la calidad del servicio y la prevención de accidentes de trabajo y enfermedades laborales, mediante la adecuada identificación de riesgos, la evaluación de peligros y la implementación de controles enfocados en la eliminación de los peligros y la reducción de los riesgos.

              </p>
              <p className={styles.description}>
               Asimismo, dirige sus esfuerzos a proporcionar condiciones de trabajo seguras y adecuadas, promoviendo una cultura de autocuidado, bienestar, comunicación y participación de sus colaboradores y sus representantes. De igual manera, protege el medio ambiente mediante la prevención de la contaminación y el cumplimiento de los requisitos legales y demás requisitos aplicables.
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