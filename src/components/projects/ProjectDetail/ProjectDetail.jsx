'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProjectsToggle from '@/components/shared/Toggle/ProjectsToggle';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail({ project }) {
  const router = useRouter();

  if (!project) return null;

  return (
    <article className={styles.container}>
      <div className={styles.toggleWrapper}>
        <ProjectsToggle
          className={styles.slugToggle}
          onFilterChange={(filter) => router.push(`/projects?filter=${filter}`)}
        />
      </div>

      {/* Sección Hero con Imagen y Wave */}
      <section className={styles.heroSection}>
        {project.heroImage ? (
          <div className={styles.imageContainer}>
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              className={styles.heroImage}
            />
          </div>
        ) : null}
        
        {/* Curva SVG inferior */}
        <div className={styles.waveWrapper}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,192L80,213.3C160,235,320,277,480,261.3C640,245,800,171,960,154.7C1120,139,1280,181,1360,202.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Título Flotante y Contenido */}
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <div className={styles.titleBadge}>
            <h1>{project.title}</h1>
          </div>
           
        </header>

        <section className={styles.mainGrid}>
          <div className={styles.descriptionColumn}>
            {project.description.split(/\n{2,}/g).map((paragraph, index) => (
              <p key={index} className={styles.textWithLines}>
                {paragraph.trim()}
              </p>
            ))}
          </div>
          <div className={styles.videoColumn}>
            <div className={styles.videoBox}>
              <iframe src={project.videoUrl} title="Video" allowFullScreen />
            </div>
          </div>
        </section>

        <section className={styles.specsGrid}>
          {project.specs?.map((spec, i) => (
            <div key={i} className={styles.specCard}>
              <span className={styles.specLabel}>{spec.label}</span>
              <span className={styles.specValue}>{spec.value}</span>
            </div>
          ))}
        </section>

        <footer className={styles.footer}>
          <p>{project.textfooter}</p>
          <button className={styles.ctaButton} hrf="/contact" onClick={() => router.push('/contact')}>
            Hacemos realidad tus proyectos
          </button>
        </footer>
      </div>
    </article>
  );
}