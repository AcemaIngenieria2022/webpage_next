import Image from 'next/image';
import ProjectMiniCarousel from '@/components/shared/ProjectMiniCarousel/ProjectMiniCarousel';
import styles from '../service.module.css';
import serviciosElectricosFeatures from '@/data/servicios-electricos-features';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Sistema SCADA - ACEMA Ingeniería'
};

export default function ScadaPage() {
  const slug = 'sistema-scada-subestaciones';
  const feature = serviciosElectricosFeatures.find((f) => f.slug === slug);
  if (!feature) return notFound();

  return (
    <main className={`${styles.servicePage} ${styles.scadaPage}`}>
      <div className={styles.bannerBox} style={{ position: 'relative', height: 320 }}>
        <Image
          src="/images/services/banner/servicios-electricos.webp"
          alt={feature.title}
          fill
          className={styles.bannerImgDesktop}
          sizes="(max-width: 900px) 100vw, 1600px"
          quality={80}
        />
        <Image
          src="/images/services/banner/electrico-movil.webp"
          alt={feature.title}
          fill
          className={styles.bannerImgMobile}
          sizes="(max-width: 900px) 100vw, 1600px"
          quality={80}
        />
      </div>

      <section className={styles.content}>
        <h1>{feature.title}</h1>
        {feature.description ? <p className={styles.serviceIntro}>{feature.description}</p> : null}

        <div className={`${styles.featuresSection} ${styles.scadaFeaturesFullWidth}`}>
          <div className={styles.twoColumn}>
            <div style={{ gridColumn: '1 / -1', width: '100%' }}>
              {feature.content && feature.content.map((p, i) => (
                <p key={i} style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto' }}>{p}</p>
              ))}
            </div>

          </div>
        </div>
      </section>
    
      <div className={styles.miniCarouselWrap}>
        <ProjectMiniCarousel
          images={[
            '/images/services/banner/carousel-scada/scada1.webp',
            '/images/services/banner/carousel-scada/scada2.webp',
            '/images/services/banner/carousel-scada/scada3.webp',
          ]}
        />
      </div>
    </main>
  );
}
