// Cambiamos 'home' por 'shared' que es donde está tu carpeta según la imagen
import ContactForm from '@/components/shared/ContactForm/ContactForm';

export const metadata = {
  title: 'Contacto - ACEMA Ingeniería',
  description: 'Contáctanos para cotizaciones, asesorías y consultas técnicas.',
};

export default function ContactPage() {
  return (
    <main>
      <ContactForm />
    </main>
  );
}