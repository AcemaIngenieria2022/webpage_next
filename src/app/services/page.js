 
 
import Link from 'next/link';
import Image from 'next/image';
import styles from './service.module.css';
import { services } from '@/data/services';

export const metadata = {
  title: 'Servicios - ACEMA Ingeniería',
  description: 'Servicios de ingeniería eléctrica, solar e infraestructura en Colombia.',
};

export default function ServicesPage() {
  return (
    <main className={styles.servicesPage}>
      <div className={styles.bannerBox}>
        <Image src="/images/projects/banner/contruccion-granjas.webp" alt="Servicios" fill className={styles.bannerImgDesktop} sizes="(max-width: 900px) 100vw, 1600px" quality={80} priority />
        <Image src="/images/services/banner/contruccion-movil.png" alt="Servicios" fill className={styles.bannerImgMobile} sizes="100vw" quality={70} priority />
        <div className={styles.bannerOverlay}></div>
      </div>

      <section className={styles.servicesContainer}>
        {services.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`} className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.cardImageBox}>
                <Image src={s.image} alt={s.title} fill className={styles.serviceImg} />
              </div>
              <div className={styles.cardTextWrapper}>
                <div>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.cardDescription}>{s.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
