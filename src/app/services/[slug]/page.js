import ServiceHero from '@/components/services/ServiceHero';
import InfoTransformacion from '@/components/services/InfoTransformacion';

// 1. Agregamos "async" antes de la función
export default async function ServiceSlugPage({ params }) {
  
  // 2. Agregamos "await" antes de params
  const { slug } = await params;

  const subServicesData = [
    { title: "Construcción de granja solar", image: "/images/services/cons-granjas/construccion-granjas.webp" },
    { title: "Sistemas SCADA y PPC solar", image: "/images/services/cons-granjas/scada.webp" },
    { title: "Estaciones meteorológicas", image: "/images/services/cons-granjas/estaciones-meteorologicas.webp" }
  ];

  if (slug === 'centros-transformacion') {
    return (
      <main className="min-h-screen bg-[#f8fafc]">
        <ServiceHero 
          backgroundImage="/images/Banner/Cent-transformacion.webp" 
          altText="Centros de Transformación"
          subServices={[]} 
        />
        <InfoTransformacion />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <ServiceHero 
        backgroundImage="/images/Banner/banner-granja-solar.webp" 
        altText="Servicios ACEMA"
        subServices={subServicesData}
      />
    </main>
  );
}