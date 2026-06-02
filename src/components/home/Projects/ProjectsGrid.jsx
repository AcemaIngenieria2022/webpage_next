"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import Card from "@/components/shared/Card/Card";
import styles from "./ProjectsGrid.module.css";

const ProjectsGrid = ({ projects, activeFilter }) => {
  const filteredProjects = projects.filter(
    (project) => project.status === activeFilter
  );

  return (
    <div className={styles.container}>
      <motion.h2
        key={activeFilter}
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeFilter === "finalizados" ? "Finalizados" : "En desarrollo"}
      </motion.h2>

      <div className={styles.grid}>
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id} // Elemento raíz directo de AnimatePresence con su Key única
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.25,
                delay: index * 0.08, // Mismo retraso escalonado original
              }}
              whileHover={{
                y: -8, // Mismo efecto hover original
              }}
              className={styles.cardLink}
            >
              {project.status === "finalizados" ? (
                <Link 
                  href={`/projects/${project.slug}`} 
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <Card title={project.title} image={project.image} />
                </Link>
              ) : (
                <Card title={project.title} image={project.image} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsGrid;