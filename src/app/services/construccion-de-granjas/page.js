"use client";

import Image from 'next/image';
import thumbs from '@/data/project-thumbs.json';
import styles from '../service.module.css';
import Card from '@/components/shared/Card/Card';
import { construccionFeatures } from '@/data/construccion-features';

export default function ConstruccionPage() {
  const features = construccionFeatures;

  return (
    <main className={styles.servicePage}>
      <div className={styles.bannerBox}>
        <Image src={thumbs['/images/services/banner/construccion-granjas.webp'] || '/images/services/banner/construccion-granjas.webp'} alt="Construcción de granjas" fill className={styles.bannerImgDesktop} sizes="(max-width: 900px) 100vw, 1600px" quality={90} priority fetchPriority="high" loading="eager" decoding="async" />
        <Image src={thumbs['/images/services/banner/contruccion-movil.png'] || '/images/services/banner/contruccion-movil.png'} alt="Construcción de granjas" fill className={styles.bannerImgMobile} sizes="100vw" quality={90} priority fetchPriority="high" loading="eager" decoding="async" />
      </div>

      <section className={styles.featuresSection}>
        <div className={styles.content}>
          {/* Aquí va tu menú de texto superior u otros elementos si los necesitas */}
        </div>
        
        {/* Contenedor optimizado para centrar y reducir espacios */}
        <div className={styles.featuresContainer}>
            {features.map((f) => (
              <div key={f.slug} style={{ width: '100%', maxWidth: 320 }}>
                <Card
                  title={f.title}
                  image={f.image}
                  variant="grid"
                  href={`/services/construccion-de-granjas/${f.slug}`}
                />
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}