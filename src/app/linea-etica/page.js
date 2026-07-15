import LineaEticaForm from '@/components/shared/LineaEticaForm/LineaEticaForm';

export const metadata = {
  title: 'Línea Ética - ACEMA Ingeniería',
  description: 'Canal confidencial y anónimo para reportar situaciones éticas.',
};

export default function LineaEticaPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f2f5',
      padding: '100px 20px 40px',
    }}>
      <LineaEticaForm />
    </main>
  );
}

