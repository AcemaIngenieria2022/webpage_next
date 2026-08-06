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
          <p className={styles.lead}>
            Desarrollamos cada etapa del proyecto de manera integrada para garantizar una ejecución eficiente, minimizar riesgos y asegurar una transición fluida hacia la operación.
          </p>
          <ul className={styles.infoList}>
            <li><span className={styles.beforeColon}>Estructuración del proyecto:</span> evaluación técnica, energética y regulatoria para viabilizar la granja solar.</li>
            <li><span className={styles.beforeColon}>Ingeniería y diseño:</span> desarrollo de la ingeniería eléctrica y civil optimizada para máxima producción.</li>
            <li><span className={styles.beforeColon}>Construcción:</span> ejecución integral de obras civiles, montaje e instalación eléctrica.</li>
            <li><span className={styles.beforeColon}>Energización:</span> pruebas, certificaciones y conexión a la red hasta la operación comercial.</li>
          </ul>

          <h3>¿Qué garantizamos?</h3>
          <ul className={styles.infoList}>
            <li>Control integral del proyecto</li>
            <li>Reducción de riesgos técnicos y regulatorios</li>
            <li>Optimización de tiempos y costos</li>
          </ul>

          <h3>Etapas del proceso constructivo</h3>
          <p>Nuestro equipo ejecuta la construcción de la granja solar mediante un proceso estructurado que garantiza calidad técnica, seguridad y cumplimiento del cronograma.</p>
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