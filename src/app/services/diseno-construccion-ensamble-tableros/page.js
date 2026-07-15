import Image from 'next/image';
import styles from '../service.module.css';
import ProjectMiniCarousel from '@/components/shared/ProjectMiniCarousel/ProjectMiniCarousel';
import serviciosElectricosFeatures from '@/data/servicios-electricos-features';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Diseño y tableros - ACEMA Ingeniería'
};

export default function TablerosPage() {
  const slug = 'diseno-construccion-ensamble-tableros';
  const feature = serviciosElectricosFeatures.find((f) => f.slug === slug);
  if (!feature) return notFound();

  return (
    <main className={styles.servicePage}>
      <div className={styles.bannerBox} style={{ position: 'relative', height: 320 }}>
        <Image src={feature.banner || feature.image} alt={feature.title} fill className={styles.bannerImgDesktop} sizes="(max-width: 900px) 100vw, 1600px" quality={80} />
        <Image src={feature.bannerMobile || feature.banner || feature.image} alt={feature.title} fill className={styles.bannerImgMobile} sizes="(max-width: 900px) 100vw, 1600px" quality={80} />
      </div>

      

      <section className={styles.serviceContent}>
        <h1 className={styles.serviceTitle}>{feature.title}</h1>
        <p className={styles.serviceIntro}>{feature.intro || feature.description}</p>

        <div className={styles.twoColumn}>
          <div className={styles.leftCol}>
            {feature.content && feature.content.map((p, i) => (
              <div key={i} className={styles.infoBox}>
                <p>{p}</p>
              </div>
            ))}

            {feature.benefits && (
              <>
                <h3 className={styles.benefitsTitle}>Beneficios del diseño, construcción y ensamble de tableros</h3>
                <ul className={styles.infoList}>
                  {feature.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className={styles.rightCol}>
            <div className={styles.offerBox}>
              <h4>Ofrecemos soluciones en:</h4>
              <ul className={styles.offerList}>
                {feature.offers && feature.offers.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ProjectMiniCarousel images={[
        '/images/services/banner/carrousel-tablero/tablero1.webp',
        '/images/services/banner/carrousel-tablero/tablero2.webp'
      ]} />
    </main>
  );
}
