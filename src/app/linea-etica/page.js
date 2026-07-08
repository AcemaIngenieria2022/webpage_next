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
      padding: '80px 20px',
      background: '#f7f9fb',
      color: '#1f2937',
    }}>
      <section style={{
        maxWidth: '820px',
        width: '100%',
        background: '#ffffff',
        borderRadius: '28px',
        padding: '56px 42px',
        boxShadow: '0 24px 64px rgba(15, 23, 42, 0.08)',
      }}>
        <h1 style={{
          margin: '0 0 24px',
          fontSize: '2.75rem',
          fontWeight: 700,
          lineHeight: 1.05,
          color: '#0f172a',
        }}>
          Bienvenido a la línea ética
        </h1>
        <p style={{
          margin: 0,
          fontSize: '1.1rem',
          lineHeight: 1.8,
          color: '#475569',
        }}>
          Este canal está diseñado para reportar, de manera confidencial y anónima, situaciones que puedan afectar la ética, la transparencia, el cumplimiento de las políticas empresariales de la compañía o el bienestar de los trabajadores.
        </p>
      </section>
    </main>
  );
}
