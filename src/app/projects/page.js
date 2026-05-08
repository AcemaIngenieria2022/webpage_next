export const metadata = {
  title: 'Proyectos - ACEMA Ingeniería',
  description: 'Proyectos destacados de ingeniería solar e infraestructura.',
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">Proyectos</h1>
        <p className="text-lg leading-8 mb-8">
          Explora nuestros casos de éxito en energía solar, centros de transformación y servicio eléctrico.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Granja solar industrial</h2>
            <p className="text-slate-600">Instalación de alta capacidad para producción sostenible de energía.</p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Centro de transformación</h2>
            <p className="text-slate-600">Diseño y ejecución de subestaciones eléctricas seguras y eficientes.</p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Servicios eléctricos</h2>
            <p className="text-slate-600">Mantenimiento, pruebas y puesta en marcha de redes eléctricas.</p>
          </article>
        </div>
      </section>
    </main>
  );
}



