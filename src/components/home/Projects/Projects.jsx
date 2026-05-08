import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Projects.module.css';

const Projects = () => {
  const projectList = [
    {
      id: 1,
      name: "Granja solar",
      location: "La Rubiela 0,9 MW",
      image: "/images/projects/img-rubiela.webp",
      url: "/proyectos/la-rubiela" 
    },
    {
      id: 2,
      name: "Granja solar",
      location: "San Pelayo 0,99 MW",
      image: "/images/projects/img-pelayo.webp",
      url: "/proyectos/san-pelayo"
    },
    {
      id: 3,
      name: "Granja solar",
      location: "Piedras 1 y 2 0,9 MW",
      image: "/images/projects/img-piedras.webp",
      url: "/proyectos/piedras"
    }
  ];

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.projectsContainer}>
        
        <h2 className={styles.projectsHeader}>
          Proyectos destacados
        </h2>

        <div className={styles.projectsGrid}>
          {projectList.map((project) => (
            <Link href={project.url} key={project.id} className={styles.projectLink}>
              <div className={styles.projectCard}>
                
                {/* Contenedor de la Imagen (Siempre visible) */}
                <div className={styles.imageContainer}>
                  <Image 
                    src={project.image} 
                    alt={`${project.name} - ${project.location}`}
                    fill
                    className={styles.projectImg}
                  />
                </div>

                {/* Panel de información que aparece con el Hover */}
                <div className={styles.infoDetails}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectLocation}>{project.location}</p>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;