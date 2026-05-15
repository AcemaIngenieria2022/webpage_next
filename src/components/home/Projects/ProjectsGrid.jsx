import Link from 'next/link';
import Card from '@/components/shared/Card/Card';
import styles from './ProjectsGrid.module.css';

const ProjectsGrid = ({ projects, activeFilter }) => {
  // Filtrado de proyectos basado en el status del array
  const filteredProjects = projects.filter(
    (project) => project.status === activeFilter
  );

  return (
    <div className={styles.container}>
      {/* Título dinámico de la sección */}
      <h2 className={styles.sectionTitle}>
        {activeFilter === 'finalizados' ? 'Finalizados' : 'En desarrollo'}
      </h2>

      {/* Grilla responsiva */}
      <div className={styles.grid}>
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className={styles.cardLink}
          >
            <Card 
              title={project.title} 
              image={project.image} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;