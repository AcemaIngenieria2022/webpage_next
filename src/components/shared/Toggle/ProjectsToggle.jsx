"use client";

import React, { useState } from 'react';
import styles from './ProjectsToggle.module.css';

const ProjectsToggle = ({ onFilterChange, className = '' }) => {
  const [activeFilter, setActiveFilter] = useState('finalizados');

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (onFilterChange) onFilterChange(filter);
  };

  return (
    <div className={`${styles.toggleContainer} ${className}`} id="proyectos-seccion">
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Proyectos</h2>
        
        <div className={styles.verticalDivider}></div>
        
        <nav className={styles.navLinks}>
          <button 
            className={`${styles.navItem} ${activeFilter === 'finalizados' ? styles.active : ''}`}
            onClick={() => handleFilter('finalizados')}
          >
            Finalizados
          </button>
          <button 
            className={`${styles.navItem} ${activeFilter === 'desarrollo' ? styles.active : ''}`}
            onClick={() => handleFilter('desarrollo')}
          >
            En desarrollo
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProjectsToggle;