"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import styles from "./ProjectsToggle.module.css";

const ProjectsToggle = ({ onFilterChange, className = "" }) => {
  const [activeFilter, setActiveFilter] = useState("finalizados");

  const handleFilter = (filter) => {
    setActiveFilter(filter);

    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <div
      className={`${styles.toggleContainer} ${className}`}
      id="proyectos-seccion"
    >
      <motion.div
        className={styles.contentWrapper}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Proyectos
        </motion.h2>

        <motion.div
          className={styles.verticalDivider}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ transformOrigin: "top" }}
        />

        <motion.nav
          className={styles.navLinks}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            className={`${styles.navItem} ${
              activeFilter === "finalizados" ? styles.active : ""
            }`}
            onClick={() => handleFilter("finalizados")}
          >
            {activeFilter === "finalizados" && (
              <motion.div
                layoutId="activeIndicator"
                className={styles.activeBackground}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
              />
            )}

            <span>Finalizados</span>
          </button>

          <button
            className={`${styles.navItem} ${
              activeFilter === "desarrollo" ? styles.active : ""
            }`}
            onClick={() => handleFilter("desarrollo")}
          >
            {activeFilter === "desarrollo" && (
              <motion.div
                layoutId="activeIndicator"
                className={styles.activeBackground}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
              />
            )}

            <span>En desarrollo</span>
          </button>
        </motion.nav>
      </motion.div>
    </div>
  );
};

export default ProjectsToggle;