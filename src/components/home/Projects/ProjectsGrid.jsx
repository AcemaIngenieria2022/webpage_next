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
          <Card 
            key={project.id} 
            title={project.title} 
            image={project.image} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;