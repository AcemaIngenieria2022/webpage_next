"use client";

import Link from "next/link";
import Card from "@/components/shared/Card/Card";
import styles from "./ProjectsGrid.module.css";

const ProjectsGrid = ({ projects, activeFilter }) => {
  const filteredProjects = projects.filter((project) => project.status === activeFilter);

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>{activeFilter === "finalizados" ? "Finalizados" : "En desarrollo"}</h2>

      <div className={styles.grid}>
        {filteredProjects.map((project) => (
          <div key={project.id} className={styles.cardLink}>
            {project.status === "finalizados" ? (
              <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <Card title={project.title} image={project.image} />
              </Link>
            ) : (
              <Card title={project.title} image={project.image} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;