"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import styles from "./Projects.module.css";
import placeholders from '@/data/project-image-placeholders';

const Projects = () => {
  const projectList = [
    {
      id: 1,
      name: "Granja solar",
      location: "La Rubiela 0,9 MW",
      image: "/images/projects/featured/img-rubiela.webp",
      thumb: "/images/projects/featured/thumbs/img-rubiela-800.webp",
      url: "/projects/la-rubiela",
    },
    {
      id: 2,
      name: "Granja solar",
      location: "San Pelayo 0,99 MW",
      image: "/images/projects/featured/img-pelayo.webp",
      thumb: "/images/projects/featured/thumbs/img-pelayo-800.webp",
      url: "/projects/san-pelayo",
    },
    {
      id: 3,
      name: "Granja solar",
      location: "Piedras 1 y 2 0,9 MW",
      image: "/images/projects/featured/proyecto3.webp",
      thumb: "/images/projects/featured/thumbs/proyecto3-800.webp",
      url: "/projects/piedras-i-y-ii",
    },
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const nodes = containerRef.current.querySelectorAll(`.${styles.projectLink}`);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.projectsContainer} ref={containerRef}>
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
            <div
              key={project.id}
              className={styles.projectLink}
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <Link href={project.url} className="w-full h-full block" style={{ textDecoration: "none", color: "inherit" }}>
                <div className={styles.projectCard}>
                  <div className={styles.imageContainer}>
                    <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.28 }} style={{ width: "100%", height: "100%", position: "relative" }}>
                      <Image
                        src={project.thumb || project.image}
                        alt={`${project.name} - ${project.location}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.projectImg}
                        priority={project.id <= 2}
                        placeholder={placeholders ? 'blur' : undefined}
                        blurDataURL={placeholders ? placeholders[project.image.split('/').pop()] : undefined}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;