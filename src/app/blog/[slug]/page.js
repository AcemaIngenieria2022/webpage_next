import { getBlogPostBySlug, getAllBlogSlugs } from '@/data/blog-posts-detail';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';

/**
 * Generar parámetros estáticos para todos los posts de blog
 */
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

/**
 * Generar metadatos dinámicos para SEO
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
      description: 'El post que buscas no existe.',
    };
  }

  return {
    title: `${post.title} | Blog ACEMA`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
    },
  };
}

/**
 * Página de detalle del post de blog
 */
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className={styles.container}>
      {/* Contenido Principal */}
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
        </header>

        {/* Contenido del Post */}
        <section className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </section>
      </div>
    </article>
  );
}
