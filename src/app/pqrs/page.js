import PqrForm from '@/components/shared/PqrForm/PqrForm';

export const metadata = {
  title: 'PQRS - ACEMA Ingeniería',
  description: 'Solicitud de quejas, reclamos, peticiones y sugerencias para nuestros servicios.',
};

export default function PqrsPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
    }}>
      <PqrForm />
    </main>
  );
}