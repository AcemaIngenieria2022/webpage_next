import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects-slug';
import ProjectDetail from '@/components/projects/ProjectDetail/ProjectDetail';
import { notFound } from 'next/navigation';

/**
 * Generar parámetros estáticos para todos los proyectos
 * Optimiza el rendimiento generando las páginas en build time
 */
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

/**
 * Generar metadatos dinámicos para SEO
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
      description: 'El proyecto que buscas no existe.',
    };
  }

  return {
    title: `${project.title} | ACEMA`,
    description: project.description.substring(0, 160),
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.heroImage],
      type: 'website',
    },
  };
}

/**
 * Página de detalle del proyecto
 */
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}