 
import styles from './page.module.css';

export const metadata = {
  title: 'Servicios - ACEMA Ingeniería',
  description: 'Servicios de ingeniería eléctrica, solar e infraestructura en Colombia.',
};

export default function ServicesPage() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>Servicios</h1>
        <p className={styles.description} style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          Conoce nuestras soluciones integrales: construcción, mantenimiento y consultoría en energías renovables.
        </p>
        <div className={styles.grid}>
          <article className={styles.card}>
            <h2 className={styles.cardTitle}>Construcción de granjas solares</h2>
            <p className={styles.cardDescription}>Proyecto completo desde diseño hasta la puesta en marcha.</p>
          </article>
          <article className={styles.card}>
            <h2 className={styles.cardTitle}>Centros de transformación</h2>
            <p className={styles.cardDescription}>Ingeniería dedicada a subestaciones y redes de alta tensión.</p>
          </article>
          <article className={styles.card}>
            <h2 className={styles.cardTitle}>Servicios eléctricos</h2>
            <p className={styles.cardDescription}>Mantenimiento preventivo, correctivo y pruebas eléctricas.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
