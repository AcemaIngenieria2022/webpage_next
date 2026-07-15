import Image from 'next/image';
import styles from '../service.module.css';
import serviciosElectricosFeatures from '@/data/servicios-electricos-features';
import ProjectMiniCarousel from '@/components/shared/ProjectMiniCarousel/ProjectMiniCarousel';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'EPC subestaciones - ACEMA Ingeniería'
};

export default function EPCSubestacionesPage() {
  const slug = 'epc-subestaciones';
  const feature = serviciosElectricosFeatures.find((f) => f.slug === slug);
  if (!feature) return notFound();

  const benefits = [
    { title: 'Gestión integral del proyecto', text: 'un solo aliado se encarga del diseño, suministro, construcción y puesta en marcha.' },
    { title: 'Cumplimiento garantizado', text: 'control total de tiempos, costos y calidad.' },
    { title: 'Eficiencia operativa', text: 'procesos optimizados que reducen retrabajos y demoras.' },
    { title: 'Mayor seguridad y confiabilidad', text: 'soluciones construidas bajo normas técnicas y estándares internacionales.' },
    { title: 'Flexibilidad técnica', text: 'diseños adaptados a las necesidades del cliente, ya sean encapsulados o tipo AIS.' },
    { title: 'Optimización de recursos', text: 'coordinación directa entre ingeniería, obra y montaje.' },
    { title: 'Acompañamiento experto', text: 'soporte especializado desde la planeación hasta la operación.' },
  ];

  return (
    <main className={`${styles.servicePage} ${styles.scadaPage}`}>
      <div className={styles.bannerBox} style={{ position: 'relative', height: 320 }}>
        <Image
          src={feature.banner || feature.image || '/images/services/banner/banner-estaciones/banner1.webp'}
          alt={feature.title}
          fill
          className={styles.bannerImgDesktop}
          sizes="(max-width: 900px) 100vw, 1600px"
          quality={80}
        />
        <Image
          src={feature.bannerMobile || feature.banner || feature.image || '/images/services/banner/banner-estaciones/banner1.webp'}
          alt={feature.title}
          fill
          className={styles.bannerImgMobile}
          sizes="(max-width: 900px) 100vw, 1600px"
          quality={80}
        />
      </div>

      <div className={styles.content}>
        <h1>{feature.title}</h1>
      </div>

      <section className={styles.serviceContent}>
        <div className={styles.introCenter}>
          <p>En Acema Ingeniería diseñamos y construimos subestaciones eléctricas bajo la modalidad EPC, adaptadas a las necesidades de cada proyecto. Desarrollamos soluciones encapsuladas en media tensión y tipo AIS en media y alta tensión, garantizando eficiencia, seguridad y confiabilidad en cada conexión.</p>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto 18px', padding: '0 20px' }}>
          <h3 className={styles.integramosTitle}>Integramos:</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.integramosPlain} style={{ maxWidth: 720 }}>
              <ul className={styles.infoList}>
                <li>Renes de celdas de media tensión AIS y GIS.</li>
                <li>Subestaciones convencionales.</li>
                <li>Subestaciones con bahías reducidas (reconectadores).</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.introCenter}>
          <p>{feature.description}</p>
        </div>

        <div className={styles.benefitFullWidth}>
          <h3 className={styles.benefitsTitle}>Beneficios de las subestaciones eléctricas EPC</h3>
          <div className={styles.benefitGrid}>
            {benefits.slice(0, benefits.length - 1).map((b, i) => (
              <div key={i} className={styles.benefitCard}>
                <h4>{b.title}:</h4>
                <p>{b.text}</p>
              </div>
            ))}
          </div>

          {/* Last card centered below the grid */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
            <div className={`${styles.benefitCard} ${styles.benefitLast}`}>
              <h4>{benefits[benefits.length - 1].title}:</h4>
              <p>{benefits[benefits.length - 1].text}</p>
            </div>
          </div>
        </div>

        {/* Carousel at the end */}
        <div className={styles.miniCarouselWrap}>
          <ProjectMiniCarousel
            images={[
              '/images/services/banner/banner-estaciones/banner1.webp',
              '/images/services/banner/banner-estaciones/banner2.webp',
              '/images/services/banner/banner-estaciones/banner3.webp',
              '/images/services/banner/banner-estaciones/banner4.webp',
              '/images/services/banner/banner-estaciones/banner5.webp',
              '/images/services/banner/banner-estaciones/banner6.webp',
            ]}
          />
        </div>
      </section>
    </main>
  );
}
