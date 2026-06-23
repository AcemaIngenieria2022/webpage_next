import Image from 'next/image';
import Link from 'next/link';
import styles from '../service.module.css';
import ProjectMiniCarousel from '@/components/shared/ProjectMiniCarousel/ProjectMiniCarousel';
import { projectsCarouselData } from '@/data/projects-carousel';

export const metadata = {
  title: 'Centros de transformación - ACEMA Ingeniería',
  description: 'Diseño y construcción de centros de transformación y subestaciones.',
};

export default function CentrosPage() {
  return (
    <main className={styles.servicePage}>
      <div className={styles.bannerBox}>
        <Image src="/images/services/banner/centros-transformacion.webp" alt="Centros de transformación" fill className={styles.bannerImgDesktop} sizes="(max-width: 900px) 100vw, 1600px" quality={80} priority fetchPriority="high" loading="eager" decoding="async" />
        <Image src="/images/services/banner/centros-movil.png" alt="Centros de transformación" fill className={styles.bannerImgMobile} sizes="100vw" quality={70} priority fetchPriority="high" loading="eager" decoding="async" />
      </div>

      <section className={styles.content}>
        <div className={styles.introCenter}>
          <h1>Centros de transformación</h1>
          <p>
            En Acema Ingeniería diseñamos, suministramos, montamos y ponemos en servicio centros de transformación
            que permiten la supervisión y control integral de parques solares. Nuestras soluciones integran monitoreo
            avanzado, protección, automatización y comunicación, adaptadas a las necesidades técnicas de cada proyecto.
          </p>
        </div>
        <h2 className={styles.benefitsTitle}>Beneficios de los centros de transformación para granjas solares</h2>

        <div className={`${styles.twoColumn} ${styles.twoColumnEqual}`}>
          <div className={styles.leftCol}>
            <ul>
              <li><strong>Integración total:</strong> concentramos en un solo sistema la protección, el control y la supervisión del parque solar.</li>
              <li><strong>Eficiencia energética:</strong> optimizamos la transferencia de energía desde los inversores hasta el punto de conexión con la red.</li>
              <li><strong>Diseño modular y adaptable:</strong> estructuras SKID que se ajustan a las condiciones y capacidad de cada proyecto.</li>
              <li><strong>Seguridad garantizada:</strong> equipos con sistemas de protección, monitoreo y respaldo eléctrico (UPS) que aseguran continuidad operativa.</li>
              <li><strong>Cumplimiento técnico y normativo:</strong> desarrollos alineados con las regulaciones del sector energético y estándares RETIE.</li>
              <li><strong>Mayor confiabilidad operativa:</strong> componentes de alta calidad que prolongan la vida útil del sistema y reducen mantenimientos correctivos.</li>
            </ul>
          </div>

          <aside className={styles.rightCol}>
            <div className={styles.infoBox}>
              <h4 className={styles.infoTitle}>Componentes principales:</h4>
              <ul className={styles.infoList}>
                <li>Transformador de potencia de 1.5 MVA.</li>
                <li>Tablero agrupador de inversores 800 V.</li>
                <li>Tablero de servicios auxiliares, incluyendo sistema UPS.</li>
                <li>Estructura SKID con cerramiento y techo.</li>
                <li>Sistema de monitoreo para mini granjas solares.</li>
                <li>Suministro de reconectadores y puntos de medida para granjas solares.</li>
              </ul>
            </div>
          </aside>
        </div>

      
      </section>

      <section className={styles.featuresSection}>
        <div style={{ maxWidth: 1100, margin: '40px auto 80px' }}>
        
          <ProjectMiniCarousel images={
            // flatten some example project images
            [
              ...projectsCarouselData['la-rubiela']?.images.map(i => i.src || i) || [],
              ...projectsCarouselData['san-pelayo']?.images.map(i => i.src || i) || [],
              ...projectsCarouselData['inti-i-y-ii']?.images.map(i => i.src || i) || [],
            ]
          } />
        </div>
      </section>
    </main>
  );
}
