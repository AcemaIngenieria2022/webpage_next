export const metadata = {
  title: 'Servicios - ACEMA Ingeniería',
  description: 'Servicios de ingeniería eléctrica, solar e infraestructura en Colombia.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">Servicios</h1>
        <p className="text-lg leading-8 mb-8">
          Conoce nuestras soluciones integrales: construcción, mantenimiento y consultoría en energías renovables.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Construcción de granjas solares</h2>
            <p className="text-slate-600">Proyecto completo desde diseño hasta la puesta en marcha.</p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Centros de transformación</h2>
            <p className="text-slate-600">Ingeniería dedicada a subestaciones y redes de alta tensión.</p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Servicios eléctricos</h2>
            <p className="text-slate-600">Mantenimiento preventivo, correctivo y pruebas eléctricas.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
