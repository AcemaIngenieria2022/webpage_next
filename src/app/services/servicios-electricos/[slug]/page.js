import Image from 'next/image';
import styles from '../../service.module.css';
import serviciosElectricosFeatures from '@/data/servicios-electricos-features';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const feature = serviciosElectricosFeatures.find((f) => f.slug === params.slug);
  if (!feature) return { title: 'Servicio - ACEMA' };
  return { title: `${feature.title} - ACEMA Ingeniería`, description: feature.description };
}

export function generateStaticParams() {
  return serviciosElectricosFeatures.map((f) => ({ slug: f.slug }));
}

export default function ServiceSlugPage({ params }) {
  const { slug } = params;
  const feature = serviciosElectricosFeatures.find((f) => f.slug === slug);
  if (!feature) return notFound();

  return (
    <main className={styles.servicePage}>
      <div className={styles.bannerBox} style={{ position: 'relative', height: 320 }}>
        {feature.banner ? (
          <>
            <Image src={feature.banner} alt={feature.title} fill className={styles.bannerImgDesktop} sizes="(max-width: 900px) 100vw, 1600px" quality={80} />
            <Image src="/images/services/banner/electrico-movil.webp" alt={feature.title} fill className={styles.bannerImgMobile} sizes="(max-width: 900px) 100vw, 1600px" quality={80} />
          </>
        ) : (
          <>
            <Image src={feature.image} alt={feature.title} fill className={styles.bannerImgDesktop} sizes="(max-width: 900px) 100vw, 1600px" quality={80} />
            <Image src="/images/services/banner/electrico-movil.webp" alt={feature.title} fill className={styles.bannerImgMobile} sizes="(max-width: 900px) 100vw, 1600px" quality={80} />
          </>
        )}
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
