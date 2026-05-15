import styles from "./layout.module.css";

/**
 * Layout para todas las rutas bajo /projects
 */
export default function ProjectsLayout({ children }) {
  return (
    <main className={styles.projectsLayout}>
      {/* Contenido de la página específica */}
      {children}
    </main>
  );
}
