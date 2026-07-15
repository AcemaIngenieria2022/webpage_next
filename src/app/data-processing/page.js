import PrivacyPolicy from '@/components/shared/PrivacyPolicy/PrivacyPolicy';

export const metadata = {
  title: 'Tratamiento de datos - ACEMA Ingeniería',
  description: 'Procesamiento y gestión de datos para la operación de proyectos energéticos.',
};

export default function DataProcessingPage() {
  return (
    <main>
      {/* Inyectamos el componente que replica la imagen. 
          Al estar dentro de <main>, heredará el flujo de la página.
      */}
      <PrivacyPolicy />
      
      {/* Si deseas mantener la sección informativa anterior debajo 
          o encima, puedes hacerlo, pero el componente PrivacyPolicy 
          ya cubre visualmente toda la política. 
      */}
    </main>
  );
}