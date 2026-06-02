"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import styles from "./Projects.module.css";

const Projects = () => {
  const projectList = [
    {
      id: 1,
      name: "Granja solar",
      location: "La Rubiela 0,9 MW",
      image: "/images/projects/featured/img-rubiela.webp",
      url: "/projects/la-rubiela",
    },
    {
      id: 2,
      name: "Granja solar",
      location: "San Pelayo 0,99 MW",
      image: "/images/projects/featured/img-pelayo.webp",
      url: "/projects/san-pelayo",
    },
    {
      id: 3,
      name: "Granja solar",
      location: "Piedras 1 y 2 0,9 MW",
      image: "/images/projects/featured/proyecto3.webp",
      url: "/projects/piedras-i-y-ii",
    },
  ];

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.projectsContainer}>
        {/* Título de la sección con entrada sutil */}
        <motion.h2
          className={styles.projectsHeader}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Proyectos destacados
        </motion.h2>

        <div className={styles.projectsGrid}>
          {projectList.map((project, index) => (
            <motion.div
              key={project.id} // Elemento raíz directo del map con su Key única
              className={styles.projectLink}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.25,
                delay: index * 0.08, // Mismo retraso escalonado exacto
              }}
              whileHover={{
                y: -8, // Mismo comportamiento de elevación en Hover exacto
              }}
            >
              <Link href={project.url} className="w-full h-full block" style={{ textDecoration: "none", color: "inherit" }}>
                <div className={styles.projectCard}>
                  <div className={styles.imageContainer}>
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.name} - ${project.location}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.projectImg}
                        priority={project.id === 1}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    className={styles.infoDetails}
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className={styles.projectName}>
                      {project.name}
                    </h3>
                    <p className={styles.projectLocation}>
                      {project.location}
                    </p>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;