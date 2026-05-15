import Link from 'next/link';
import styles from './page.module.css';

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
      <main className={styles.page}>
        <section className={styles.errorCard}>
          <h1 className={`${styles.title} ${styles.errorTitle}`}>Artículo no encontrado</h1>
          <p className={styles.text}>
            El artículo solicitado no existe o el slug es incorrecto.
          </p>
          <Link href="/blog" className={styles.link}>
            Volver al blog
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.postSection}>
        <div className={styles.postCard}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={`${styles.text} ${styles.description}`}>{post.description}</p>
          <div className={styles.postContent}>
            <p>{post.content}</p>
          </div>
          <div>
            <Link href="/blog" className={styles.link}>
              ← Volver al blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
