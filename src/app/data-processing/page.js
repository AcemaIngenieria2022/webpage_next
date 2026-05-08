export const metadata = {
  title: 'Tratamiento de datos - ACEMA Ingeniería',
  description: 'Procesamiento y gestión de datos para la operación de proyectos energéticos.',
};

export default function DataProcessingPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">Tratamiento de datos</h1>
        <p className="text-lg leading-8 mb-8">
          Procesamos y visualizamos datos operativos para mejorar la eficiencia de cada proyecto energético.
        </p>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="mb-4"><strong>Recopilación de datos:</strong> Sensores, mediciones y registros eléctricos.</p>
          <p className="mb-4"><strong>Análisis:</strong> KPI, reportes de performance y alertas tempranas.</p>
          <p><strong>Gestión:</strong> Soporte para decisiones técnicas y de mantenimiento.</p>
        </div>
      </section>
    </main>
  );
}
