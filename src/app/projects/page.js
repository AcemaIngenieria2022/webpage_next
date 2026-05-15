"use client";

import { useState } from 'react';
import ProjectsToggle from '@/components/shared/Toggle/ProjectsToggle';
import ProjectsGrid from '@/components/home/Projects/ProjectsGrid';
import { projectsData } from '@/data/projects';

export default function ProjectsPage() {
  // Estado para manejar el filtro seleccionado
  const [filter, setFilter] = useState('finalizados');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <main className="min-h-screen bg-[#f1f3f6]">
      {/* Cabecera con el selector de proyectos */}
      <ProjectsToggle 
        onFilterChange={handleFilterChange} 
        currentFilter={filter} 
      />
      
      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* Grilla que muestra los proyectos según el filtro */}
        <ProjectsGrid 
          projects={projectsData} 
          activeFilter={filter} 
        />
      </section>
    </main>
  );
}