import ServiceHero from '@/components/services/ServiceHero';
import InfoTransformacion from '@/components/services/InfoTransformacion';
import ServiceCarousel from '@/components/services/ServiceCarousel';
import styles from './page.module.css';

export default async function ServiceSlugPage({ params }) {
  const { slug } = await params;

  // Datos para el slug: construcción de granjas solares
  const subServicesData = [
    {
      title: "Construcción de granja solar",
      image: "/images/services/cons-granjas/construccion-granjas.webp"
    },
    {
      title: "Sistemas SCADA y PPC solar",
      image: "/images/services/cons-granjas/scada.webp"
    },
    {
      title: "Estaciones meteorológicas",
      image: "/images/services/cons-granjas/estaciones-meteorologicas.webp"
    },
  ];

  // Datos para el slug: servicios eléctricos
  const subServicesElectricosData = [
    {
      title: "EPC subestaciones y puntos de conexión",
      image: "/images/services/serv-elect/EPC-sub.webp"
    },
    {
      title: "Diseño, construcción y ensamble de tableros",
      image: "/images/services/serv-elect/diseño-cons.webp"
    },
    {
      title: "Configuración y pruebas de protección eléctricas",
      image: "/images/services/serv-elect/conf-pru.webp"
    },
    {
      title: "Sistema SCADA para subestaciones",
      image: "/images/services/serv-elect/sist-scada.webp"
    }
  ];

  const fotosCentros = [
    '/images/services/cent-transfor/carrusel1.webp',
    '/images/services/cent-transfor/carrusel2.webp',
    '/images/services/cent-transfor/carrusel3.webp',
  ];

  // CASO 1: Centros de Transformación
  if (slug === 'centros-transformacion') {
    return (
      <main className={styles.servicePage}>
        <ServiceHero
          backgroundImage="/images/Banner/Cent-transformacion.webp"
          altText="Centros de Transformación"
          subServices={[]}
        />
        <InfoTransformacion />
        <ServiceCarousel images={fotosCentros} />
      </main>
    );
  }

  // CASO 2: Servicios Eléctricos
  if (slug === 'servicios-electricos') {
    return (
      <main className={styles.servicePage}>
        <ServiceHero
          backgroundImage="/images/Banner/banner-serv-elect.webp"
          altText="Servicios Eléctricos ACEMA"
          subServices={subServicesElectricosData}
        />
      </main>
    );
  }

  // CASO 3: Construcción de granjas solares (Con su propia URL oficial)
  if (slug === 'construccion-granjas') {
    return (
      <main className={styles.servicePage}>
        <ServiceHero
          backgroundImage="/images/Banner/banner-granja-solar.webp"
          altText="Construcción de granjas"
          subServices={subServicesData}
        />
      </main>
    );
  }

  // CASO POR DEFECTO: (Si alguien escribe /services/cualquier-cosa)
  // Lo mandamos a granjas solares para que la página no rompa
  return (
    <main className={styles.servicePage}>
      <ServiceHero
        backgroundImage="/images/Banner/banner-granja-solar.webp"
        altText="Servicios ACEMA"
        subServices={subServicesData}
      />
    </main>
  );
}