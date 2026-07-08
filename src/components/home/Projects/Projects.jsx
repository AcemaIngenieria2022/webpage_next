import Image from "next/image";
import OptimizedImage from '@/components/shared/OptimizedImage/OptimizedImage';
import Link from "next/link";
import styles from "./Projects.module.css";

const Projects = () => {
  const projectList = [
    {
      id: 1,
      name: "Granja solar",
      location: "La Rubiela (0,9 MW)",
      image: "/images/projects/featured/img-rubiela.webp",
      thumb: "/images/projects/featured/thumbs/img-rubiela-800.webp",
      url: "/projects/la-rubiela",
    },
    {
      id: 2,
      name: "Granja solar",
      location: "San Pelayo (0,09 MW)",
      image: "/images/projects/featured/img-pelayo.webp",
      thumb: "/images/projects/featured/thumbs/img-pelayo-800.webp",
      url: "/projects/san-pelayo",
    },
    {
      id: 3,
      name: "Granja solar",
      location: "Piedras I y II (2 MW)",
      image: "/images/projects/featured/proyecto3.webp",
      thumb: "/images/projects/featured/thumbs/proyecto3-800.webp",
      url: "/projects/piedras-i-y-ii",
    },
  ];


  function ProjectCard({ project, index }) {
    return (
      <div className={styles.projectLink}>
        <Link href={project.url} className="w-full h-full block" style={{ textDecoration: "none", color: "inherit" }}>
          <div className={styles.projectCard}>
            <div className={styles.imageContainer}>
                <div style={{ width: "100%", height: "100%", position: "relative" }} suppressHydrationWarning>
                <OptimizedImage
                  src={project.image}
                  thumb={project.thumb}
                  alt={`${project.name} - ${project.location}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.projectImg}
                  priority={project.id <= 2}
                  fetchPriority={project.id <= 2 ? 'high' : 'auto'}
                  loading={project.id <= 2 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            </div>

            <div className={styles.infoDetails}>
              <h3 className={styles.projectName}>{project.name}</h3>
              <p className={styles.projectLocation}>{project.location}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.projectsContainer}>
        {/* Título de la sección */}
        <h2 className={styles.projectsHeader}>Proyectos destacados</h2>

        <div className={styles.filterButtons}>
          <Link href="/projects?filter=finalizados" className={styles.filterButton}>
            Finalizados
          </Link>
          <Link href="/projects?filter=desarrollo" className={styles.filterButton}>
            En desarrollo
          </Link>
        </div>

        <div className={styles.projectsGrid}>
          {projectList.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;