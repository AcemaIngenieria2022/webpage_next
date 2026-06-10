import Image from 'next/image';
import Link from 'next/link';
import styles from '../service.module.css';
import Card from '@/components/shared/Card/Card';
import FeatureCards from '@/components/shared/FeatureCards/FeatureCards';
import serviciosElectricosFeatures from '@/data/servicios-electricos-features';

export const metadata = {
  title: 'Servicios eléctricos - ACEMA Ingeniería',
  description: 'Servicios eléctricos: mantenimiento, pruebas y soporte técnico.',
};

export default function ServiciosElectricosPage() {
  const features = serviciosElectricosFeatures.map((f) => ({ ...f, href: `/services/${f.slug}` }));

  return (
    <main className={styles.servicePage}>
      <div className={styles.bannerBox}>
        <Image src="/images/services/banner/servicios-electricos.webp" alt="Servicios eléctricos" fill className={styles.bannerImgDesktop} sizes="(max-width: 900px) 100vw, 1600px" quality={80} priority />
        <Image src="/images/services/banner/electricos-movil.png" alt="Servicios eléctricos" fill className={styles.bannerImgMobile} sizes="100vw" quality={70} priority />
      </div>

      {/* Se removió el contenido descriptivo por petición del usuario. */}

      {/* Features cards (usar Card con animaciones similares a /projects) */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresRow}>
          <FeatureCards features={features} variant="grid" />
        </div>
      </section>
    </main>
  );
}
