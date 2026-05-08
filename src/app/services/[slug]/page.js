import Link from 'next/link';

export async function generateStaticParams() {
  return [
    { slug: 'tendencias-energia-solar-2026' },
    { slug: 'optimizacion-centros-transformacion' },
  ];
}

const posts = {
  'tendencias-energia-solar-2026': {
    title: 'Tendencias en energía solar 2026',
    description:
      'Conoce los avances tecnológicos y las mejores prácticas para proyectos solares residenciales e industriales.',
    content:
      'En 2026, las instalaciones solares combinan eficiencia, diseño sostenible y conectividad inteligente. La integración de baterías y optimizadores de potencia es clave para maximizar el rendimiento.',
  },
  'optimizacion-centros-transformacion': {
    title: 'Optimización de centros de transformación',
    description:
      'Aprende cómo mejorar el rendimiento eléctrico y la confiabilidad de tus instalaciones.',
    content:
      'Los centros de transformación requieren monitoreo constante, mantenimiento predictivo y calidad de componentes. Con un enfoque técnico, se reduce el tiempo de inactividad y se eleva la seguridad operativa.',
  },
};

export default function PostPage({ params }) {
  const post = posts[params.slug];

  if (!post) {
    return (
      <main className="min-h-screen px-6 py-20 bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-4xl rounded-3xl border border-red-200 bg-white p-10 shadow-sm">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Artículo no encontrado</h1>
          <p className="text-lg leading-8 mb-6">
            El artículo solicitado no existe o el slug es incorrecto.
          </p>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            Volver al blog
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-20 bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-lg leading-8 text-slate-600 mb-8">{post.description}</p>
          <div className="prose prose-slate max-w-none">
            <p>{post.content}</p>
          </div>
          <div className="mt-10">
            <Link href="/blog" className="text-blue-600 hover:text-blue-800">
              ← Volver al blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
