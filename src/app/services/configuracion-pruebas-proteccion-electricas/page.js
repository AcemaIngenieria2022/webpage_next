import Image from 'next/image';
import styles from '../service.module.css';
import serviciosElectricosFeatures from '@/data/servicios-electricos-features';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Pruebas y protecciones - ACEMA Ingeniería'
};

export default function ProteccionesPage() {
  const slug = 'configuracion-pruebas-proteccion-electricas';
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
              <div className={styles.leftCol}>
                <p style={{ textAlign: 'center' }}>
                  En Acema Ingeniería realizamos diseños e implementación de sistemas de protección para garantizar la operación segura y confiable de sus proyectos. Contamos con equipos de última tecnología, que nos permiten ejecutar pruebas con alta precisión y confiabilidad.
                </p>

                <h3 className={styles.benefitsTitle}>Beneficios de las pruebas y configuración de protecciones eléctricas</h3>

                <p><span className={styles.infoHead}>Seguridad garantizada:</span> aseguramos la correcta operación de los sistemas de protección para mitigar y despejar fallas eléctricas y sus riesgos asociados.</p>

                <p><span className={styles.infoHead}>Confiabilidad operativa:</span> nuestros procedimientos y equipos de prueba garantizan resultados precisos, los cuales ayudan a diagnosticar los sistemas de protección garantizando la continuidad operativa y la estabilidad del sistema eléctrico.</p>

                <p><span className={styles.infoHead}>Optimización del mantenimiento:</span> garantizamos la seguridad del personal operativo e identificamos las posibles fallas antes de que se conviertan en interrupciones costosas que afecten el desempeño del proyecto.</p>

                <p><span className={styles.infoHead}>Cumplimiento normativo:</span> todas las pruebas se realizan bajo los estándares técnicos y normativos aplicables nacionales e internacionales (RETIE, NTC, IEC, IEEE).</p>

                <p><span className={styles.infoHead}>Soporte especializado:</span> ingenieros expertos en protección, control y automatización acompañan todo el proceso desde el inicio hasta la puesta en marcha del proyecto.</p>
              </div>

            <div className={styles.rightCol}>
              <div className={styles.offerBox}>
                <h4 className={styles.infoTitle}>Nuestros servicios incluyen:</h4>
                <ul className={styles.offerList}>
                  {feature.offers ? (
                    feature.offers.map((o, idx) => (
                      <li key={idx}>{o}</li>
                    ))
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}
