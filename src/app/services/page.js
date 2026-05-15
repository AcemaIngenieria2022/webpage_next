import ServiceHero from '@/components/services/ServiceHero';

export default function ServicesPage() {
  // Ahora tenemos los 3 servicios de image_bd539d.png
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
    }
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <ServiceHero 
        backgroundImage="/images/Banner/banner-granja-solar.webp" 
        altText="Construcción de granjas"
        subServices={subServicesData}
      />
    </main>
  );
}