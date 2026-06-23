"use client";

import React, { useState } from "react";
/* motion animations removed to prevent banner re-renders */
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
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Proyectos</h2>

        <div className={styles.verticalDivider} style={{ transformOrigin: "top" }} />

        <nav className={styles.navLinks}>
          <button
            className={`${styles.navItem} ${
              activeFilter === "finalizados" ? styles.active : ""
            }`}
            onClick={() => handleFilter("finalizados")}
          >
            {activeFilter === "finalizados" && <div className={styles.activeBackground} />}

            <span>Finalizados</span>
          </button>

          <button
            className={`${styles.navItem} ${
              activeFilter === "desarrollo" ? styles.active : ""
            }`}
            onClick={() => handleFilter("desarrollo")}
          >
            {activeFilter === "desarrollo" && <div className={styles.activeBackground} />}

            <span>En desarrollo</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProjectsToggle;