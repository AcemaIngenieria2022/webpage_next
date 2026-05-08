export const metadata = {
  title: 'PQRS - ACEMA Ingeniería',
  description: 'Solicitud de quejas, reclamos, peticiones y sugerencias para nuestros servicios.',
};

export default function PqrsPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">PQRS</h1>
        <p className="text-lg leading-8 mb-8">
          Envia tu petición, queja, reclamo o sugerencia. Nuestro equipo la gestionará rápidamente.
        </p>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="mb-4"><strong>Peticiones:</strong> Solicitudes de información o servicios.</p>
          <p className="mb-4"><strong>Quejas y reclamos:</strong> Seguimiento de incidentes y atención al cliente.</p>
          <p><strong>Sugerencias:</strong> Mejora continua para nuestros procesos y atención.</p>
        </div>
      </section>
    </main>
  );
}
