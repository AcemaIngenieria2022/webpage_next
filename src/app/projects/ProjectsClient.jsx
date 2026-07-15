"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectsToggle from '@/components/shared/Toggle/ProjectsToggle';
import ProjectsGrid from '@/components/home/Projects/ProjectsGrid';
import { projectsData } from '@/data/projects';
import styles from './page.module.css';

export default function ProjectsClient() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState('finalizados');

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
          <ProjectsGrid projects={projectsData} activeFilter={filter} />
        </div>
      </section>
    </>
  );
}
