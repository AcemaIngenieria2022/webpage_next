"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectsToggle from '@/components/shared/Toggle/ProjectsToggle';
import ProjectsGrid from '@/components/home/Projects/ProjectsGrid';
import { projectsData } from '@/data/projects';
import styles from './page.module.css';

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  // Estado para manejar el filtro seleccionado
  const [filter, setFilter] = useState('finalizados');

  // Leer el parámetro de query al montar el componente
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam === 'desarrollo' || filterParam === 'finalizados') {
      setFilter(filterParam);
    }
  }, [searchParams]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <>
      <ProjectsToggle onFilterChange={handleFilterChange} />
      <section className={styles.pageWrapper}>
        <div className={styles.content}>
          {/* Grilla que muestra los proyectos según el filtro */}
          <ProjectsGrid 
          projects={projectsData} 
          activeFilter={filter} 
        />
        </div>
      </section>
    </>
  );
}