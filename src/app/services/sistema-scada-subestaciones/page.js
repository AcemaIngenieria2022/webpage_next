import Image from 'next/image';
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
    <main className={styles.servicePage}>
      <div className={styles.bannerBox} style={{ position: 'relative', height: 320 }}>
        <Image src={feature.banner || feature.image} alt={feature.title} fill className={styles.bannerImgDesktop} sizes="(max-width: 900px) 100vw, 1600px" quality={80} />
      </div>

      <section className={styles.serviceContent}>
        <h1 className={styles.serviceTitle}>{feature.title}</h1>
        <p className={styles.serviceIntro}>{feature.description}</p>

        <div className={styles.twoColumn}>
          <div>
            {feature.content && feature.content.map((p, i) => (
              <div key={i} className={styles.infoBox}>
                <p>{p}</p>
              </div>
            ))}
          </div>

          <div>
            <div style={{ padding: 0 }}>
              <p>Para más información o cotización, contáctanos y te asesoramos en el alcance técnico y económico.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
